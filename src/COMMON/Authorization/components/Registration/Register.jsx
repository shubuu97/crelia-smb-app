import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
/* Material Imports */
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
/* Redux Imports */
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { postData } from '../../../../Redux/postAction'
import showMessage from '../../../../Redux/toastAction';
import { APPLICATION_BFF_URL } from '../../../../Redux/urlConstants'
/* Global Imports */
import GlobalTextField from '../../../../Global/Components/GlobalTextField';
import Radio from '../../../../Global/Components/Radio';

import TabHoc from '../TabHoc';

const styles = theme => ({
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  }
});

class Registration extends Component {

  handleSignUp = (values) => {
    values.TOU = 'SMB';
    this.props.dispatch(
      postData(`${APPLICATION_BFF_URL}/api/signup`, values, 'signup', {
        init: 'signup_init',
        success: 'signup_success',
        error: 'signup_error'
      })
    ).then((data) => {
      this.props.history.push({ pathname: '/registerSuccess', state: { email: values.email } })
      setTimeout(() => {
        this.props.dispatch(showMessage({}));
      }, 6000);
    })
      .catch((err) => {
        this.props.dispatch(showMessage({ text: err.msg, isSuccess: false }));
        setTimeout(() => {
          this.props.dispatch(showMessage({}));
        }, 6000);
      })
  }

  render() {
    console.log(this.props, "props is here")
    const { classes, handleSubmit } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <div className="login-field">
          <form className={classes.form} onSubmit={handleSubmit(this.handleSignUp)} >
            <FormControl margin="normal" required fullWidth>
              <Field
                disabled={localStorage.getItem('disabled')}
                name="RegistrationUserType"
                component={Radio}
                radioList={[{ label: "Investor", value: "Investor" }, { label: "SMB", value: "SMB" }]}
              />
            </FormControl>
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
                className="btnprimary ml-35"
              >
                {this.props.isFetching ? <CircularProgress size={24} /> : 'Sign Up'}
              </Button>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

Registration = reduxForm({
  form: 'Registration'
})(Registration);

Registration = withStyles(styles)(Registration);

function mapStateToProps(state) {
  let isFetching = _get(state, 'SignUpData.isFetching', false);
  return { isFetching };
}

export default connect(mapStateToProps)(TabHoc(Registration));

Registration.propTypes = {
  classes: PropTypes.object.isRequired,
};