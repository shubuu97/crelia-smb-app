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
import { postData } from '../../../../Redux/postAction'
import showMessage from '../../../../Redux/toastAction'
import { APPLICATION_BFF_URL } from '../../../../Redux/urlConstants'
/* Global Imports*/
import GlobalTextField from '../../../../Global/Components/GlobalTextField';
import * as qs from 'query-string';
import asyncValidate from '../../validation/setPassword'

var jwtDecode = require('jwt-decode');

const styles = theme => ({
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  }
});

class ResetNewPassword extends Component {

  constructor(props) {
    super(props);
    this.state = {
      token : null,
      iss: "",
      email: "",
      username: "",
      role: "",
      iat: '',
      exp: false,
    }
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  componentDidMount() {
    localStorage.clear();
    const params = qs.parse(this.props.location.search);
    console.log(params, "parmas");
    localStorage.setItem('authToken', params.token)
    if (params.token) {
      let tokenObj = jwtDecode(params.token);
      this.setState({ tokenObj, token : params.token });
    }
    else {
      this.props.history.push('/')
    }
  }

  handlePasswordChange = (values) => {
    let tokenObj = this.state.tokenObj
    let reqObj = { password: values.password };
    console.log(reqObj, "Request Object");

    this.props.dispatch(
      postData(`${APPLICATION_BFF_URL}/api/changePassword`, reqObj, 'changePass-data', {
        init: 'changePass_init',
        success: 'changePass_success',
        error: 'changePass_error'
      })
    ).then((data) => {
      this.props.history.push("/");
    })
      .catch((err) => {
        this.props.dispatch(showMessage({ text: err.msg, isSuccess: false }));
        setTimeout(() => {
          this.props.dispatch(showMessage({}));
        }, 6000);
      })

  }

  render() {
    const { classes, handleSubmit } = this.props;
    return (
      <React.Fragment>
        <div className="login-field pt-60">
          <h4>Reset Your Password</h4>
          <p variant="caption">Enter your email and we'll send you instuctions on how to reset your password</p>
          <form className={classes.form} onSubmit={handleSubmit(this.handlePasswordChange)} >
            <FormControl margin="normal" required fullWidth>
              <Field
                label="New Password"
                placeholder=""
                name="password"
                component={GlobalTextField}
                variant="standard"
                id="password"
                fullWidth='fullWidth'
                required='required'
                autoFocus='autoFocus'
                type="password"
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <Field
                label="Confirm Password"
                placeholder=""
                name="confirmNewPassword"
                component={GlobalTextField}
                variant="standard"
                id="confirmPassword"
                fullWidth='fullWidth'
                required='required'
                type="password"
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
                {this.props.isFetching ? <CircularProgress size={24} /> : 'Change Password'}
              </Button>
            </div>
          </form></div>
      </React.Fragment>
    );
  }
}

ResetNewPassword = reduxForm({
  form: 'changePassForm',
  asyncValidate,
})(ResetNewPassword);

ResetNewPassword = withStyles(styles)(ResetNewPassword);

function mapStateToProps(state) {

  let isFetching = _get(state, 'LoginData.isFetching', false);
  return { isFetching };
}
export default connect(mapStateToProps)(ResetNewPassword)

ResetNewPassword.propTypes = {
  classes: PropTypes.object.isRequired,
};