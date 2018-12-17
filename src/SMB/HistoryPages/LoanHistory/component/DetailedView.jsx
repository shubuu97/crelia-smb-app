import React from 'react';
import moment from 'moment';
/* Lodash Imports */
import _get from 'lodash/get';
/* Data Fetcher Imports */
import genericGetData from '../../../../Global/dataFetch/genericGetData';
/* Material import */
import CircularProgress from '@material-ui/core/CircularProgress';
/* Redux Imports */

/* Component Imports */


class DetailedView extends React.Component {

    constructor() {
        super();
        this.state = {

        }
    }

    componentDidMount() {
        this.handleFetchTransaction()
    }

    handleFetchTransaction = () => {
        genericGetData({
            dispatch: this.props.dispatch,
            url: `/api/TransactionHistory/${_get(this, 'props.data.key')}`,
            constant: {
                init: 'TransactionDetails_init',
                success: 'TransactionDetails_success',
                error: 'TransactionDetails_error'
            },
            identifier: 'TransactionDetails'

        }).then((data) => {
            console.log(data, "HistoryView - companyDetails")
            this.setState({ companyDetails: _get(data, 'eventsEmitted[0]') })
        })
    }

    populateData = () => {
        let allData = _get(this, 'state.companyDetails.fund', [])

        let fundAllocation = []
        let parseData = {
            MoneyRange: `${_get(allData, 'moneyRange.minAmount')} - ${_get(allData, 'moneyRange.maxAmount')}`,
            Currency: `${_get(allData, 'moneyRange.currency')}`,
            Term: `${_get(allData, 'term')} yrs`,
            TimeFrame: `${moment(_get(allData, 'timeFrame')).format('DD-MM-YYYY')}`,
            FundAllocation: _get(allData, 'fundAllocation', ''),
            InterestRateType: `${_get(allData, 'interestRateType')}`,
            DesiredRate: `${_get(allData, 'interestRate')} %`,


        }
        let data = []
        Object.keys(parseData).map((key) => {
            let title = key.replace(/([A-Z])/g, ' $1')
            if (key != 'FundAllocation') {
                data.push(
                    <div className="flex-column"
                        style={{
                            width: '25%',
                            padding: '10px',
                        }}
                    >
                        <span className="extendedKey">{title} </span>
                        <span className="extendedValue"> {parseData[key]}</span>
                    </div>
                )
            }
            else if (key == 'FundAllocation') {

                let FundValues = []

                parseData[key].map((fundData, index) => {

                    FundValues.push(
                        <span className="extendedValue-secondary">
                            {parseData.FundAllocation[index].purpose} - {parseData.FundAllocation[index].percentage} %
                        </span>

                    )
                })
                data.push(
                    <div className="flex-column"
                        style={{
                            width: '25%',
                            padding: '10px',
                        }}
                    >
                        <span className="extendedKey">Fund Allocation</span>
                        {FundValues}
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
                {data}
            </div>
        )
    }

    render() {
        let keyValue = _get(this, 'props.data.key')
        console.log(this.state.companyDetails, 'HistoryView - companyDetails')
        return (
            <div>
                {
                    this.state.companyDetails ?
                        <div className="history-extended-card p-10">
                            {this.populateData()}
                        </div> :
                        <div className="history-extended-card p-10 flex-row justify-center">
                            <CircularProgress />
                        </div>
                }
            </div>

        );
    }
}

export default DetailedView;