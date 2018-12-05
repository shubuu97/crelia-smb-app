import React, { Component } from 'react';
import _get from 'lodash/get';
/* Material Imports*/
import Button from '@material-ui/core/Button';
/* Redux Imports */
import { connect } from 'react-redux';

/* Components Imports*/
import EachRow from './features/EachRow'
import Filters from './features/Filters'
import Heading from './features/Heading';
import Pagination from './features/Pagination'

import './styles/cardTable.less';




let dummyFilterData = [
    {
        type: "textbox",
        name: "Company Name",
        values: []

    },
    {
        type: "slider",
        name: "Amount",
        values: []

    },
    {
        type: "checkbox",
        name: "Region",
        values: [
            "USA",
            "UK",
            "India",
            "Canada"
        ]
    },
    {
        type: "checkbox",
        name: "Currency",
        values: [
            "USD",
            "EUR",
            "INR",
        ]
    },
    {
        type: "checkbox",
        name: "Sectors",
        values: [
            "Manufacturing",
            "Production",
            "Development"
        ]
    },
    {
        type: "checkbox",
        name: "Time",
        values: [
            "3yrs",
            "4yrs",
            "5yrs",
            "6yrs"
        ]
    },
    {
        type: "radio",
        name: "Already Offers",
        values: [
            "Yes",
            "No"
        ]
    }
]

let dummyRowData = [
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

class LongCard extends Component {

    constructor() {
        super();
        this.state = {
            headingData: [],
            filterData: dummyFilterData,
            filterPanelToggle: false,
            toggleExtendedState: [],
        }
    }

    componentDidMount() {
        this.toggleExtendedStateUpdate();
    }

    /* Update State of toggleExtended from no. of rows*/
    toggleExtendedStateUpdate = () => {
        let allData = this.props.data;
        let toggleState = []
        allData.map((data, index) => {
            toggleState = [...toggleState, false]
        })
        this.setState({
            toggleExtendedState: toggleState
        })
    }

    /* Isolating Row data and generating EachRow components */
    populateRows = () => {
        let allData = _get(this, "props.data", []);
        console.log("allData" , allData)
        let Rows = allData.map((data, index) => {
            return (
                <EachRow
                    rowId={index}
                    actionData={this.props.actionData}
                    rows={data}
                    actions={this.props.actions}
                    isExtended={this.state.toggleExtendedState[index]}
                    onClick={() => this.toggleExtended(index)}
                    height="69px"
                    getHeight={this.getHeight}
                    editAction={this.props.editAction}
                />
            )
        })
        return Rows
    }

    /* Toggle Extended rows */
    toggleExtended = (index) => {
        this.setState({
            toggleExtendedState: this.state.toggleExtendedState.map((title, i) => {
                if (i == index && title == false) {
                    return true
                }
                else return false
            })
        })
    }

    /* Toggle Filter Panel*/ 
    toggleFilterPanel = () => {
        this.setState({
            filterPanelToggle: this.state.filterPanelToggle ? false : true
        })
    }

    render() {
        const props = this.props;
        console.log("CardTable states - ", this.state);
        return (
            <div>
                 <div className="title-btn sticky " id="table-heading">
                        <h1>Loan Requests</h1>
                        <div>
                        <Button color='primary' variant='outlined' className='mb-10 mr-20' onClick={() => this.toggleFilterPanel()}>Filter</Button>
                        <Button
                    onClick={() => this.props.history.push('LoanRequest/SelectLoanType')}
                    color='primary'
                    variant='contained'
                    className="mb-10 "
                >Create Request</Button>

                    </div>
                    </div>
                <div>
                {
                        this.state.filterPanelToggle ?
                            <Filters
                                filterData={this.state.filterData}
                            /> :
                            null
                    }
                </div>
                <div className="loan-request">
                    <div className="custom-table">
                        {/* Heading */}
                        <Heading
                            headingData={this.props.headingData}
                        />
                        {this.populateRows()}
                    </div>

                    <Pagination
                        onShowSizeChange={this.props.onShowSizeChange}
                        onChange={this.props.onPageChange}
                        total={30}

                    />
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {

}

LongCard = connect(mapStateToProps)(LongCard)

export default LongCard;