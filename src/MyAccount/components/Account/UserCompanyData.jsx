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


class UserCompanyData extends Component {

    constructor() {
        super();
        this.state = {
            value: 0,
        }
    }

    componentDidMount() {

    }

    handleSubmit = () => {

    }

    render() {

        return (
            <React.Fragment>
                <div class='col-sm-4'>
                    <h4>Create A User</h4>
                    <Field
                        name="firstName"
                        label="First Name"
                        component={GlobalTextField}
                    />
                    <Field
                        name="lastName"
                        label="Last Name"
                        component={GlobalTextField}
                    />
                    <Field
                        name="contactNumber"
                        label="Contact Number"
                        component={GlobalTextField}
                    />
                    <Field
                        name="email"
                        label="Email"
                        component={GlobalTextField}
                    />
                </div>
                <div class='col-sm-4'>
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

                </div>
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {

}

UserCompanyData = connect(mapStateToProps)(UserCompanyData)

export default UserCompanyData;