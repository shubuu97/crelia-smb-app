import React from 'react';
import _get from 'lodash/get';
/* Components Imports */
import CardTable from '../CardTable'

class ExtendedTable extends React.Component {

    constructor() {
        super();
        this.state = {

        }
    }

    populateExtendedTable = (data) => {
        let title, rows = []
        // Populate Row Data
        rows = data.map((mapData, index) => {
            let rowData = {}
            Object.keys(mapData).map((keyname, index) => {
                if (keyname != 'title') {
                    rowData[keyname] = mapData[keyname]
                }
            })
            return rowData
        })

        // Table Title
        title = _get(this, "props.extendedTableProps.title")
        return (
            <CardTable
                title={title}
                data={rows}
            />
        )
    }

    render() {
        return (
            <div style={{ position: 'relative', zIndex: '0' }}>
                {
                    this.populateExtendedTable(this.props.data)
                }
            </div>
        );
    }
}

export default ExtendedTable;
