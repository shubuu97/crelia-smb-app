import React from 'react';
import PropTypes from 'prop-types';
/* Material components import */

/* Redux Imports */

/* Components Import */
import CardTable from '../Global/CardTable/CardTable'

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
            color: '#fff',
            background: '#ab003c',
            component: <div>Hello World</div>,
        },
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
            color: '#fff',
            background: '#2E7D32',
            component: <div>Hello World</div>,
        },
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
            color: '#fff',
            background: '#795548',
            subData: "hello world?"
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

        }
    }

    redirectToMakeOffer() {

    }

    redirectToEditOffer() {

    }

    fetchingFilterQueryData = (FilterQuery) => {
        console.log(FilterQuery, "FilterQuery")
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
                    /* Table Title */
                    title="Test"

                    /* Row Data
                    Take reference from the dummy data above */
                    data={dummyRowData}

                    /* headingData prop can be sent to name Heading according to your preference or Headings will be picked up from the data key */
                    
                    // headingData={["hello", "hello"]}

                    headingButtons={
                        [
                            { Title: 'Add New', className: "mb-10 ", actionEvent: this.redirectToMakeOffer },
                        ]
                    }

                    searchOption={
                        {actionEvent: this.searchAction}
                    }

                    /* Action Props */
                    menuActions={
                        [
                            { Title: 'Make an Offer', actionEvent: this.redirectToMakeOffer },
                            { Title: 'Make an Offer', actionEvent: this.redirectToMakeOffer },
                            { Title: 'Make an Offer', actionEvent: this.redirectToMakeOffer },
                        ]
                    }
                    soloActions={
                        [
                            { Title: 'Edit', className: 'edit-icon flex-row', actionEvent: this.redirectToEditOffer },
                            { Title: 'Edit', className: 'edit-icon flex-row', actionEvent: this.redirectToEditOffer }
                        ]
                    }

                    /* Extended Row Stuff

                    **If you provide an Extended component each row will use that customExtendedComponent, else if you provide extended data in the data itself as a key then those will be used for extended view. */
                    
                    // extendedComponent={
                    //     {component : <ExtendedComponent />, actionEvent: this.extendedComponentAction}
                    // }
                    // extendedTableProps={
                    //     {
                    //         title: "hello"
                    //     }
                    // }

                    /* Filter Stuff
                    take reference from the dummy data above  */

                    filterData={dummyFilterData}
                    filterAction={this.fetchingFilterQueryData}

                    /* Pagination Stuff */
                    onShowSizeChange={this.onShowSizeChange}
                    onPageChange={this.onPageChange}
                    chooseColor={this.chooseColor}

                    /* Loader */
                    loader={false}
                />
            </div>
        );
    }
}

export default CardTableTest;


