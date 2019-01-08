import React from 'react';
import PropTypes from 'prop-types';
/* Material components import */

/* Redux Imports */

/* Components Import */
import CardTable from '../Global/Components/CardTable/CardTable'


// Todo : Improve Filter View
// Todo : Linear Buffer kind loader
// Todo : 

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
        },
        extendedTable: [
            {
                CompanyName: "Electronic Arts",
                Amount: "50,000,000 - 100,000,000",
                Currency: "USD",
                Time: "5yrs",
                Region: "United States",
                Sector: "Manufacturing",
            },
            {
                CompanyName: "Activision Blizzard",
                Amount: "70,000,000 - 100,000,000",
                Currency: "USD",
                Time: "3yrs",
                Region: "United Kingdom",
                Sector: "Manufacturing",
            }
        ],
        Array: ['Hello', 'World'],
        CustomCell: {
            content: 'Active',
            status: 'ACTIVE',
            component: <div>Hello World</div>,
            cellStyle:{
                background: '#decfcf'
            },
        },
        hiddenCell: {
            type: 'hidden'
        },
        rowStyle: {
            background: '#ddffff96',
        },
        allowedActions: ['action1','action5']
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
        },
        Array: ['Hello', 'World', 'Something'],
        CustomCell: {
            dataBadge: '4',
            content: 'Active',
            status: 'ACTIVE',
            component: <div>Hello World</div>,
            cellStyle:{
                
            }
        },
        rowStyle: {
            
        },
        allowedActions: ['action1','action5', 'action2']
    },
    {
        CompanyName: "Square Enix",
        Amount: "10,000,000 - 80,000,000",
        Currency: "INR",
        Time: "8yrs",
        Region: "India",
        Sector: {
            content: "Manufacturing",
            subData: "This is subtext"
        },
        extendedRow: {
            DateOfIncorporation: "02 June 1995",
            IncorporationType: "Limited Liability Company (LLC)",
            NoOfEmployees: "500"
        },
        Array: ['Hello', 'World', 'Something'],

        CustomCell: {
            dataBadge: '4',
            content: 'Active',
            status: 'ACTIVE',
            subData: "hello world?",
            cellStyle:{
                background: '#ab003c',
                color: '#fff'
            }
        },
    }
]

class ExtendedComponent extends React.Component {

    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        return (
            <div>
                Hello World
            </div>
        )
    }
}


class CardTableTest extends React.Component {

    constructor() {
        super();
        this.state = {
            query:null
        }
    }

    redirectToMakeOffer() {

    }

    redirectToEditOffer() {

    }

    fetchingFilterQueryData = (FilterQuery) => {
        this.setState({query:FilterQuery})
    } 

    searchAction = (data) => {
        console.log(data, "searchAction")
    }

    extendedComponentAction = (data, index) => {
        console.log(data, index, "extendedComponentAction")
    }

    render() {
        return (
            <div className="">
                <CardTable
                    // ! Table Title
                    title="Test"
                  
                    // ! Row Data
                    // * This is where you feed data to the table.
                    // * Take reference from the dummy data above.
                    data={dummyRowData}

                    // ! Table Headings
                    // * 'headingData' prop can be sent to name Heading according to your preference 
                    // * if you choose not to pass 'headingData' - Headings will be picked up from your data's key 

                    // //headingData={["hello", "hello"]}

                    // ! Heading Button
                    headingButtons={
                        [
                            { Title: 'Add New', className: "mb-10 ", actionEvent: this.redirectToMakeOffer },
                        ]
                    }

                    // ! Search Bar
                    // Todo : Need to work on Global Search locally and through api
                    searchOption={
                        {actionEvent: this.searchAction}
                    }

                    // ! Action Props
                    // * Menu Actions & Solo Actions have 
                        // * 'Title' prop to give label to each list; 
                        // * 'actionEvent' prop to send an parent level action; 
                        // * 'name' prop is needed in case of restricting allowed actions for eachRow;
                    menuActions={
                        [
                            { Title: 'Send For Approval', actionEvent: this.redirectToMakeOffer, name: 'action1' },
                            { Title: 'Suspend', actionEvent: this.redirectToMakeOffer, name: 'action2' },
                            { Title: 'Close Request', actionEvent: this.redirectToMakeOffer, name: 'action3' },
                        ]
                    }
                    soloActions={
                        [
                            { Title: 'Edit', className: 'edit-icon flex-row', actionEvent: this.redirectToEditOffer, name: 'action4' },
                            { Title: 'Edit', className: 'edit-icon flex-row', actionEvent: this.redirectToEditOffer, name: 'action5' }
                        ]
                    }

                    // ! Extended Row Stuff

                    // * If you provide an Extended component each row will use that customExtendedComponent 
                        // * 'component' prop requires your custom component 
                        // * 'action' prop will give you access to row data and row index
                    // * If you provide extended data in the data itself as a key then those will be used for extended view.
                        // Todo : Need to improve the view

                    extendedComponent={
                        {
                            component : ExtendedComponent, 
                            actionEvent: this.extendedComponentAction
                        }
                    }

                    // extendedTableProps={
                    //     {
                    //         title: "hello"
                    //     }
                    // }

                    
                    // ! Filter Stuff
                    // * Take reference from the dummy data above  
                        // Todo : Study the filter flow and improve the props

                    filterData={dummyFilterData}
                    filterAction={this.fetchingFilterQueryData}
                    filterState={this.state.query}

                    // ! Pagination Stuff
                        // Todo : Study the pagination flow and improve the props

                    onShowSizeChange={this.onShowSizeChange}
                    onPageChange={this.onPageChange}
                    chooseColor={this.chooseColor}

                    // ! Loader
                    loader={true}
                />
            </div>
        );
    }
}

export default CardTableTest;


