import React, { Component } from 'react';
import _get from 'lodash/get';
/* Material Imports*/
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem'
/* Redux Imports */
import { connect } from 'react-redux';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Badge from '@material-ui/core/Badge'




class PopulateRows extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            open: false,
            hoverEvent: false
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
    chooseColor = (status) => {
        let statusIconColor = '';
        switch (status) {
                case 'ACTIVE': {
                    return statusIconColor = '#32CD32' //Light Green   
                }
                case 'DECLINED': {
                    return statusIconColor = '#ff0000'; //Red
                }
                case 'SUSPENDED': {
                    return statusIconColor = '#FFFF00'; // Yellow    
                }
                case 'DRAFT': {
                    return statusIconColor = '#DCDCDC'; // Light Grey  
                }
                case 'PENDING': {
                    return statusIconColor = '#A9A9A9'// Dark light Grey 
                }
                case 'OFFERED': {
                    return statusIconColor = '#008000'; //Green
                }
                case 'CLOSED': {
                    return statusIconColor = '#000000'; //Black
                }
                case 'GRANTED': {
                    return statusIconColor = '#0000ff'; //Blue
                }
                case 'BLOCKED': {
                    return statusIconColor = '#ff0000'; //Red
                }
                case 'GRANTED': {
                    return statusIconColor = '#0000ff'; //Blue
                }
                case 'POSTED': {
                    return statusIconColor = '#008000'; //Green
                }
                case 'DELETED': {
                    return statusIconColor = '#A9A9A9'; //Dark light Grey
                }
                case 'default': {
                    return '#000000';
                }
            
        }
    }

    render() {
        let data = _get(this.props, "rows", {});
        let rows = Object.keys(data).map((keyname, index) => {
            if (keyname != "extendedRow") {
                if (typeof data[keyname] != 'object') {
                    return <div key={index} className="data-col">{data[keyname]}</div>
                }
                else {
                    if (Array.isArray(data[keyname])) {
                        return <div className="data-col"

                        >{data[keyname]}</div>
                    }
                    return <div
                        onClick={() => data.status.offerCount ? this.props.openOfferModal(data, this.props.rowId) : null}
                        style={data.status.offerCount ? { cursor: 'pointer' } : null} key={index} className="data-col">
                        <svg style={{ width: '12px', height: '12px' }} viewBox="0 0 24 24">
                            <path fill={this.chooseColor(data.status.status)} d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                        </svg>
                        <span>&nbsp;{data.status.status}</span>
                        {data.status.offerCount ? <div className="data-badge"><Badge badgeContent={data.status.offerCount} color="primary"> </Badge>
                        </div> : null}
                    </div>
                }
            }

            // return (


            //     <div key={index} className="data-col">
            //         {keyname == 'status' ?
            //             <svg style={{ width: '12px', height: '12px' }} viewBox="0 0 24 24">
            //                 <path fill={this.chooseColor(data[keyname])} d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
            //             </svg> : null}

            //         {keyname == 'status' ? <span>&nbsp;</span> : null}

            //         {keyname == 'status' ? null : data[keyname]}

            //         {keyname == 'status' ? <div className="data-badge"><Badge badgeContent={data['offerCount']} color="primary">

            //         </Badge></div>
            //             : null}

            //     </div>
            // )
        })
        if (this.props.actions) {
            rows.push(
                <div className="data-col">

                    {this.props.editAction ?
                        <span
                            title='edit'
                            className='edit-icon'
                            onMouseOver={
                                this.props.handleOnMouseOver
                            }
                            onMouseOut={this.props.handleOnMouseOut}
                            onClick={this.handleMenuClick(this.props.editAction.actionEvent, data)} >{this.props.editAction.Text}</span> : null}
                    <ClickAwayListener onClickAway={this.handleRequestClose}>

                        <span
                            className="more-icon"
                            onMouseOver={
                                this.props.handleOnMouseOver
                            }
                            onMouseOut={this.props.handleOnMouseOut}
                            onClick={this.handleClick} >...</span>
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
            hoverEvent: false
        }
    }

    extendedData = (props) => {

    }

    handleOnMouseOver = () => {
        debugger;
        this.setState({ hoverEvent: true })
    }
    handleOnMouseOut = () => {
        this.setState({ hoverEvent: false })
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
                    props.isExtended && !this.state.hoverEvent ?
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