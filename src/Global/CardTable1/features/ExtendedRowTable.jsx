import React, { Component } from 'react';
import _get from 'lodash/get';

class ExtendedRowTable extends Component {

    constructor() {
        super();
    }

    render() {
        console.log("Filter Data - ", this.props.filterData)
        return (
            <div className="filter-test">
            
            </div>
        )
    }
}

export default ExtendedRowTable;