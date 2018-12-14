import React, { Component } from 'react';
import _get from 'lodash/get';
/* Style Imports*/

/* Material Imports*/

/* Redux Imports */
import { connect } from 'react-redux';
import { postData } from '../../Redux/postAction';
import genericGetData from '../../Global/dataFetch/genericGetData'
import { APPLICATION_BFF_URL } from '../../Redux/urlConstants'
import { commonActionCreater } from '../../Redux/commonAction'
/* Components */
import CardTable from '../../Global/CardTable/CardTable';
import Button from '@material-ui/core/Button';
import PostData from '../../Global/dataFetch/genericPostData';

//Dialogue import 

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import OffersContainer from '../offers/OffersContainer';

//selector imports
import { tableDataSelector, loanDataSelector,filterDataSelector } from './selectors/loanDataSelector'




class LoanRequestsContainer extends React.PureComponent {

    constructor() {
        super();
        this.state = {
            tableData: [],
            first: 0,
            limit: 10,
            open: false
        }
    }

    componentDidMount() {
        this.loanDataFetcher();
    }

    //helper function start here
    loanDataFetcher = (first, limit) => {

        genericGetData({dispatch:this.props.dispatch,url:'/api/filterMetaData',constant:{
            init:'filterMetaData_init',
            success:'filterMetaData_success',
            error:'filterMetaData_error'
        }})
        this.props.dispatch(
            postData(
                `${APPLICATION_BFF_URL}/api/fundList`,
                {
                    getAll: false,
                    skip: this.state.first,
                    limit: this.state.limit
                },
                'fetchingOfferData',
                {
                    init: 'fetchingLoanRequestData_init',
                    success: 'fetchingLoanRequestData_success',
                    error: 'fetchingLoanRequestData_error'
                }
            ));
    }
    getFundType = ($class) => {
        let $classarr = $class.split('.');
        let fundType = $classarr[$classarr.length - 1];
        return fundType
    }
    //helper function end here

    //Dialogue actions starts here
    extendedComponentAction = (data, index) => {
        this.setState({reqID:_get(this.props, `loanData[${index}].id`)})
        // this.props.dispatch(commonActionCreater({
        //     reqID: _get(this.props, `loanData[${index}].id`)
        // }, 'SAVE_FUND_REQ_ID'));
       //this.setState({ open: true })

    }

    handleClose = () => {
        this.setState({ open: false })
    }
    //Dialogue actions ends here


    //pagination action start here
    onShowSizeChange = (current, pageSize) => {
        this.state.first = (((current - 1) * (pageSize)) + 1) - 1;
        this.state.limit = pageSize;
        this.loanDataFetcher();
        this.setState({ first: this.state.first, limit: this.state.limit })

    }
    onPageChange = (current, pageSize) => {
        this.state.first = (((current - 1) * (pageSize)) + 1) - 1;
        this.state.limit = pageSize;
        this.loanDataFetcher();
        this.setState({ first: this.state.first, limit: this.state.limit })
    }
    //pagination action end here

    //table actions start here
    handleEdit = (data, index) => {
        console.log(index, "ff");
        console.log(this.props.loanData)
        this.props.dispatch(commonActionCreater({
            reqID: _get(this.props, `loanData[${index}].id`)
        }, 'SAVE_FUND_REQ_ID'));
        console.log(_get(this.props, `loanData[${index}]`));
        let $class = _get(this.props, `loanData[${index}].$class`);
        let fundType = this.getFundType($class);
        if (fundType == 'Equity') {
            this.props.history.push('/LoanRequest/Equitycreate');
        }
        else {
            this.props.history.push('/LoanRequest/create');
        }
    }
    //Todo Not working for Equity
    handleSendToApproval = (data, index) => {
        console.log(_get(this.props, `loanData[${index}]`), "data is here");
        let reqObj = {};
        let url;
        let fundType = this.getFundType(_get(this.props, `loanData[${index}].$class`));
        reqObj.companyId = this.props.companyId;
        reqObj.id = _get(this.props, `loanData[${index}].id`);
        reqObj.moneyRange = _get(this.props, `loanData[${index}].moneyRange`);
        reqObj.interestRateType = _get(this.props, `loanData[${index}].interestRateType`);
        reqObj.interestRate = _get(this.props, `loanData[${index}].interestRate`);
        reqObj.term = _get(this.props, `loanData[${index}].term`);
        reqObj.timeFrame = _get(this.props, `loanData[${index}].timeFrame`);
        reqObj.fundAllocation = _get(this.props, `loanData[${index}].fundAllocation`);
        if (fundType == 'Equity') {
            url = '/api/SendEquityRequest'
        }
        else {
            url = '/api/SendLoanRequest'
        }
        PostData({
            dispatch: this.props.dispatch,
            reqObj,
            url,
            successText: 'Request Sent Succesfully for approval',
            constants: {
                init: 'TableActions_init',
                success: 'TableActions_success',
                error: 'TableActions_error',
                identifier: 'TableActions_init'
            },
            successCb: this.loanDataFetcher
        })
    }
    handleSuspend = (data, index) => {
        let reqObj = {};
        reqObj.id = _get(this.props, `loanData[${index}].id`);
        let $class = _get(this.props, `loanData[${index}].$class`);
        let $classarr = $class.split('.');
        reqObj.fundType = $classarr[$classarr.length - 1];
        reqObj.comment = 'some dummy comment';
        PostData({
            dispatch: this.props.dispatch,
            reqObj,
            url: '/api/SuspendFund',
            successText: 'Suspended succesfully',
            constants: {
                init: 'suspendloan_init',
                success: 'suspendloan_success',
                error: 'suspendloan_error',
                identifier: 'suspendloan_init'
            },
            successCb: this.loanDataFetcher
        })
    }

    handleCloseRequest = (data, index) => {
        let reqObj = {};
        reqObj.id = _get(this.props, `loanData[${index}].id`);
        let $class = _get(this.props, `loanData[${index}].$class`);
        let $classarr = $class.split('.');
        reqObj.fundType = $classarr[$classarr.length - 1];
        reqObj.comment = 'some dummy comment';
        PostData({
            dispatch: this.props.dispatch,
            reqObj,
            url: '/api/CloseFund',
            successText: 'Suspended succesfully',
            constants: {
                init: 'suspendloan_init',
                success: 'suspendloan_success',
                error: 'suspendloan_error',
                identifier: 'suspendloan_init'
            },
            successCb: this.loanDataFetcher
        })
    }
    handleHistory = (data, index) => {
        let reqObj = {};
        console.log(index, "ff");
        console.log(this.props.loanData)
        this.props.dispatch(commonActionCreater({
            fund_transactionIds: _get(this.props, `loanData[${index}].transactionIds`)
        }, 'SAVE_fund_transactionIds'));
        this.props.history.push('/LoanHistory');
    }
//table actions start here
fetchingFilterQueryData=(query)=>
{
console.log(query,"query")
}
    render() {
        console.log('render run')
        const props = this.props;
        return (
            <div>

                {/* Card Rows */}

                <CardTable
                    title="Fund Requests"
                     filterData={this.props.filterData}
                     filterAction={this.fetchingFilterQueryData}

                    menuActions={[{
                        Title: 'Send To Approval',
                        actionEvent: this.handleSendToApproval
                    },
                    {
                        Title: 'Suspend',
                        actionEvent: this.handleSuspend
                    },
                    {
                        Title: 'Close Request',
                        actionEvent: this.handleCloseRequest
                    },
                    {
                        Title: 'Show History',
                        actionEvent: this.handleHistory
                    },
                    ]}
                    soloActions={[{
                        Title: 'Edit',
                        className: 'edit-icon flex-row',
                        actionEvent: this.handleEdit
                    }]}
                    headingData={[
                        'Status',
                        'Fund Type',
                        'Amount',
                        'Currency',
                        'Term and Time Frame',
                        'Purpose Of Loan',
                        'Action']}
                    data={this.props.TableData}
                    actions={true}
                    isExtended={true}
                    filter={false}
                    onShowSizeChange={this.onShowSizeChange}
                    onPageChange={this.onPageChange}
                    chooseColor={this.chooseColor}
                    extendedComponent={
                        {component : OffersContainer
                        , actionEvent: this.extendedComponentAction}
                    }

                    total = {this.props.totalRows}
                    openOfferModal={this.openOfferModal}
                    headingButtons={
                        [
                            { Title: 'Create Request', className: "mb-10 ", actionEvent: ()=>this.props.history.push('/LoanRequest/SelectLoanType') },
                        ]
                    }

                />
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    maxWidth='md'
                    fullWidth={true}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">{"Available Offers"}</DialogTitle>
                    <DialogContent>
                        <OffersContainer />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}


function mapStateToProps(state) {

    let companyId = _get(state, 'BasicInfo.lookUpData.companyDetails.id', null);
    let totalRows = _get(state,'LoanRequest.lookUpData.total_rows',0);
    return { loanData:loanDataSelector(state), TableData: tableDataSelector(state), companyId,
        totalRows,filterData:filterDataSelector(state) }

}

LoanRequestsContainer = connect(mapStateToProps)(LoanRequestsContainer)

export default LoanRequestsContainer;


