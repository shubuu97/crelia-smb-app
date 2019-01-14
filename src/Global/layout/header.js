import React from 'react';
import PropTypes from 'prop-types';
/* Material Imports*/
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
/* Assets */
import logoimg from '../../Assets/images/logo-white.png';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    margin: {
        margin: theme.spacing.unit * 2,
    },
    padding: {
        padding: `0 ${theme.spacing.unit * 2}px`,
    },
    minWidth: {
        'min-width': '100px',
    },
});

class Header extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    logout = () => {
        localStorage.clear()
        this.props.history.push('/')
    }

    handleMouseOver = event => {
        this.setState({ open: true, anchorEl: event.currentTarget });
    };

    handleRequestClose = () => {
        this.setState({ open: false });
    };
    handleRequestClose=()=>
    {
        this.setState({ open: false });
    }

    handleMouseOut = event => {
        this.setState({ open: false });
    }

    render() {
        const { classes } = this.props;
        return (
            <ClickAwayListener onClickAway={this.handleRequestClose}>

                <div className="topnavcontainer">
                    <div className="nevbar-left">
                        <div className="logo"><img src={logoimg} /></div>
                        <div className="nevbar">
                            <ul>
                                <li onClick={() => { this.props.history.push('/LoanRequest'); }}>
                                    <a>Requests</a>
                                </li>
                                <li onClick={() => { this.props.history.push('/about'); }}>
                                    <a>Company Profile</a>
                                </li>
                               
                            </ul>
                        </div>

                    </div>

                    <Menu
                        className="header-menu"
                        id="simple-menu"
                        anchorEl={this.state.anchorEl}
                        open={this.state.open}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        onRequestClose={this.handleRequestClose}
                        onMouseOut={this.handleMouseOut}
                    >
                         <MenuItem onClick={() => {
                            this.props.history.push('/settings');
                            this.setState({ open: false })
                        }}>Settings</MenuItem>
                        <MenuItem onClick={this.logout}>Logout</MenuItem>
                    </Menu>

                    <div className="nevbar-right">
                        <ul className="myaccount">
                        {/* <li><a href="#"><i class="material-icons notification">notifications_none</i></a></li> */}

                            <li title='Tasks' onClick={()=>this.props.history.push('/tasks')}>
                            <a>
                            <i style={{fontSize: '2.2rem', width:'35px'}} class="material-icons notification">assignment</i>
                            </a>
                            </li>
                            <li onMouseOver={this.handleMouseOver}><a >
                                <i className="material-icons useraccount" >person_outline</i>
                                <i class="material-icons droparrow">keyboard_arrow_down</i></a>
                            </li>

                        </ul>
                    </div>
                </div>
            </ClickAwayListener>
        );
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);