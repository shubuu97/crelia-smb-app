import React, { Component } from 'react';
import { connect } from 'react-redux';

//Data Fetcher import
import genericPostData from '../../Global/dataFetch/genericPostData';
import basicDataFetcher from '../../Global/dataFetch/basicDataFetcher';

//Lodash imports
import _get from 'lodash/get';
 import Histories from '../TransactionHistory/component/Histories';

import Button from '@material-ui/core/Button';

class LoanHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }
    componentDidMount() {
        if(this.props.fund_transactionIds)
        {
        let reqObj = {transactionIds:this.props.fund_transactionIds}
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
    }

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
                <Histories
                    dispatch={this.props.dispatch}
                    ProfileHistoryData={this.props.ProfileHistoryData} />
            </div>

        )
    }

}

function mapStateToProps(state) {
    return { fund_transactionIds: _get(state, 'staticReducers.fund.fund_transactionIds'),
    ProfileHistoryData: _get(state, 'ProfileHistory.lookUpData') }
}

export default connect(mapStateToProps)(LoanHistory)