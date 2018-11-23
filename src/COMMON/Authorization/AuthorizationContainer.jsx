import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import _get from 'lodash/get';
/* Material Imports*/
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
/* Redux Imports*/
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { postData } from '../../Redux/postAction';
import { getData } from '../../Redux/getAction'
import showMessage from '../../Redux/toastAction'
import { APPLICATION_BFF_URL } from '../../Redux/urlConstants';
/* Global Imports*/
import GlobalTextField from '../../Global/Components/GlobalTextField';
/* Components Import*/
import AuthTabHoc from './components/TabHoc';

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
      postData(`${APPLICATION_BFF_URL}/api/login`, values, 'login-data', {
        init: 'login_init',
        success: 'login_success',
        error: 'login_error'
      })
    ).then((data) => {
      localStorage.setItem('authToken', data.token);
      let decodeData = jwtDecode(data.token);
      let role = decodeData.role;
      localStorage.setItem('role', role)

      this.props.dispatch(
        // NOTE : Change the role to investor and change SMB in finance repo
        getData(`${APPLICATION_BFF_URL}/api/${role}/${encodeURIComponent(decodeData.id)}`, 'fetchingbasicdata', {
          init: 'basicdata_init',
          success: 'basicdata_success',
          error: 'basicdata_error'
        })
      ).then((data) => {
        let role = localStorage.getItem('role')
        if (role == "SMBUser") {
          this.props.history.push('/onboard');
        }
        else if (role == "InvestorUser") {
          this.props.history.push('/company-profile/general');
        }
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
                label="Email"
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
                disabled={this.props.isFetchingLogin || this.props.isFetchingBasicData}
                variant="contained"
                color="primary"
                className="btnprimary ml-35"
              >
                {this.props.isFetchingLogin || this.props.isFetchingBasicData ? <CircularProgress size={24} /> : 'Sign In'}
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
  keepDirtyOnReinitialize: true,
  enableReinitialize: true,
})(SignIn);

SignIn = withStyles(styles)(SignIn);

function mapStateToProps(state) {
  let isFetchingLogin = _get(state, 'LoginData.isFetching', false);
  let isFetchingBasicData = _get(state, 'BasicInfo.isFetching');

  return { isFetchingLogin, isFetchingBasicData };
}
export default connect(mapStateToProps)(AuthTabHoc(SignIn))

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};