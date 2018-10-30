import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import withStyles from '@material-ui/core/styles/withStyles';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { postData } from '../Redux/postAction';
import { getData } from '../Redux/getAction'
import GlobalTextField from '../Global/GlobalTextField';
import _get from 'lodash/get';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';
import logoimg from '../Assets/images/logo-white.png';
import AuthTabHoc from './components/TabHoc';
import showMessage from '../Redux/toastAction'
import { resolve } from 'path';
import { rejects } from 'assert';

var jwtDecode = require('jwt-decode');
const styles = theme => ({
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  }
});

class SignIn extends Component {

  constructor(props) {
    super(props);
    this.state = { activeTab: 'Login' }
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
        let decodeData = jwtDecode(data.token);
        let role = decodeData.role;
      
        if(decodeData.role=='TempSMBUser') {
          role = 'SMBUser';
          localStorage.setItem('role',role)
        }
        if (decodeData.role == 'TempInvestorUser') {
          role = 'InvestorUser';
          localStorage.setItem('role',role)

        }

        this.props.dispatch(
          getData(`http://13.233.38.55:4005/api/${role}/${encodeURIComponent(decodeData.id)}`, 'fetchingbasicdata', {
            init: 'basicdata_init',
            success: 'basicdata_success',
            error: 'basicdata_error'
          })
        ).then((data) => {
          this.props.history.push('/onboard')
        })
          .catch((err) => {
            this.props.dispatch(showMessage({ text: err.msg, isSuccess: false }));
            setTimeout(() => {
              this.props.dispatch(showMessage({}));
            }, 6000);
          })
      })
        .catch((err) => {
          this.props.dispatch(showMessage({ text: err.msg, isSuccess: false }));
    
          setTimeout(() => {
            this.props.dispatch(showMessage({}));
          }, 6000);
        })
    
  }

  handleLink = (activeTab) => {
    this.setState({ activeTab })
  }
 

  render() {
    console.log(this.props, "props is hre")
    const { classes, handleSubmit } = this.props;
    return (
      <React.Fragment>
        <div className="login-field">
          <form className={classes.form} onSubmit={handleSubmit(this.handleSignIn)} >
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

            <FormControl margin="normal" required fullWidth>
              <Field
                label="Password"
                placeholder=""
                type={'password'}
                name="password"
                component={GlobalTextField}
                variant="standard"
                id="password"
                fullWidth='fullWidth'
                required='required'

              />
            </FormControl>
            <div class="action-block">
              <Link to='/reset'>Forgot Password</Link>
              <Button
                type="submit"
                fullWidth
                disabled={this.props.isFetching}
                variant="contained"
                color="primary"
                className="btnprimary ml-35"
              >
                {this.props.isFetching ? <CircularProgress size={24} /> : 'Sign In'}
              </Button>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

SignIn = reduxForm({
  form: 'SignInForm',
  keepDirtyOnReinitialize:true,
  enableReinitialize:true,
})(SignIn);

SignIn = withStyles(styles)(SignIn);

function mapStateToProps(state) {
  let isFetching = _get(state, 'LoginData.isFetching', false);

  return { isFetching };
}
export default connect(mapStateToProps)(AuthTabHoc(SignIn))

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};