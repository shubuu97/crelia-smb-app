import React, { Component } from 'react';
import _get from 'lodash/get';
/* Material Imports */
import FormControl from '@material-ui/core/FormControl';
/* Redux Imports */
import { Field, reduxForm } from 'redux-form';
/* Global Imports */
import GlobalTextField from '../../../../Global/Components/GlobalTextField';
import LoaderButton from '../../../../Global/Components/LoaderButton'


class UserCompanyData extends Component {

    constructor() {
        super();
        this.state = {
            value: 0,
        }
    }

    componentDidMount() {

    }

    handleSubmitUserData = (values) => {
        let tempValues = { ...values }
        delete tempValues.email
        this.props.handleSubmitUpdateSMBUser(tempValues);

    }

    render() {
        const { handleSubmit } = this.props
        return (
            <React.Fragment>
                <div class='col-sm-4'>
                    <h4>Your Account Info</h4>
                    <form onSubmit={handleSubmit(this.handleSubmitUserData)}>
                        <FormControl margin="normal" required fullWidth>
                            <Field
                                name="firstName"
                                label="First Name"
                                component={GlobalTextField}
                                fullWidth="fullWidth"
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <Field
                                name="lastName"
                                label="Last Name"
                                component={GlobalTextField}
                                fullWidth="fullWidth"
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <Field
                                name="phoneNumber"
                                label="Contact Number"
                                component={GlobalTextField}
                                fullWidth="fullWidth"
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <Field
                                name="email"
                                label="Email"
                                disabled={true}
                                component={GlobalTextField}
                                fullWidth="fullWidth"
                            />
                        </FormControl>
                        <LoaderButton
                            isFetching={this.props.isFetchingUpdateSMBUser}
                            type='submit'
                            variant='contained' color='primary'>Update Info</LoaderButton>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}

UserCompanyData = reduxForm({
    form: 'userForm',
    enableReinitialize: true,
    keepDirtyOnReinitialize: true
})(UserCompanyData)


export default UserCompanyData;