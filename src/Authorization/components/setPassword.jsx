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
import { postData } from '../../Redux/postAction'
import showMessage from '../../Redux/toastAction'
/* Global Imports */
import GlobalTextField from '../../Global/GlobalTextField';
import * as qs from 'query-string';
import asyncValidate from '../validation/setPassword'
/* Phone No. Input Imports */
import PhoneInput from '../../Global/PhoneNumInput'

var jwtDecode = require('jwt-decode');


const styles = theme => ({
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  }
});

class ResetPassword extends Component {

  constructor(props) {
    super(props);
    this.state = { tokenObj: null }
  }
  handleSetPassword = (values, a, b) => {
    console.log(a, b, "xxxx");
    let localValue = { ...values }
    delete localValue.confirmNewPassword;
    let obj = {};
    obj.email = this.state.tokenObj.email;
    obj.companyType = this.state.tokenObj.TOU;
    let credential = {username: values.username, password: values.password}
    let reqObj = { ...localValue, ...obj };
    console.log(reqObj, "Request Object");
    this.props.dispatch(
      postData(`http://13.233.38.55:4005/api/${this.state.tokenObj.URL}`, reqObj, 'password-data', {
        init: 'set_init',
        success: 'set_success',
        error: 'set_error'
      })
    ).then((data) => {
      this.props.dispatch(showMessage({ text: 'Update Succesfully', isSuccess: true }));
      setTimeout(() => {
        this.props.dispatch(showMessage({}));
        this.props.history.push('/');
      }, 1000);
    })
      .catch((err) => {
        this.props.dispatch(showMessage({ text: err.msg, isSuccess: false }));
        b.setSubmitFailed();
        setTimeout(() => {
          this.props.dispatch(showMessage({}));
        }, 3000);
      })
  }

  handleSignIn = (values) => {
    this.props.dispatch(
      postData('http://13.233.38.55:4005/api/login', values, 'login-data', {
        init: 'login_init',
        success: 'login_success',
        error: 'login_error'
      })
    ).then((data) => {
      localStorage.setItem('authToken', data.token);
      this.props.history.push('/onboard')
    })
      .catch((err) => {
        console.log('err')
      })
  }

  componentWillMount() {
    localStorage.clear();
  }
  componentDidMount() {
    const params = qs.parse(this.props.location.search);
    console.log(params, "parmas");
    localStorage.setItem('authToken', params.token)
    if (params.token) {
      let tokenObj = jwtDecode(params.token);
      this.setState({ tokenObj })
    }
    else {
      this.props.history.push('/')
    }
  }
  render() {
    console.log(this.props, "props is hre")
    const { classes, handleSubmit } = this.props;
    return (
      <React.Fragment>
        <div className="login-field pt-60">
          <h4>Set Your Password</h4>
          <p>{_get(this.state, 'tokenObj.email', '')}</p>
          <form className={classes.form} onSubmit={handleSubmit(this.handleSetPassword)} >
            <FormControl margin="normal" required fullWidth>
              <Field
                label="User Name"
                placeholder=""
                name="username"
                component={GlobalTextField}
                variant="standard"
                id="emailAddress"
                fullWidth='fullWidth'
                required='required'
                autoFocus='autoFocus'
              />
            </FormControl>
            <div className="row">
              <div className="col-sm-4">
                <FormControl margin="normal" required fullWidth>
                  <Field
                    label="First Name"
                    placeholder=""
                    name="firstName"
                    component={GlobalTextField}
                    variant="standard"
                    id="emailAddress"
                    fullWidth='fullWidth'
                    required='required'
                  />
                </FormControl></div>
              <div className="col-sm-4"><FormControl margin="normal" required fullWidth>
                <Field
                  label="Middle Name"
                  placeholder=""
                  name="middleName"
                  component={GlobalTextField}
                  variant="standard"
                  id="emailAddress"
                  fullWidth='fullWidth'

                />
              </FormControl></div>
              <div className="col-sm-4"> <FormControl margin="normal" required fullWidth>
                <Field
                  label="Last Name"
                  placeholder=""
                  name="lastName"
                  component={GlobalTextField}
                  variant="standard"
                  id="emailAddress"
                  fullWidth='fullWidth'
                  required='required'

                />
              </FormControl></div>
            </div>
            <div className="mt-16">
            <FormControl margin="normal" required fullWidth>
              <Field
                label="Contact Number"
                placeholder=""
                name="phoneNumber"
                component={PhoneInput}
                variant="standard"
                id="phoneNumber"
                fullWidth='fullWidth'
                required='required'
              />
            </FormControl>
            </div>
            <FormControl margin="normal" required fullWidth>
              <Field
                label="New Password"
                type="password"
                placeholder=""
                name="password"
                component={GlobalTextField}
                variant="standard"
                id="password"
                fullWidth='fullWidth'
                required='required'
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <Field
                label="Confirm Password"
                type="password"
                placeholder=""
                name="confirmNewPassword"
                component={GlobalTextField}
                variant="standard"
                id="emailAddress"
                fullWidth='fullWidth'
                required='required'
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
                {this.props.isFetching ? <CircularProgress size={24} /> : 'Submit'}
              </Button>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

ResetPassword = reduxForm({
  form: 'resetForm',
  asyncValidate,
})(ResetPassword);


ResetPassword = withStyles(styles)(ResetPassword);

function mapStateToProps(state) {

  let isFetching = _get(state, 'SetPassword.isFetching', false);
  return { isFetching };
}
export default connect(mapStateToProps)(ResetPassword)

ResetPassword.propTypes = {
  classes: PropTypes.object.isRequired,
};