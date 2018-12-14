import React, { Component } from 'react';
import { connect } from 'react-redux';

//Data Fetcher import
import genericPostData from '../../Global/dataFetch/genericPostData';
import basicDataFetcher from '../../Global/dataFetch/basicDataFetcher';

//Lodash imports
import _get from 'lodash/get';

import Histories from './component/Histories';

import Button from '@material-ui/core/Button';

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


                <div className="history-block">
                    <div className="history-row">
                        <div className="short-history">
                            <div className="transaction-date">Dec 12,<br />2018</div>
                            <div className="event-name">
                                <span className="block-title">Event Name</span>
                                <span className="block-data">SMB Updated</span>
                            </div>

                            <div className="transaction-time">
                                <span className="block-title">Transaction Time</span>
                                <span className="block-data">12:49:17pm</span>
                            </div>
                            <div className="modified-by">
                                <span className="block-title">Modified By</span>
                                <span className="block-data">Yogendra</span>
                            </div>
                            <div className="expend-bth">View Button</div>
                        </div>
                        <div className="detailed-history">
                            <Histories
                                dispatch={this.props.dispatch}
                                ProfileHistoryData={this.props.ProfileHistoryData} />
                        </div>
                    </div>

                    <div className="history-row">
                        <div className="short-history">
                            <div className="transaction-date">Dec 12,<br />2018</div>
                            <div className="event-name">
                                <span className="block-title">Event Name</span>
                                <span className="block-data">SMB Updated</span>
                            </div>

                            <div className="transaction-time">
                                <span className="block-title">Transaction Time</span>
                                <span className="block-data">12:49:17pm</span>
                            </div>
                            <div className="modified-by">
                                <span className="block-title">Modified By</span>
                                <span className="block-data">Yogendra</span>
                            </div>
                            <div className="expend-bth">View Button</div>
                        </div>
                        <div className="detailed-history"></div>
                    </div>

                    <div className="history-row">
                        <div className="short-history">
                            <div className="transaction-date">Dec 12,<br />2018</div>
                            <div className="event-name">
                                <span className="block-title">Event Name</span>
                                <span className="block-data">SMB Updated</span>
                            </div>
                            <div className="transaction-time">
                                <span className="block-title">Transaction Time</span>
                                <span className="block-data">12:49:17pm</span>
                            </div>
                            <div className="modified-by">
                                <span className="block-title">Modified By</span>
                                <span className="block-data">Yogendra</span>
                            </div>
                            <div className="expend-bth">View Button</div>
                        </div>
                        <div className="detailed-history"></div>
                    </div>
                </div>
            </div>

        )
    }

}

function mapStateToProps(state) {
    return { ProfileHistoryData: _get(state, 'ProfileHistory.lookUpData') }
}

export default connect(mapStateToProps)(ProfileHistory)