import React, { Component } from 'react';
import { connect } from 'react-redux';

/* Data Fetcher Imports */
import genericPostData from '../../../Global/dataFetch/genericPostData';
import basicDataFetcher from '../../../Global/dataFetch/basicDataFetcher';

/* Lodash Imports */
import _get from 'lodash/get';

/* Global Imports */
import moment from 'moment';
import HistoryView from '../../../Global/Components/HistoryView/HistoryView';

/* Component Imports */
import Histories from './component/Histories';
import NewComponent from '../../../xBoilerplate/NewComponent' // ! Temp Import - to be removed


class LoanHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }
    componentDidMount() {
        if (this.props.fund_transactionIds) {
            let reqObj = { transactionIds: this.props.fund_transactionIds }
            genericPostData({
                dispatch: this.props.dispatch,
                reqObj,
                url: '/api/TransactionHistory',
                constants: {
                    init: 'LoanHistory_init',
                    success: 'LoanHistory_success',
                    error: 'LoanHistory_error'
                }
            })
        }
    }

    render() {
        return (
            <div className='smbhistory'>
                <div className="title-btn ">
                    <h1>Loan Update History </h1>
                </div>

                <HistoryView
                    data={this.props.LoanHistoryObj}
                    extendedComponent={
                        {
                            component: NewComponent,
                            actionEvent: this.extendedComponentAction
                        }
                    }
                    dispatch={this.props.dispatch}
                />




                <Histories
                    dispatch={this.props.dispatch}
                    ProfileHistoryData={this.props.ProfileHistoryData} />
            </div>

        )
    }

}


function mapStateToProps(state) {
    let LoanHistoryData = _get(state, 'ProfileHistory.lookUpData', [])
    let LoanHistoryObj = []
    LoanHistoryData.map((data, index) => {
        let heading = {}
        _get(data, 'eventsEmitted').map((eventData, eventIndex) => {
            if (_get(eventData, 'eventType') == "Audit") {
                heading = {
                    eventName: _get(eventData, 'eventName'),
                    modifiedBy: _get(eventData, 'modifiedBy')
                }
            }
        })

        let obj = {
            key: _get(data, "transactionId"),
            date: {
                date: moment(_get(data, "transactionTimestamp")).format('MMM DD'),
                year: moment(_get(data, "transactionTimestamp")).format('YYYY')
            },
            heading: [
                { title: 'Event Name', content: _get(heading, 'eventName'), className: 'event-name' },
                { title: 'Transaction Time', content: moment(_get(data, "transactionTimestamp")).format('LT'), className: 'transaction-time' },
                { title: 'Modified By', content: _get(heading, 'modifiedBy'), className: 'modified-by' },
            ],
        }
        LoanHistoryObj.push(obj);
    })

    return {
        LoanHistoryObj,
        LoanHistoryData,
        fund_transactionIds: _get(state, 'staticReducers.fund.fund_transactionIds'),
        ProfileHistoryData: _get(state, 'ProfileHistory.lookUpData')
    }
}

export default connect(mapStateToProps)(LoanHistory)