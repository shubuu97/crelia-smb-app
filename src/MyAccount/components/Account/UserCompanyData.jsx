import React, { Component } from 'react';
import _get from 'lodash/get';
/* Material Imports */
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
/* Redux Imports */
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
/* Global Imports */
import GlobalTextField from '../../../Global/GlobalTextField';
import Select from '../../../Global/Select';
import FormControl from '@material-ui/core/FormControl';
import LoaderButton from '../../../Global/LoaderButton'


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
        let tempValues = {...values}
        delete tempValues.email
        this.props.handleSubmitUpdateSMBUser(tempValues);

    }

    render() {
        const {handleSubmit} = this.props
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
                {/* <div class='col-sm-4'>
                    <h4>
                        Company Data
                    </h4>
                    <Field
                        label="Company Name"
                        name="companyName"
                        component={Select}
                        variantType='standard'
                        options={[]}
                        fullWidth="true"
                    />
                    <Field
                        name="positionCompany"
                        label="Position in company"
                        component={GlobalTextField}
                    />
                    </div> */}


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