import React, { Component } from 'react';
import _get from 'lodash/get';
/* Redux Imports*/ 
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
/* Global Imports */ 
import GlobalTextField from '../../../../Global/Components/GlobalTextField';
import Select from '../../../../Global/Components/Select';
/* Components Imports */ 
import PreviewUserForm from './PreviewUserForm';
import asyncValidate from './validate';

class UserForm extends Component {

    componentDidMount() {
        //console.log(this.props.history.location.state.id,'props');
    }
    
    render() {
        const { invalid, anyTouched } = this.props;
        return (
            <form class='container'>
                <div class='row'>
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
                    <div class='col-sm-4'>
                        <PreviewUserForm
                            valid={!invalid}
                            anyTouched={this.props.anyTouched}
                            firstName={_get(this.props, 'formValue.firstName')}
                            lastName={_get(this.props, 'formValue.lastName')}
                            email={_get(this.props, 'formValue.email')}
                            contactNumber={_get(this.props, 'formValue.contactNumber')}
                            companyName={_get(this.props, 'formValue.companyName')}
                            positionCompany={_get(this.props, 'formValue.positionCompany')}
                        />
                    </div>
                </div>
            </form>
        )
    }
}

UserForm = reduxForm({
    form: 'UserForm',
    asyncValidate
})(UserForm);

function mapStateToProps(state) {
    let formValue = _get(state, 'form.UserForm.values', '');
    return { formValue }
}

UserForm = connect(mapStateToProps)(UserForm)

export default UserForm;