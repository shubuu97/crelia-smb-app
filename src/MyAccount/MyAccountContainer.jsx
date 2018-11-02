import React, { Component } from 'react';
import _get from 'lodash/get';
/* Material Imports */ 
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
/* Redux Imports */ 
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { postData } from '../Redux/postAction';
import showMessage from '../Redux/toastAction';
import { getData } from '../Redux/getAction';
import { APPLICATION_BFF_URL } from '../Redux/urlConstants'
/* Global Imports */ 
import GlobalTextField from '../Global/GlobalTextField';
import Select from '../Global/Select';
/* Components */ 
import UserCompanyData from './components/Account/UserCompanyData'
import PreviewUserForm from './components/Account/PreviewUserForm';
import asyncValidate from './components/Account/validate';

var jwtDecode = require('jwt-decode');

class UserForm extends Component {

    constructor() {
        super();
        this.state = {
            value: 0,
        }
    }

    componentDidMount() {
        this.basicDataFetcher();
    }

    basicDataFetcher = () => {
        debugger
        if (localStorage.getItem('authToken')) {
            let decodeData = jwtDecode(localStorage.getItem('authToken'));
            let role = decodeData.role

            if(role.search("Temp")){
                role = role.substr(3)
                localStorage.setItem('role', role)
            }
            
            this.props.dispatch(
                getData(`${APPLICATION_BFF_URL}/api/${role}/${encodeURIComponent(decodeData.id)}`, 'fetchingbasicdata', {
                    init: 'basicdata_init',
                    success: 'basicdata_success',
                    error: 'basicdata_error'
                })
            )
        }
        else {
            // this.props.history.push('/')
        }
    }

    handleSubmit = () => {

    }

    render() {
        const { invalid, anyTouched } = this.props;
        return (
            <form class='container' onSubmit={this.handleSubmit(this.submitHandler)}>
                <div class='row'>
                    <UserCompanyData/>
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

    let userData = _get(state, 'BasicInfo.lookUpData');

    console.log( userData, "userData updated")

    return { userData }
}

UserForm = connect(mapStateToProps)(UserForm)

export default UserForm;