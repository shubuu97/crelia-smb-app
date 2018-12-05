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
import { commonActionCreater } from '../../Redux/commonAction'
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
            tableData: [],
            first:1,
            limit:10
        }
    }

    componentDidMount() {
        this.basicDataFetcher();
    }

    basicDataFetcher = (first,limit) => {
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
        let url
        reqObj.companyId = this.props.companyId;
        reqObj.id = _get(this.props, `loanData[${index}].id`);
        reqObj.moneyRange = _get(this.props, `loanData[${index}].moneyRange`);
        reqObj.interestRateType = _get(this.props, `loanData[${index}].interestRateType`);
        reqObj.interestRate = _get(this.props, `loanData[${index}].interestRate`);
        reqObj.term = _get(this.props, `loanData[${index}].term`);
        reqObj.timeFrame = _get(this.props, `loanData[${index}].timeFrame`);
        reqObj.fundAllocation = _get(this.props, `loanData[${index}].fundAllocation`);

     let fundType =  this.getFundType(_get(this.props, `loanData[${index}].$class`));
     if(fundType=='Equity')
     {
        url = '/api/SendEquityRequest'
     }
     else
     {
         url = '/api/SendLoanRequest'
     }


        PostData({
            dispatch: this.props.dispatch,
            reqObj,
            url,
            successText: 'Request Sent Succesfully for approval',
            constants: {
                init: 'CreateLoan_init',
                success: 'CreateLoan_success',
                error: 'CreateLoan_error',
                identifier: 'CreateLoan_init'
            },
            successCb:this.basicDataFetcher
        })

    }

    handleEdit = (data, index) => {
        this.props.dispatch(commonActionCreater({
            reqID: _get(this.props, `loanData[${index}].id`)
        }, 'SAVE_FUND_REQ_ID'));
        this.props.history.push('/LoanRequest/create');
    }

    handleCloseRequest=(data,index)=>
    {
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
            successCb:this.basicDataFetcher
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
            successCb:this.basicDataFetcher
        })
    }
    onShowSizeChange = (current, pageSize) => {
        this.state.first = 0;
        this.state.limit=pageSize;
        this.basicDataFetcher();
        this.setState({first:this.state.first,limit:this.state.limit})

    }
    onPageChange = (current, pageSize) => {
        this.state.first = current*pageSize;
        this.state.limit=pageSize;
        this.basicDataFetcher();
        this.setState({first:this.state.first,limit:this.state.limit})
    }

    getFundType=($class)=>
    {
        let $classarr = $class.split('.');
        let fundType = $classarr[$classarr.length - 1];
        return fundType
    }
    chooseColor = (status) => {
        let statusIconColor = '';
        switch (status) {
            case 'ACTIVE': {
                statusIconColor = '#008000';
                break;
            }
            // case 'BLOCKED': {
            //     statusIconColor = '#ff0000';
            //     break;
            // }
            // case 'DELETED': {
            //     statusIconColor = '#D3D3D3';
            //     break;
            // }
            case 'DRAFT': {
                statusIconColor = '#ADFF2F';
                break;
            }
            case 'default': {
    
            }
        }
       return  statusIconColor
    }
    render() {
        const props = this.props;
        return (
            <div>

                {/* Card Rows */}
                <Button
                    onClick={() => this.props.history.push('LoanRequest/SelectLoanType')}
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
                    chooseColor={this.chooseColor}

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
            purpose: [_get(data, 'fundAllocation[0].purpose'), _get(data, 'fundAllocation[1].purpose'), _get(data, 'fundAllocation[2].purpose')]
        }
        console.log("TableData obj - ", obj);
        let $class = _get(data,'$class');
        let $classarr = $class.split('.');
        let fundType = $classarr[$classarr.length - 1];
        if(fundType=='Equity')
        {
            obj.Amount = _get(data, 'money.amount');
            obj.Currency = _get(data,'money.currency')
        }
        TableData.push(obj)
    })

    console.log("TableData - ", TableData)

    return { loanData, TableData, companyId }

}

LoanRequestsContainer = connect(mapStateToProps)(LoanRequestsContainer)

export default LoanRequestsContainer;