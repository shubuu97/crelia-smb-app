import React from 'react';
/* Lodash Imports */
import _get from 'lodash/get';
/* Material components import */

/* Redux Imports */

import HistoryView from '../Global/Components/HistoryView/HistoryView'
import NewComponent from './NewComponent'


/* 

Todo : Array of HistoryView and pass individual rowData and extendedData.
Todo : Dummy data for Rows and Extended.
Todo : 

*/

let dummyRows = [
    {
        key: '0',
        date: 'Dec 12',
        time: '2:30pm',
        year: '2018',
        eventName: 'SMB Updated',
        modifiedBy: "Yogi"
    },
    {
        key: '1',
        date: 'Nov 30',
        time: '2:30pm',
        year: '2018',
        eventName: 'SMB Updated',
        modifiedBy: "Mak"
    },
    {
        key: '2',
        date: 'Nov 2',
        time: '2:30pm',
        year: '2018',
        eventName: 'SMB Updated',
        modifiedBy: "Kapil"
    }
]

let dummyExtended1 = {
    name: 'row1 data',
    data: 'something',
}

let dummyExtended2 = {
    name: 'row2 data',
    data: 'something',
}

let dummyExtended3 = {
    name: 'row3 data',
    data: 'something',
}

class HistoryViewTest extends React.Component {

    constructor() {
        super();
        this.state = {
            extendedData: []
        }
    }

    extendedComponentAction = (data, index) => {
        console.log(data, index, "extendedComponentAction")
    }

    render() {
        return (
            <div>
                <HistoryView
                    data={dummyRows}
                    extendedData={this.state.extendedData}
                    fetchExtendedData={this.fetchExtendedData}
                    extendedComponent={
                        {
                            component: NewComponent,
                            actionEvent: this.extendedComponentAction,
                            extendedData : this.state.extendedData
                        }
                    }
                />
            </div>
        );
    }
}

export default HistoryViewTest;
