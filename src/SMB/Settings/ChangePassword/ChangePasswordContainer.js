import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import ChangePasswordComponent from './components/ChangePassword';
import Button from '@material-ui/core/Button';

class ChangePassword extends Component {

    handleChangePassword = (values) => {
        console.log('handleChangePassword values', values)
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
    form: 'ChangePasswordForm'
})(ChangePassword)

export default ChangePassword;