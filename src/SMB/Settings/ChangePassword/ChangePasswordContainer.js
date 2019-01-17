import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import asyncValidate from './validate';
import ChangePasswordComponent from './components/ChangePassword';
import {postData} from '../../../Redux/postAction';
import {APPLICATION_BFF_URL} from '../../../Redux/urlConstants';
import showMessage from '../../../Redux/toastAction';

class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: false
        }
    }

    handleChangePassword = (values) => {
        let reqBody = {
            oldPassword: values.oldPassword,
            newPassword: values.newPassword
        } 
        this.setState({isFetching: true})
        this.props.dispatch(
            postData(`${APPLICATION_BFF_URL}/api/changePassword`, reqBody, 'changePassword-data', {
                init: 'changePass_init',
                success: 'changePass_success',
                error: 'changePass_error'
            })
        ).then(data => {
            this.props.dispatch(showMessage({
                text: 'Password Changed Successfully', isSuccess: true
            }));
            this.setState({isFetching: false})
            setTimeout(() => {
                this.props.dispatch(showMessage({}));
            }, 6000);
            this.props.reset();
        }).catch(err => {
            this.props.dispatch(showMessage({
                text: err.msg, isSuccess: false
            }));
            this.setState({isFetching: false})
            setTimeout(() => {
                this.props.dispatch(showMessage({}));
            }, 6000);
        })
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <React.Fragment>
                <div className="col-sm-4">
                    <h4>Change Password</h4>
                    <form onSubmit={handleSubmit(this.handleChangePassword)} >
                        <ChangePasswordComponent />
                        <div class="action-block">
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className="btnprimary ml-35"
                            >
                            {this.state.isFetching ? <CircularProgress size={24} color='white' /> : 'Change Password'}
                            </Button>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        )                 
    }
}

ChangePassword = reduxForm({
    form: 'ChangePasswordForm',
    asyncValidate
})(ChangePassword)

export default ChangePassword;