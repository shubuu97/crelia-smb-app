import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { postData } from '../../Redux/postAction'
import GlobalTextField from '../../Global/GlobalTextField';
import _get from 'lodash/get';
import CircularProgress from '@material-ui/core/CircularProgress';


const styles = theme => ({
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  }
});

class ResetPassword extends Component {
  handleSignIn = (values) => {
    this.props.history.push('/passwordSent')

  }
  render() {
    console.log(this.props, "props is hre")
    const { classes, handleSubmit } = this.props;
    return (
      <React.Fragment>
       <div className="login-field pt-60"> 
            <h4>Reset Your Password</h4>
            <p variant="caption">Enter your email and we'll send you instuctions on how to reset your password</p>
            <form className={classes.form} onSubmit={handleSubmit(this.handleSignIn)} >
              <FormControl margin="normal" required fullWidth>
                <Field
                  label="Enter your email address"
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

               <div class="action-block">
              <Button
                type="submit"
                fullWidth
                disabled = {this.props.isFetching}
                variant="contained"
                color="primary"
                className="btnprimary"
              >
                {this.props.isFetching?<CircularProgress  size={24} />:'Send Reset Instructions'}
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

  let isFetching = _get(state,'LoginData.isFetching',false);
  return {isFetching};
}
export default connect(mapStateToProps)(ResetPassword)

ResetPassword.propTypes = {
  classes: PropTypes.object.isRequired,
};