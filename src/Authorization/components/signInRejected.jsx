import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper'
import CssBaseline from '@material-ui/core/CssBaseline';
import withStyles from '@material-ui/core/styles/withStyles';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import _get from 'lodash/get';
import imgsuspended from '../../Assets/images/suspended.png';

const styles = theme => ({
    layout: {
        width: 'auto',
        display: 'block', // Fix IE11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
    rejectText: {
        marginTop: "10px",
        fontSize: "1.25em",
    },
    blueButton: {
        backgroundColor: "#7e5bac",
        marginTop: "40px",
        color: "#fff",
    },
    textButton: {
        fontSize: "0.9em",
        marginTop: "10px",
        cursor: "pointer"
    },
});

class SignIn extends Component {
    
    render() {
        console.log(this.props, "props is hre")
        const { classes, handleSubmit } = this.props;
        return (
            <React.Fragment>
               <div className="msg-container">  
                        <div className="msgicon pb-15"><img src={imgsuspended} /></div>
                        <h4>
                            Your Account has been suspended
                        </h4>
                        <div class="action-block">
                            <Button color="primary" variant="contained"  className="btnprimary no-marg">
                                Contact Support
                            </Button>
                            <a className={classes.textButton}>
                                Back to Login
                            </a>
                        </div>
                </div>
            </React.Fragment>
        );
    }
}

SignIn = withStyles(styles)(SignIn);

function mapStateToProps(state) {

    let isFetching = _get(state, 'LoginData.isFetching', false);
    return { isFetching };
}
export default connect(mapStateToProps)(SignIn)