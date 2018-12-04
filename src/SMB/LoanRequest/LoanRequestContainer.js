import React, { Component } from 'react';
import _get from 'lodash/get';
/* Style Imports*/

/* Material Imports*/

/* Redux Imports */
import { connect } from 'react-redux';
import { postData } from '../../Redux/postAction';
import showMessage from '../../Redux/toastAction';
import { getData } from '../../Redux/getAction';
import { APPLICATION_BFF_URL } from '../../Redux/urlConstants'
import {commonActionCreater} from '../../Redux/commonAction'
/* Components */
import CardTable from '../../Global/CardTable/CardTable';
import Button from '@material-ui/core/Button';
import PostData from '../../Global/dataFetch/genericPostData'


var jwtDecode = require('jwt-decode');


let dummyData1 = [
    {
        CompanyName: "Electronic Arts",
        Amount: "50,000,000 - 100,000,000",
        Currency: "USD",
        Time: "5yrs",
        Region: "United States",
        Sector: "Manufacturing",
        extendedRow: {
            DateOfIncorporation: "02 June 1995",
            IncorporationType: "Limited Liability Company (LLC)",
            NoOfEmployees: "500"
        }
    },
    {
        CompanyName: "Activision Blizzard",
        Amount: "70,000,000 - 100,000,000",
        Currency: "USD",
        Time: "3yrs",
        Region: "United Kingdom",
        Sector: "Manufacturing",
        extendedRow: {
            DateOfIncorporation: "02 June 1995",
            IncorporationType: "Limited Liability Company (LLC)",
            NoOfEmployees: "500"
        }
    },
    {
        CompanyName: "Square Enix",
        Amount: "10,000,000 - 80,000,000",
        Currency: "INR",
        Time: "8yrs",
        Region: "India",
        Sector: "Manufacturing",
        extendedRow: {
            DateOfIncorporation: "02 June 1995",
            IncorporationType: "Limited Liability Company (LLC)",
            NoOfEmployees: "500"
        }
    }
]

class LoanRequestsContainer extends React.PureComponent {

    constructor() {
        super();
        this.state = {
            tableData: []
        }
    }

    componentDidMount() {
        this.basicDataFetcher();
    }

    basicDataFetcher = () => {
        this.props.dispatch(
            getData(`${APPLICATION_BFF_URL}/api/fund`, 'fetchingLoanRequestData', {
                init: 'fetchingLoanRequestData_init',
                success: 'fetchingLoanRequestData_success',
                error: 'fetchingLoanRequestData_error'
            })
        )
    }
    handleSendToApproval = (data, index) => {
        console.log(_get(this.props, `loanData[${index}]`), "data is here");
        let reqObj = {};
        reqObj.companyId = this.props.companyId;
        reqObj.id = _get(this.props, `loanData[${index}].id`);
        reqObj.moneyRange = _get(this.props, `loanData[${index}].moneyRange`);
        reqObj.interestRateType = _get(this.props, `loanData[${index}].interestRateType`);
        reqObj.interestRate = _get(this.props, `loanData[${index}].interestRate`);
        reqObj.term = _get(this.props, `loanData[${index}].term`);
        reqObj.timeFrame = _get(this.props, `loanData[${index}].timeFrame`);



        PostData({
            dispatch: this.props.dispatch,
            reqObj,
            url: '/api/SendLoanRequest',
            successText: 'Request Sent Succesfully for approval',
            constants: {
                init: 'CreateLoan_init',
                success: 'CreateLoan_success',
                error: 'CreateLoan_error',
                identifier: 'CreateLoan_init'
            }
        })

    }

    handleEdit=(data,index)=>
    {
        this.props.dispatch(commonActionCreater({
            reqID: _get(this.props, `loanData[${index}].id`)
        }, 'SAVE_FUND_REQ_ID'));
        this.props.history.push('/LoanRequest/create');
    }
    onShowSizeChange = (current, pageSize) => {
        console.log(current, 'current');
        console.log(pageSize);
    }

    onPageChange = (current, pageSize) => {
        console.log('onChange:current=', current);
        console.log('onChange:pageSize=', pageSize);
    }
    render() {
        const props = this.props;
        return (
            <div>

                {/* Card Rows */}
                <Button
                    onClick={() => this.props.history.push('LoanRequest/create')}
                    color='primary'
                    variant='contained'
                >Create Request</Button>
                <CardTable
                    actionData={[{
                        Text: 'Send To Approval',
                        actionEvent: this.handleSendToApproval
                    },
                    {
                        Text: 'Edit',
                        actionEvent: this.handleEdit
                    },
                    {
                        Text: 'Suspend',
                        actionEvent: this.handleSuspend
                    },
                    {
                        Text: 'Close Request',
                        actionEvent: this.handleCloseRequest
                    }]}
                    headingData={[
                        'Status',
                        'Amount',
                        'Currency',
                        'Term and Time frame',
                        'Purpose Of loan',
                        'Action']}
                    data={this.props.TableData}
                    actions={true}
                    isExtended={true}
                    filter={false}
                    onShowSizeChange={this.onShowSizeChange}
                    onPageChange={this.onPageChange}
                />
            </div>
        )
    }
}


function mapStateToProps(state) {

    let loanData = _get(state, "LoanRequest.lookUpData.rows", []);
    let TableData = [];
    let companyId = _get(state, 'BasicInfo.lookUpData.companyDetails.id', null);

    loanData.map((data, index) => {
        console.log("TableData data - ", data)
        let obj = {
            status: data.status,
            Amount: `${_get(data, 'moneyRange.minAmount')} - ${_get(data, 'moneyRange.maxAmount')}`,
            Currency: `${_get(data, 'moneyRange.currency')}`,
            Time: `${data.term}yrs`,
            Region: "N/A",
        }
        console.log("TableData obj - ", obj)
        TableData.push(obj)
    })

    console.log("TableData - ", TableData)

    return { loanData, TableData, companyId }

}

LoanRequestsContainer = connect(mapStateToProps)(LoanRequestsContainer)

export default LoanRequestsContainer;