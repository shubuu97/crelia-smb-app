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
import { diff } from 'deep-object-diff';



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
            //let diffrenceObj = diff(lhs, rhs);
            //let ChangedKeys = []
            // diffrenceObj.map((data, index) => {
            //     let path = _get(data,`path`,[]);
            //     ChangedKeys.push(path[path.length-1]);
            // });
            let updatedObj = diff(lhs, rhs);
            this.setState({ previous: lhs, current: rhs, diffrence: updatedObj })
        })
    }

    populateComparisionCells = () => {
        let current = _get(this, 'state.current', {});
        let diffrence = _get(this, 'state.diffrence', {});
        let previous = _get(this, 'state.previous', {});
        let display = []

        let parseData = {
            status: _get(diffrence, 'status', false)  //if key found in diffrence then push object
                ?
                {
                    changed: true,
                    previous: _get(previous, 'status', '-'),
                    current: _get(current, 'status', '-')
                } : _get(current, 'status', '-'),
            MoneyRange:
                _get(diffrence, 'moneyRange.minAmount', false)|| _get(diffrence, 'moneyRange.maxAmount', false)
                    ?
                    {
                        changed: true,
                        previous: `${_get(previous, 'moneyRange.minAmount')} - ${_get(previous, 'moneyRange.maxAmount')}`,
                        current: `${_get(current, 'moneyRange.minAmount')} - ${_get(current, 'moneyRange.maxAmount')}`
                    }
                    : `${_get(current, 'moneyRange.minAmount')} - ${_get(current, 'moneyRange.maxAmount')}`,
            Currency:

                _get(diffrence, 'moneyRange.currency', false)
                    ?
                    {
                        changed: true,
                        previous: _get(previous, 'moneyRange.currency', '-'),
                        current: _get(current, 'moneyRange.currency', '-')
                    }
                    : `${_get(current, 'moneyRange.currency')}`,
            Term:
                _get(diffrence, 'term', false)
                    ?
                    {
                        changed: true,
                        previous:`${_get(previous, 'term')} yrs`,
                        current: `${_get(current, 'term')} yrs`
                    }
                    : `${_get(current, 'term')} yrs`,
            TimeFrame: _get(diffrence, 'timeFrame', false)
                ?
                {
                    changed: true,
                    previous:  `${moment(_get(previous, 'timeFrame')).format('DD-MM-YYYY HH:mm')}`,
                    current:  `${moment(_get(current, 'timeFrame')).format('DD-MM-YYYY HH:mm')}`
                }
                : `${moment(_get(current, 'timeFrame')).format('DD-MM-YYYY')}`,
       //todo array mapping need to be done 
            FundAllocation: _get(diffrence, 'fundAllocation', false)
                ?
                {
                    changed: true,
                    previous: 'Previous array',
                    current: 'Current array'
                }
                : 'fund allocation array',
            InterestRateType: _get(diffrence, 'interestRateType', false)
                ?
                {
                    changed: true,
                    previous: _get(previous, 'interestRateType', '-'),
                    current: _get(current, 'interestRateType', '-')
                }
                : `${_get(current, 'interestRateType')}`,
            DesiredRate: _get(diffrence, 'interestRate', false)
                ?
                {
                    changed: true,
                    previous: `${_get(previous, 'interestRate')} %`,
                    current: `${_get(current, 'interestRate')} %`
                }
                : `${_get(current, 'interestRate')} %`,
        }
        
        Object.keys(parseData).map((key, index) => {
            if (_get(parseData[key], `changed`))
            {
                display.push(
                    <div className="flex-column"
                    key={index}
                        style={{
                            width: '25%',
                            padding: '10px',
                        }}
                    >
                        <span className="extendedKey">{key} </span>
                        <div className="compare-view">
                            <div className="previous-data">
                                <div className="title"><span>Previous</span> </div>
                                <div className="data">{_get(parseData[key],'previous','')}</div>
                            </div>
                            <div className="current-data">
                                <div className="title"><span>Current</span></div>
                                <div className="data">{_get(parseData[key],'current','')}</div>
                            </div>
                        </div>
                    </div>
                )
            }
            else {
                display.push(
                    <div className="flex-column"
                    key={index}
                        style={{
                            width: '25%',
                            padding: '10px',
                        }}
                    >
                        <span className="extendedKey">{key}</span>
                        <span className="extendedValue">{parseData[key]}</span>
        
                    </div>
                )
            }
        })
        return (
            <div className="flex-row"
                style={{
                    flexWrap: 'wrap',
                }}
            >
                {display}
            </div>
        )
    }

    render() {
        return (
            <div className="p-10 ">
                {this.state.current ?
                    this.populateComparisionCells() :
                    <div className="width-100-percent flex-row justify-center">
                        <CircularProgress />
                    </div>
                    
                }
            </div>

        );
    }
}

export default ComparisonView;