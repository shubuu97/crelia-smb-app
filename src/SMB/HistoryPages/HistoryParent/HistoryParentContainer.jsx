import React, { Component } from 'react';
import { connect } from 'react-redux';

/* Data Fetcher Imports */
import genericPostData from '../../../Global/dataFetch/genericPostData';
import basicDataFetcher from '../../../Global/dataFetch/basicDataFetcher';
import { commonActionCreater } from '../../../Redux/commonAction';

/* Lodash Imports */
import _get from 'lodash/get';
import _find from 'lodash/find'


/* Global Imports */
import moment from 'moment';
import HistoryView from '../../../Global/Components/HistoryView/HistoryView';

/* Style Import */
import '../styles/History.less'


//Dialogue import 
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

//Material ui import
import Button from '@material-ui/core/Button'
import ComparisonView from '../LoanHistory/component/ComparisonView';


class LoanHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            compareIds: [],
            showComparision: false,
            uncheckall: false,
            isFetching: true
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
                    init: 'ProfileHistory_init',
                    success: 'ProfileHistory_success',
                    error: 'ProfileHistory_error'
                },
                successCb:()=>this.setState({isFetching: false}),
                errorCb:()=>this.setState({isFetching: false}),
                successText: '',
                dontShowMessage: true,
            })
            
        }
    }

    componentWillUnmount() {
        this.props.dispatch(commonActionCreater([], 'ProfileHistory_success'));
    }

    //callback when compare history checkbox are clicked
    checkCb = (historyId) => {
        //logic to find for finding the ids in state 
        if (this.state.compareIds.length == 0) {
            this.setState({ uncheckall: false })
        }
        if (this.state.compareIds.length < 2) {
            this.state.compareIds.push(historyId);
            //logic to open dialog
            if (this.state.compareIds.length == 2) {
                //logic to sort according to time
                let ts1 = _find(this.props.LoanHistoryData, { transactionId: this.state.compareIds[0] }).transactionTimestamp;
                let ts2 = _find(this.props.LoanHistoryData, { transactionId: this.state.compareIds[1] }).transactionTimestamp;
                ts1 = moment(ts1)
                ts2 = moment(ts2);
                let compareIdarr = []

                if (ts1 > ts2) {
                 compareIdarr.push(this.state.compareIds[1]);
                 compareIdarr.push(this.state.compareIds[0]);
                } else {
                    compareIdarr.push(this.state.compareIds[0]);
                    compareIdarr.push(this.state.compareIds[1]);
                }
                this.setState({ showComparision: true, compareIds:compareIdarr })

            }
        }
    }

    //function to close the Dialog
    dialogClose = () => {
        //logic to uncheck the checkboxes'

        this.setState({ showComparision: false, uncheckall: true, compareIds: [] });
    }
    render() {
        return (
            <div className='smbhistory'>
                <div className="title-btn ">
                    <h1>Update History </h1>
                </div>
                <HistoryView
                    checkCb={this.checkCb}
                    uncheckall={this.state.uncheckall}
                    data={this.props.LoanHistoryObj}
                    extendedComponent={
                        {
                            component: this.props.DetailedView,
                            actionEvent: this.extendedComponentAction
                        }
                    }
                    dispatch={this.props.dispatch}
                    showCompare={true}
                    isFetching={this.state.isFetching}
                />
                <Dialog
                    open={this.state.showComparision}
                    maxWidth='xl'
                    fullWidth={true}
                    onClose={this.dialogClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Comparision View</DialogTitle>
                    <DialogContent>
                        <this.props.ComparisonView
                            dispatch={this.props.dispatch}
                            compareIds={this.state.compareIds}

                        />
                    </DialogContent>
                    <DialogActions>
                        <Button color='primary' variant='outlined' onClick={this.dialogClose}>Close</Button>
                    </DialogActions>
                </Dialog>
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