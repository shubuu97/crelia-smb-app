import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
/* Material Imports */
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
/* Redux Imports */
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { postData } from '../../../Redux/postAction'
import showMessage from '../../../Redux/toastAction'
import { APPLICATION_BFF_URL } from '../../../Redux/urlConstants'
/* Global Imports*/
import GlobalTextField from '../../../Global/GlobalTextField';


const styles = theme => ({
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  }
});

class ResetPassword extends Component {

  handlePasswordReset = (values) => {
    this.props.dispatch(
      postData(`${APPLICATION_BFF_URL}/api/resetPassword`, values, 'reset-data', {
        init: 'resetPass_init',
        success: 'resetPass_success',
        error: 'resetPass_error'
      })
    ).then((data) => {
      this.props.history.push({ pathname: '/passwordSent', state: { email: values.email } })
    })
      .catch((err) => {
        this.props.dispatch(showMessage({ text: err.msg, isSuccess: false }));
        setTimeout(() => {
          this.props.dispatch(showMessage({}));
        }, 6000);
      })
  }
  
  render() {
    console.log(this.props, "props is hre")
    const { classes, handleSubmit } = this.props;
    return (
      <React.Fragment>
        <div className="login-field pt-60">
          <h4>Reset Your Password</h4>
          <p variant="caption">Enter your email and we'll send you instuctions on how to reset your password</p>
          <form className={classes.form} onSubmit={handleSubmit(this.handlePasswordReset)} >
            <FormControl margin="normal" required fullWidth>
              <Field
                label="Enter your email address"
                placeholder=""
                name="email"
                component={GlobalTextField}
                variant="standard"
                id="emailAddress"
                fullWidth='fullWidth'
                required='required'
                autoFocus='autoFocus'
              />
            </FormControl>

            <div class="action-block">
              <Button
                type="submit"
                fullWidth
                disabled={this.props.isFetching}
                variant="contained"
                color="primary"
                className="btnprimary"
              >
                {this.props.isFetching ? <CircularProgress size={24} /> : 'Send Reset Instructions'}
              </Button>
            </div>
          </form></div>
      </React.Fragment>
    );
  }
}

ResetPassword = reduxForm({
  form: 'resetForm'
})(ResetPassword);


ResetPassword = withStyles(styles)(ResetPassword);

function mapStateToProps(state) {

  let isFetching = _get(state, 'LoginData.isFetching', false);
  return { isFetching };
}
export default connect(mapStateToProps)(ResetPassword)

ResetPassword.propTypes = {
  classes: PropTypes.object.isRequired,
};