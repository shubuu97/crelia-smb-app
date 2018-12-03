import React, { Component } from 'react';
import _get from 'lodash/get';
/* Material Imports*/
import Button from '@material-ui/core/Button';
/* Redux Imports */
import { connect } from 'react-redux';

let PopulateRows = (props) => {
    let data = _get(props, "rows", {});
    let rows = Object.keys(data).map((keyname, index) => {
        if (keyname != "extendedRow")
            return (
                <div key={index} className="data-col">{data[keyname]}</div>
            )
    })
    if (props.actions) {
        rows.push(
            <div className="data-col">
                <Button>Make Offer</Button>
            </div>
        )
    }
    return (
            rows
    )
}

let PopulateExtendedRows = (props) => {
    let data = _get(props, "rows.extendedRow", {});
    let rows = []
    rows = Object.keys(data).map((keyname, index) => {
        return (
            <div key={index} className="mb-10">
                <span className="title-text"> {keyname} : </span>
                <span className="primary-text">{data[keyname]}</span>
            </div>
        )
    })
    if (rows.length != 0) {
        return (
            <div className="extended-row">
                <div className="col-sm-6 flex-column">
                    {rows}
                </div>
            </div>
        )
    }
    else {
        return null
    }

}

class EachRow extends Component {

    constructor() {
        super();
    }

    extendedData = (props) => {

    }

    render() {
        const props = this.props;
        return (
            <div className="longCard" onClick={this.props.onClick}>
            <div className="table-col">
                {/* Card Rows */}
                <PopulateRows
                    {...this.props}
                />
            </div>
                {/* When Extended card view */}
                {
                    props.isExtended ?
                        <PopulateExtendedRows
                            {...this.props}
                        />
                        :
                        null
                }
            </div>

        )
    }
}


function mapStateToProps(state) {

}

EachRow = connect(mapStateToProps)(EachRow)

export default EachRow;