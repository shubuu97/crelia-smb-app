import React from 'react';
import moment from 'moment';
/* Lodash Imports */
import _get from 'lodash/get';
/* Data Fetcher Imports */
import genericGetData from '../../../../Global/dataFetch/genericGetData';
/* Material import */
import CircularProgress from '@material-ui/core/CircularProgress';
/* Redux Imports */
import transactionDataFetcher from '../../../../Global/dataFetch/transactionDataFetcher'
/* Component Imports */
import diff from 'deep-diff'


class ComparisonView extends React.Component {

    constructor() {
        super();
        this.state = {
            previous: null,
            current: null,
            diffrence: null,
            changedKeys: [],
        }
    }

    componentDidMount() {
        let id1 = this.props.compareIds[0];
        let id2 = this.props.compareIds[1];
        let p1 = transactionDataFetcher(this.props.dispatch, id1);
        let p2 = transactionDataFetcher(this.props.dispatch, id2);
        Promise.all([p1, p2]).then((values) => {
            let lhs = _get(values, '[0].eventsEmitted[0].fund');
            let rhs = _get(values, '[1].eventsEmitted[0].fund');
            let diffrenceObj = diff(lhs, rhs);
            let ChangedKeys = []
            diffrenceObj.map((key, index) => {
                ChangedKeys.push(diffrenceObj[index].path[0])
            })
            this.setState({ previous: lhs, current: rhs, diffrence: diffrenceObj, changedKeys: ChangedKeys })
        })
    }

    populateComparisionCells = () => {
        debugger
        let allData = _get(this, 'state.current', {})
        let display = []

        let parseData = {
            status: 'hello',
            MoneyRange: `${_get(allData, 'moneyRange.minAmount')} - ${_get(allData, 'moneyRange.maxAmount')}`,
            Currency: `${_get(allData, 'moneyRange.currency')}`,
            Term: `${_get(allData, 'term')} yrs`,
            TimeFrame: `${moment(_get(allData, 'timeFrame')).format('DD-MM-YYYY')}`,
            FundAllocation: _get(allData, 'fundAllocation', ''),
            InterestRateType: `${_get(allData, 'interestRateType')}`,
            DesiredRate: `${_get(allData, 'interestRate')} %`,
        }
        Object.keys(parseData).map((key, index) => {
           display.push(<div>fjdjfk</div>)
            // if (_get(this, 'state.changedKeys').includes(key)) {
            //     display.push(
            //         <div className="flex-column"
            //             style={{
            //                 width: '25%',
            //                 padding: '10px',
            //             }}
            //         >
            //             <span className="extendedKey">title </span>
            //             <div className="compare-view">
            //                 <div className="previous-data">
            //                     <div className="title"><span>Previous</span> </div>
            //                     <div className="data">Hello</div>
            //                 </div>
            //                 <div className="current-data">
            //                     <div className="title"><span>Current</span></div>
            //                     <div className="data">Hello</div>
            //                 </div>
            //             </div>
            //         </div>
            //     )
            // }
            // else {
            //     display.push(
            //         <div className="flex-column"
            //             style={{
            //                 width: '25%',
            //                 padding: '10px',
            //             }}
            //         >
            //             <span className="extendedKey">{key}</span>
            //             <span className="extendedValue">{parseData[key]}</span>
            //         </div>
            //     )
            // }
        })
        debugger
        return (
            <div>{display}</div>
        )
    }

    render() {
        return (
            <div className="history-extended-card p-10 flex-row">
                {   this.state.current ?
                    this.populateComparisionCells() :
                    null
                }
            </div>

        );
    }
}

export default ComparisonView;