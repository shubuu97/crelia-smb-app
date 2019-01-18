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
import showMessage from '../../Redux/toastAction'
/* Components */
import CardTable from '../../Global/Components/CardTable/CardTable';
import Button from '@material-ui/core/Button';
import PostData from '../../Global/dataFetch/genericPostData';

//Dialogue import 

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import OffersContainer from './components/OffersContainer';

//selector imports
import { tableDataSelector, loanDataSelector, filterDataSelector } from './selectors/loanDataSelector'


class LoanRequestsContainer extends React.PureComponent {

    constructor() {
        super();
        this.state = {
            tableData: [],
            first: 0,
            limit: 10,
            data: null,
            index: null,
            open: false,
            savingData: false,
            query: null,
            current: 1
        }
    }

    componentDidMount() {
        this.loanDataFetcher();
        this.filterDataFetcher();
    }

    //helper function start here
    loanDataFetcher = (first, limit, query) => {
        this.setState({ savingData: true });
        this.props.dispatch(
            postData(`${APPLICATION_BFF_URL}/api/fundList`, {
                getAll: false,
                skip: this.state.first,
                limit: this.state.limit,
                ...this.state.queryVar
            },
                'fetchingOfferData',
                {
                    init: 'fetchingLoanRequestData_init',
                    success: 'fetchingLoanRequestData_success',
                    error: 'fetchingLoanRequestData_error'
                })).then((data) => {
                    this.setState({ savingData: false });
                }).catch((err) => {
                    this.setState({ savingData: false });
                    this.props.dispatch(showMessage({ text: err.msg, isSuccess: false }));
                    setTimeout(() => {
                        this.props.dispatch(showMessage({}));
                    }, 6000);
                })
    }

    getFundType = ($class) => {
        let $classarr = $class.split('.');
        let fundType = $classarr[$classarr.length - 1];
        return fundType
    }
    filterDataFetcher = () => {
        genericGetData({
            dispatch: this.props.dispatch, url: '/api/filterMetaData', constant: {
                init: 'filterMetaData_init',
                success: 'filterMetaData_success',
                error: 'filterMetaData_error'
            }
        })
    }
    queryDataFetcher = (query) => {
        this.props.dispatch(
            postData(
                `${APPLICATION_BFF_URL}/api/fundList`,
                {
                    getAll: false,
                    skip: 0,
                    limit: this.state.limit,
                    ...query
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
    filterDataFetcher = () => {
        genericGetData({
            dispatch: this.props.dispatch, url: '/api/filterMetaData', constant: {
                init: 'filterMetaData_init',
                success: 'filterMetaData_success',
                error: 'filterMetaData_error'
            }
        })
    }
    //helper function end here

    //Dialogue actions starts here
    extendedComponentAction = (data, index) => {
        this.setState({ reqID: _get(this.props, `loanData[${index}].id`) })
        // this.props.dispatch(commonActionCreater({
        //     reqID: _get(this.props, `loanData[${index}].id`)
        // }, 'SAVE_FUND_REQ_ID'));
        //this.setState({ open: true })

    }

    handleClose = () => {
        this.setState({ open: false, data: null, index: null })
    }
    //Dialogue actions ends here


    //pagination action start here
    onShowSizeChange = (current, pageSize) => {
        this.state.first = (((current - 1) * (pageSize)) + 1) - 1;
        this.state.limit = pageSize;
        this.loanDataFetcher();
        this.setState({ first: this.state.first, limit: this.state.limit, current: current })

    }
    onPageChange = (current, pageSize) => {
        this.state.first = (((current - 1) * (pageSize)) + 1) - 1;
        this.state.limit = pageSize;
        this.loanDataFetcher();
        this.setState({ first: this.state.first, limit: this.state.limit, current: current })
    }
    //pagination action end here

    //table actions start here
    handleEdit = (data, index) => {
        this.props.dispatch(commonActionCreater({
            reqID: _get(this.props, `loanData[${index}].id`)
        }, 'SAVE_FUND_REQ_ID'));
        let $class = _get(this.props, `loanData[${index}].$class`);
        let fundType = this.getFundType($class);
        if (fundType == 'Equity') {
            this.props.history.push('/LoanRequest/Equitycreate');
        }
        else {
            this.props.history.push('/LoanRequest/create');
        }
    }
    handleSendToApproval = (data, index) => {
        let reqObj = {};
        let url;
        let fundType = this.getFundType(_get(this.props, `loanData[${index}].$class`));
        reqObj.companyId = this.props.companyId;
        reqObj.id = _get(this.props, `loanData[${index}].id`);
        //todo ask about this part
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
        this.setState({ savingData: true })
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
            successCb: (data) => {
                this.loanDataFetcher();
                this.setState({ savingData: false });
            },
            errorCb: (data) => {
                this.setState({ savingData: false })
            }
        })
    }
    //todo check wheather comment is required
    handleSuspend = (data, index) => {
        this.setState({ open: false })
        let reqObj = {};
        reqObj.id = _get(this.props, `loanData[${index}].id`);
        let $class = _get(this.props, `loanData[${index}].$class`);
        let $classarr = $class.split('.');
        reqObj.fundType = $classarr[$classarr.length - 1];
        reqObj.comment = 'some dummy comment';
        this.setState({ savingData: true })
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
            successCb: (data) => {
                this.loanDataFetcher();
                this.setState({ savingData: false });
            },
            errorCb: (data) => {
                this.setState({ savingData: false })
            }
        })
    }

    handleCloseRequest = (data, index) => {
        let reqObj = {};
        reqObj.id = _get(this.props, `loanData[${index}].id`);
        let $class = _get(this.props, `loanData[${index}].$class`);
        let $classarr = $class.split('.');
        reqObj.fundType = $classarr[$classarr.length - 1];
        reqObj.comment = 'some dummy comment';
        this.setState({ savingData: true })
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
            successCb: (data) => {
                this.loanDataFetcher();
                this.setState({ savingData: false });
            },
            errorCb: (data) => {
                this.setState({ savingData: false })
            }
        })
    }
    handleHistory = (data, index) => {
        let reqObj = {};
        this.props.dispatch(commonActionCreater({
            fund_transactionIds: _get(this.props, `loanData[${index}].transactionIds`)
        }, 'SAVE_fund_transactionIds'));
        this.props.history.push('/LoanHistory');
    }
    //table actions start here

    //query selector
    fetchingFilterQueryData = (query) => {
        debugger;
        let queryVar = { ...query }
        if (queryVar.$class) {
            if (queryVar.$class.length == 1)
                queryVar.$class = `com.aob.crelia.fund.${queryVar.$class[0]}`;
            else {
                queryVar.$class = []
            }
        }
        this.setState({ current: 1, query, queryVar });
        this.queryDataFetcher(queryVar);

    }
    render() {
        const props = this.props;
        return (
            <div>

                {/* Card Rows */}

                <CardTable
                    title="Fund Requests"
                    filterData={this.props.filterData}
                    filterAction={this.fetchingFilterQueryData}
                    filterState={this.state.query}
                    loader={this.state.savingData}
                    menuActions={[{
                        Title: 'Send For Approval',
                        actionEvent: this.handleSendToApproval,
                        name: 'PENDING',
                    },
                    {
                        Title: 'Suspend',
                        actionEvent: (data, index) => this.setState({ open: true, data, index }),
                        name: 'SUSPENDED',
                    },
                    {
                        Title: 'Close Request',
                        actionEvent: this.handleCloseRequest,
                        name: 'CLOSED',
                    },
                    {
                        Title: 'Show History',
                        actionEvent: this.handleHistory,
                        name: 'SHOW_HISTORY',
                    },
                    ]}
                    soloActions={[{
                        Title: 'Edit',
                        className: 'edit-icon flex-row',
                        actionEvent: this.handleEdit,
                        name: 'EDIT'
                    }]}
                    headingData={[
                        'Status',
                        'Id',
                        'Fund Type',
                        'Amount',
                        'Currency',
                        'Term and Time Frame',
                        'Purpose of Loan',
                        'Action']}
                    data={this.props.TableData}
                    actions={true}
                    isExtended={true}
                    filter={false}
                    current={this.state.current}
                    onShowSizeChange={this.onShowSizeChange}
                    onPageChange={this.onPageChange}
                    chooseColor={this.chooseColor}
                    extendedComponent={
                        {
                            component: OffersContainer
                            , actionEvent: this.extendedComponentAction
                        }
                    }

                    total={this.props.totalRows}
                    openOfferModal={this.openOfferModal}
                    headingButtons={
                        [
                            { Title: 'Create Request', className: "mb-10 ", actionEvent: () => this.props.history.push('/LoanRequest/SelectLoanType') },
                        ]
                    }

                />
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    maxWidth='sm'
                    fullWidth={true}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">Change Request</DialogTitle>
                    <DialogContent>
                        Do you want to suspend{_get(this.props, `TableData[${this.state.index}].purpose`, []).map((data) => <span> &nbsp;{data},</span>)} request
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary" variant='outlined' >
                            Cancel
                        </Button>
                        <Button onClick={() => this.handleSuspend(this.state.data, this.state.index)} color="primary" variant='raised' >
                            Suspend
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}


function mapStateToProps(state) {

    let companyId = _get(state, 'BasicInfo.lookUpData.companyDetails.id', null);
    let totalRows = _get(state, 'LoanRequest.lookUpData.total_rows', 0);
    let isFetching = _get(state, 'LoanRequest.isFetching', false);
    return {
        loanData: loanDataSelector(state),
        TableData: tableDataSelector(state),
        companyId,
        totalRows,
        filterData: filterDataSelector(state),
        isFetching
    }

}

LoanRequestsContainer = connect(mapStateToProps)(LoanRequestsContainer)

export default LoanRequestsContainer;


