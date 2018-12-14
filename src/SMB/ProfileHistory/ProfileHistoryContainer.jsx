import React, { Component } from 'react';
import { connect } from 'react-redux';
/* Lodash Imports */
import _get from 'lodash/get';
/* Material Imports */
import Button from '@material-ui/core/Button';
/* Data Fetcher Imports */
import genericPostData from '../../Global/dataFetch/genericPostData';
import basicDataFetcher from '../../Global/dataFetch/basicDataFetcher';
/* Global Imports */
import moment from 'moment';
import HistoryView from '../../Global/Components/HistoryView/HistoryView';
/* Components Imports */
import Histories from './component/Histories';
import OnBoardingView from './component/OnBoardingView';

let dummyRows = [
    {
        key: '0',
        date: {
            date: 'Dec 12',
            year: '2018',
        },
        heading : [
            {title: 'Event Name', content: 'SMB Updated', className: 'event-name'},
            {title: 'Transaction Time', content: '2:30pm', className: 'transaction-time'},
            {title: 'Modified By', content: 'Yogi', className: 'modified-by'},
        ],
    },
    {
        key: '1',
        date: {
            date: 'Dec 12',
            year: '2018',
        },
        heading : [
            {title: 'Event Name', content: 'SMB Updated', className: 'event-name'},
            {title: 'Transaction Time', content: '2:30pm', className: 'transaction-time'},
            {title: 'Modified By', content: 'Mak', className: 'modified-by'},
        ],
    },
    {
        key: '2',
        date: {
            date: 'Dec 12',
            year: '2018',
        },
        heading : [
            {title: 'Event Name', content: 'SMB Updated', className: 'event-name'},
            {title: 'Transaction Time', content: '2:30pm', className: 'transaction-time'},
            {title: 'Modified By', content: 'Kapil', className: 'modified-by'},
        ],
    },
]

class ProfileHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }
    componentDidMount() {
        basicDataFetcher(this.props.dispatch).then((data) => {
            console.log('here', data);
            let reqObj = { transactionIds: _get(data, 'companyDetails.transactionIds', []) }

            genericPostData({
                dispatch: this.props.dispatch,
                reqObj,
                url: '/api/TransactionHistory',
                constants: {
                    init: 'ProfileHistory_init',
                    success: 'ProfileHistory_success',
                    error: 'ProfileHistory_error'
                }
            })
        })
    }

    extendedComponentAction = () => {

    }

    render() {
        return (
            <div className='smbhistory'>
                <div className="title-btn ">
                    <h1>Updates History </h1>
                    <Button
                        isFetching={this.props.isFetchingPostUpdateToMarketPlace}
                        onClick={this.postMarketPlace}
                        color="primary"
                        className="mb-10"
                        variant="contained">Filter</Button>
                </div>

                <HistoryView 
                    data={this.props.ProfileObj}
                    extendedComponent={
                        {
                            component: OnBoardingView,
                            actionEvent: this.extendedComponentAction
                        }
                    }
                />

                <Histories
                    dispatch={this.props.dispatch}
                    ProfileHistoryData={this.props.ProfileHistoryData} 
                />
            </div>

        )
    }

}

function mapStateToProps(state) {
    let ProfileHistoryData = _get(state, 'ProfileHistory.lookUpData')
    debugger
    let ProfileObj = [ ]
    ProfileHistoryData.map((data, index)=> {
        let heading = {}
        _get(data, 'eventsEmitted').map((eventData, eventIndex)=>{
            if(_get(eventData, 'eventType') == "Audit"){
                heading = {
                    eventName: _get(eventData, 'eventName'),
                    modifiedBy: _get(eventData, 'modifiedBy')
                }
            }
        })

        let obj = {
            key : _get(data, "transactionId"),
            date: {
                date: moment(_get(data, "transactionTimestamp")).format('MMM DD'),
                year: moment(_get(data, "transactionTimestamp")).format('YYYY')
            },
            heading : [
                {title: 'Event Name', content: _get(heading, 'eventName'), className: 'event-name'},
                {title: 'Transaction Time', content: moment(_get(data, "transactionTimestamp")).format('LT'), className: 'transaction-time'},
                {title: 'Modified By', content: _get(heading, 'modifiedBy'), className: 'modified-by'},
            ],
        }
        ProfileObj.push(obj);
    })
    
    return { ProfileObj, ProfileHistoryData }
}

export default connect(mapStateToProps)(ProfileHistory)