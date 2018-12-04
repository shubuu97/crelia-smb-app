import React, { Component } from 'react';
import _get from 'lodash/get';
/* Material Imports*/
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem'
/* Redux Imports */
import { connect } from 'react-redux';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';




class PopulateRows extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            open: false,
            hoverEvent:false
        }
    }

    handleClick = event => {
        this.setState({ open: true, anchorEl: event.currentTarget });
    };

    handleMenuClick = (actionEvent, data, index) => {
        return (event) => {
            actionEvent(data, this.props.rowId);
            this.setState({ open: false });
        }
    }
    handleRequestClose = () => {
        this.setState({ open: false })
    }
    render() {
        let data = _get(this.props, "rows", {});
        let rows = Object.keys(data).map((keyname, index) => {
            if (keyname != "extendedRow")
                return (
                    <div key={index} className="data-col">{data[keyname]}</div>
                )
        })
        if (this.props.actions) {
            rows.push(
                <div className="data-col">
                    <ClickAwayListener onClickAway={this.handleRequestClose}>

                        <Button
                        onMouseOver={
                            this.props.handleOnMouseOver
                        }
                        onMouseOut={this.props.handleOnMouseOut}
                        onClick={this.handleClick} >...</Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={this.state.anchorEl}
                            open={this.state.open}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            onRequestClose={this.handleRequestClose}


                        >
                            {this.props.actionData.map((actionData, index) => {
                                return (<MenuItem key={index} onClick={
                                    this.handleMenuClick(actionData.actionEvent, data, index)
                                }>
                                    {actionData.Text}
                                </MenuItem>)
                            })}

                        </Menu>
                    </ClickAwayListener>

                </div>
            )
        }
        return (
            <React.Fragment>

                {rows}



            </React.Fragment>
        )
    }
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
        this.state = {
            hoverEvent:false
        }
    }

    extendedData = (props) => {

    }

    handleOnMouseOver=()=>
    {
        debugger;
        this.setState({hoverEvent:true})
    }
    handleOnMouseOut=()=>
    {
        this.setState({hoverEvent:false})
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
                    props.isExtended&&!this.state.hoverEvent ?
                        <PopulateExtendedRows
                        handleOnMouseOver={this.handleOnMouseOver}
                        handleOnMouseOut={this.handleOnMouseOut}
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