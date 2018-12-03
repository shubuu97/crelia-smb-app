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
/* Components */
import CardTable from '../../Global/CardTable/CardTable'

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

let dummyData2 = [
    {
        CompanyName: "Tesla",
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
        CompanyName: "Rockstar Games",
        Amount: "70,000,000 - 100,000,000",
        Currency: "USD",
        Time: "3yrs",
        Region: "United States",
        Sector: "Manufacturing",
        extendedRow: {
            DateOfIncorporation: "02 June 1995",
            IncorporationType: "Limited Liability Company (LLC)",
            NoOfEmployees: "500"
        }
    },
    {
        CompanyName: "Ubisoft",
        Amount: "10,000,000 - 80,000,000",
        Currency: "INR",
        Time: "8yrs",
        Region: "United Kingdom",
        Sector: "Manufacturing",
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
        let decodeData
        if (localStorage.getItem('authToken')) {
            decodeData = jwtDecode(localStorage.getItem('authToken'));
        }
        let id = decodeData.id
        this.props.dispatch(
            getData(`${APPLICATION_BFF_URL}/api/Loan/${id}`, 'fetchingLoanRequestData', {
                init: 'fetchingLoanRequestData_init',
                success: 'fetchingLoanRequestData_success',
                error: 'fetchingLoanRequestData_error'
            })
        )
    }

    dataGenerator = () => {
        let rawData = _get(this, "props.loanData", [])
        let TableData = []
        TableData = rawData.map((data, index) => {
            let obj = {
                CompanyName: "N/A",
                Amount: `${data.moneyRange.minAmount} - ${data.moneyRange.maxAmount}`,
                Currency: `${data.moneyRange.currency}`,
                Time: `${data.term}yrs`,
                Region: "N/A",
                Sector: "N/A",
            }
            return obj
        })
        this.setState({
            tableData: TableData,
        })
    }

    render() {
        const props = this.props;
        console.log("TableData2 - ", this.props.TableData)
        return (
            <div>
                {/* Card Rows */}
                <CardTable
                    data={this.props.TableData}
                    actions={true}
                    isExtended={true}
                    filter={false}
                />
            </div>
        )
    }
}


function mapStateToProps(state) {

    let loanData = _get(state, "LoanRequest.lookUpData", []);
    console.log("loanData - ", loanData)

    let rawData = _get(this, "props.loanData", [])
    let TableData = []
    loanData.map((data, index) => {
        console.log("TableData data - ", data)
        let obj = {
            CompanyName: "N/A",
            Amount: `${data.moneyRange.minAmount} - ${data.moneyRange.maxAmount}`,
            Currency: `${data.moneyRange.currency}`,
            Time: `${data.term}yrs`,
            Region: "N/A",
            Sector: "N/A",
        }
        console.log("TableData obj - ", obj)
        TableData.push(obj)
    })

    console.log("TableData - ", TableData)

    return { loanData, TableData }

}

LoanRequestsContainer = connect(mapStateToProps)(LoanRequestsContainer)

export default LoanRequestsContainer;