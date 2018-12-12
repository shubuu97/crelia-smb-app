import React, { Component } from 'react';
import _get from 'lodash/get';
/* Material Imports*/
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Badge from '@material-ui/core/Badge'
/* Components Imports */
import ExtendedTable from './ExtendedTable'

class PopulateRows extends Component {

    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            open: false,
            hoverEvent: false,
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

    /* Formated Cells - Object type cell data */
    formatedCell = (data, key) => {
        /* If Component Prop is passed in cell obj */
        if (_get(key, 'component')) {
            return _get(key, 'component')
        }
        else {
            return (
                <div className="flex-column">
                    <div className="flex-row justify-center align-center" >
                        {
                            _get(key, 'status', false) ?
                                <svg style={{ width: '12px', height: '12px' }} viewBox="0 0 24 24">
                                    <path fill={this.chooseColor(key.status)} d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                                </svg> : null
                        }

                        <span>&nbsp;{_get(key, 'content')}</span>

                        {
                            _get(key, 'dataBadge', false) ?
                                <div className="data-badge">
                                    <Badge badgeContent={key.dataBadge} color="primary"> </Badge>
                                </div> : null
                        }
                    </div>
                    {
                        _get(key, 'subData', false) ?
                        <span className="sub-data-text">&nbsp;{_get(key, 'subData')}</span> :
                        null
                    }
                    
                    
                </div>

            )
        }
    }

    /* Status Property of cell */
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
        return statusIconColor
    }

    render() {
        let data = _get(this.props, "rows", {});
        let rows = Object.keys(data).map((keyname, index) => {
            if (keyname != "extendedRow" && keyname != "extendedTable") {
                if (typeof data[keyname] != 'object') {
                    return <div key={index} className="data-col">{data[keyname]}</div>
                }
                else {
                    if (Array.isArray(data[keyname])) {
                        return (<div className="data-col">
                            {data[keyname].map((dt, index) => <React.Fragment>{dt}{index + 1 != data[keyname].length ? <br /> : null}</React.Fragment>)}</div>)
                    }
                    else {
                        return (
                            <div key={index} className="data-col" style={{ color: _get(data[keyname], 'color'), background: _get(data[keyname], 'background') }}>
                                {this.formatedCell(data, data[keyname])}
                            </div>
                        );
                    }
                }
            }
        })
        if (this.props.menuActions || this.props.soloActions) {
            rows.push(
                <div className="data-col">
                    {
                        this.props.soloActions ?
                            this.props.soloActions.map((actionData, index) => {
                                return (
                                    <span
                                        title={_get(actionData, 'Title', "")}
                                        className={_get(actionData, 'className')}
                                        onMouseOver={
                                            this.props.handleOnMouseOver
                                        }
                                        onMouseOut={this.props.handleOnMouseOut}
                                        onClick={this.handleMenuClick(_get(actionData, 'actionEvent'), data)} >
                                    </span>
                                )
                            }) : null
                    }

                    {
                        this.props.menuActions.length == 1 ?

                            <Button
                                onClick={this.handleMenuClick(this.props.menuActions[0].actionEvent, data, 0)}
                                color='primary'
                                variant='contained'
                                className="mb-10 "
                            >
                                {this.props.menuActions[0].Title}
                            </Button> :

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
                                    {
                                        this.props.menuActions.map((actionData, index) => {
                                            return (
                                                <MenuItem key={index} onClick={this.handleMenuClick(actionData.actionEvent, data, index)}>
                                                    {actionData.Title}
                                                </MenuItem>
                                            )
                                        })
                                    }
                                </Menu>
                            </ClickAwayListener>
                    }


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
    if (props.extendedComponent) {
        return props.extendedComponent
    }
    else {
        let data = _get(props, "rows.extendedRow", {});
        let rows = []
        rows = Object.keys(data).map((keyname, index) => {
            let key = keyname.replace(/([a-z])([A-Z])/g, '$1 $2');
            return (
                <div key={index} className="mb-10">
                    <span className="title-text"> {key} : </span>
                    <span className="primary-text">{data[keyname]}</span>
                </div>
            )
        })

        if (rows.length != 0 && !_get(props, "rows.extendedTable", false)) {
            return (
                <div className="extended-row">
                    <div className="col-sm-6 flex-column">
                        {rows}
                    </div>
                </div>
            )
        }
        else if (_get(props, "rows.extendedTable", false)) {
            return (
                <div className="extended-row">
                    <ExtendedTable
                        data={_get(props, "rows.extendedTable", {})}
                        extendedTableProps={props.extendedTableProps}
                    />
                </div>
            )
        }
        else {
            return null
        }
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
        this.setState({ hoverEvent: true })
    }
    handleOnMouseOut = () => {
        this.setState({ hoverEvent: false })
    }

    render() {
        const props = this.props;
        return (
            <div className="longCard" >
                <div className="table-col" onClick={this.props.onClick}>
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

export default EachRow;