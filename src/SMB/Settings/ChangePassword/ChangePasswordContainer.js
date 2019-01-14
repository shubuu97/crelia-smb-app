import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';
import asyncValidate from './validate';
import ChangePasswordComponent from './components/ChangePassword';
import {postData} from '../../../Redux/postAction';
import {APPLICATION_BFF_URL} from '../../../Redux/urlConstants';
import showMessage from '../../../Redux/toastAction';
class ChangePassword extends Component {

    handleChangePassword = (values) => {
        let reqBody = {
            oldPassword: values.oldPassword,
            newPassword: values.newPassword
        } 
        this.props.dispatch(
            postData(`${APPLICATION_BFF_URL}/api/changePassword`, {}, 'changePassword-data', {
                init: 'changePass_init',
                success: 'changePass_success',
                error: 'changePass_error'
            })
        ).then(data => {
            this.props.dispatch(showMessage({
                text: 'Password Changed Successfully', isSuccess: true
            }))
        }).catch(err => {
            console.log(err, 'xxxxxxxxxxx')
            this.props.dispatch(showMessage({
                text: err.msg, isSuccess: false
            }))
        })
    }

    componentWillMount() {
        const listItemData = [
            {path: "settings", name: "Privacy"},
            {path: "notifications", name: " Notifications"},
            {path: "myProfile", name: "My Profile"},
            {path: "changePassword", name: "Change Password"}
        ]
        this.props.listItem(listItemData);
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
                                Change Password
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