import React, { Component } from 'react';
/* Material Imports */ 
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
/* Redux Imports */ 
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
/* Global Imports */ 
import _get from 'lodash/get';
/* Asset Imports */
import imgsuccess from '../../Assets/images/success.png';

const styles = theme => ({
    form: {
        width: '100%', // Fix IE11 issue.
        marginTop: theme.spacing.unit,
    }
});


class PasswordSent extends React.Component {

    handleSentPassword = (values) => {
        //this.props.history.push('/passwordSent')
    }

    render() {
        const { classes, handleSubmit } = this.props;
        return (
            <React.Fragment>

                <div className="msg-container">
                    <div className="msgicon pb-15"><img src={imgsuccess} /></div>
                    <h4>
                        Password Sent!
                        </h4>
                    <p className="text-center">
                        We have sent you password activation link to xxx@gmail.com.<br />
                        Please check your inbox for further innstruction.
                        </p>

                    <form className={classes.form} onSubmit={handleSubmit(this.handleSentPassword)} >
                        <div class="action-block">
                            <p className="text-center">
                                Didn't get the letter?
                            </p>
                            <Button
                                type="submit"
                                disabled={this.props.isFetching}
                                variant="contained"
                                color="primary"
                                className="btnprimary no-marg"
                            >
                                {this.props.isFetching ? <CircularProgress size={24} /> : 'Resend'}
                            </Button>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        );
    }
}

PasswordSent = reduxForm({
    form: 'PasswordSentForm'
})(PasswordSent);


PasswordSent = withStyles(styles)(PasswordSent);

function mapStateToProps(state) {
    let isFetching = _get(state, 'LoginData.isFetching', false);
    return { isFetching };
}
export default connect(mapStateToProps)(PasswordSent)

PasswordSent.propTypes = {
    classes: PropTypes.object.isRequired,
};