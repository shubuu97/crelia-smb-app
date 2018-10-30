import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
/* Redux Import */ 
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
/* Material Imports */ 
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
/* Assets*/ 
import imgmailsent from '../../../Assets/images/mail-sent-icon.png';

const styles = theme => ({
    form: {
        width: '100%', // Fix IE11 issue.
        marginTop: theme.spacing.unit,
    }
});


class RegistrationSuccess extends React.Component {

    handleResend = (values) => {
        //this.props.history.push('/passwordSent')
    }

    censorWord = (str) => {
        return str[0] + str[1] + str[2] + "*".repeat(str.length - 3);
     }
     
    censorEmail = (email) => {
        var arr = email.split("@");
        if(email)
            return this.censorWord(arr[0]) + "@" + arr[1];
        else
            this.props.history.push('/')
     }

    render() {
        const { classes, handleSubmit } = this.props;
        const email = _get(this.props, "location.state.email", "");
        return (
            <React.Fragment>
                <div className="msg-container">
                    <div className="msgicon msgiconmail pb-15"><img src={imgmailsent} /></div>
                    <h4>
                        Email sent
                            </h4>
                    <p className="text-center">
                        We have sent you account activation link to {this.censorEmail(email)}.<br />
                        Please check your inbox for further instruction.
                            </p>
                    <form className={classes.form} onSubmit={handleSubmit(this.handleResend)} >
                        <div class="action-block">
                            <p className="text-center">
                                Didn't get the letter?
                            </p>
                            <Button
                                type="submit"
                                disabled={this.props.isFetching.isFetching}
                                variant="contained"
                                color="primary"
                                className="btnprimary no-marg"
                            >
                                {this.props.isFetching.isFetching ? <CircularProgress size={24} /> : 'Resend'}
                            </Button>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        );
    }
}

RegistrationSuccess = reduxForm({
    form: 'RegistrationSuccess'
})(RegistrationSuccess);

RegistrationSuccess = withStyles(styles)(RegistrationSuccess);

function mapStateToProps(state) {
    let isFetching = _get(state, 'LoginData', false);
    return { isFetching };
}
export default connect(mapStateToProps)(RegistrationSuccess)

RegistrationSuccess.propTypes = {
    classes: PropTypes.object.isRequired,
};