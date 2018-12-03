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


    render() {
        const { classes } = this.props;
        return (
            <ClickAwayListener onClickAway={this.handleRequestClose}>

                <div className="topnavcontainer">
                    <div className="nevbar-left">
                        <div className="logo"><img src={logoimg} /></div>
                        <div className="nevbar">
                            <ul>
                                <li onClick={() => { this.props.history.push('/about'); }}>
                                    <a>Company Profile</a>
                                </li>
                                <li onClick={() => { this.props.history.push('/ProfileHistory'); }}>
                                    <a>Profile Updates History</a>
                                </li>
                                <li onClick={() => { this.props.history.push('/LoanRequest'); }}>
                                    <a>Requests</a>
                                </li>
                                <li>
                                    <a >Others <i class="material-icons droparrow">keyboard_arrow_down</i></a>
                                </li>
                            </ul>
                        </div>

                    </div>

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
                        <MenuItem onClick={() => {
                            this.props.history.push('/about');
                            this.setState({ open: false })
                        }}>Company Profile</MenuItem>
                        <MenuItem onClick={() => {
                            this.props.history.push('/account');
                            this.setState({ open: false })
                        }}>My account</MenuItem>
                        <MenuItem onClick={this.logout}>Logout</MenuItem>
                    </Menu>

                    <div className="nevbar-right">
                        <ul className="myaccount">
                            <li><a href="#"><i class="material-icons notification">notifications_none</i></a></li>
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