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
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';




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
                            <li><a >Users</a></li>
                            <li><a >Organizations</a></li>
                            <li><a >Loans</a></li>
                            <li><a >Offers</a></li>
                            <li><a >Requests</a></li>
                            <li><a >Others <i class="material-icons droparrow">keyboard_arrow_down</i></a></li>
                        </ul>
                    </div>

                </div>
          
        <Menu
          id="simple-menuff"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          anchorOrigin={{vertical:'bottom',horizontal:'center'}}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          onRequestClose={this.handleRequestClose}
        >
          <MenuItem onClick={()=>{this.props.history.push('/about');
          this.setState({open:false})
          
        }}>Company Profile</MenuItem>
          <MenuItem onClick={()=>{
              this.props.history.push('/account');
              this.setState({open:false})
              }}>My account</MenuItem>
          <MenuItem onClick={this.logout}>Logout</MenuItem>
        </Menu>
       
                <div className="nevbar-right">
                    <ul className="myaccount">
                        <li><a href="#"><i class="material-icons notification">notifications_none</i></a></li>
                        <li onMouseOver={this.handleMouseOver}><a >
                            <i  className="material-icons useraccount" >person_outline</i>
                            <i class="material-icons droparrow">keyboard_arrow_down</i></a>
                        </li>
                        
                    </ul>
                </div>
            </div>
             </ClickAwayListener>


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