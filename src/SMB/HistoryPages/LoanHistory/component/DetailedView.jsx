import React from 'react';
/* Lodash Imports */
import _get from 'lodash/get';
/* Data Fetcher Imports */
import genericGetData from '../../../../Global/dataFetch/genericGetData';
/* Material import */

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
            Term: `${_get(allData, 'term')}`,
            TimeFrame: `${_get(allData, 'timeFrame')}`,
            InterestRateType: `${_get(allData, 'interestRateType')}`,
            InterestRate: `${_get(allData, 'interestRate')}`,
            fundAllocation: [_get(allData, 'fundAllocation[0].purpose', ''), _get(allData, 'fundAllocation[1].purpose', ''), _get(allData, 'fundAllocation[2].purpose', '')],

        }
        let data = []
        Object.keys(parseData).map((key) => {
            data.push(
                <div className="flex-row align-center"
                    style={{
                        width: '50%',

                    }}
                >
                    <span><span className="extendedKey">{key} </span> - <span className="extendedValue"> {parseData[key]}</span></span>
                </div>
            )
        })
        return(
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
            <div className="longCard p-10">
                {this.populateData()}
            </div>
        );
    }
}

export default DetailedView;