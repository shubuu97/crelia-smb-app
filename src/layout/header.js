import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import logoimg from '../Assets/images/logo-white.png';

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

    render() {
        const { classes } = this.props;
        return (
            <div className="topnavcontainer">
                <div className="nevbar-left">
                    <div className="logo"><img src={logoimg} /></div>
                    <div className="nevbar">
                        <ul>
                            <li><a href="#">Users</a></li>
                            <li><a href="#">Organizations</a></li>
                            <li><a href="#">Loans</a></li>
                            <li><a href="#">Offers</a></li>
                            <li><a href="#">Requests</a></li>
                            <li><a href="#">Others <i class="material-icons droparrow">keyboard_arrow_down</i></a></li>
                        </ul>
                    </div>

                </div>
                <div className="nevbar-right">
                    <ul className="myaccount">
                        <li><a href="#"><i class="material-icons notification">notifications_none</i></a></li>
                        <li><a onClick={this.logout}>
                            <i class="material-icons useraccount">person_outline</i>
                            <i class="material-icons droparrow">keyboard_arrow_down</i></a>
                        </li>
                    </ul>
                </div>
            </div>


            // <div className={classes.root}>
            //     <AppBar position="static">
            //         <Toolbar>
            //             <Typography variant="h6" color="inherit" className={classes.grow}>
            //                 crelia capital
            //             </Typography>

            //             <Tabs
            //                 value={this.state.value}
            //                 onChange={this.handleChange}
            //                 indicatorColor="secondary"
            //             >

            //             </Tabs>
            //         </Toolbar>
            //     </AppBar>
            // </div>
        );
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);