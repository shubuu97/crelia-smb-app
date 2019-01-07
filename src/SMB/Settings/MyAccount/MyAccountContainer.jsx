import React, { Component } from 'react';
import _get from 'lodash/get';
/* Material Imports */

/* Redux Imports */
import { connect } from 'react-redux';
import { postData } from '../../../Redux/postAction';
import showMessage from '../../../Redux/toastAction';
import { getData } from '../../../Redux/getAction';
import { APPLICATION_BFF_URL } from '../../../Redux/urlConstants'
/* Global Imports */

/* Components */
import UserCompanyData from './components/Account/UserCompanyData'

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

        if (localStorage.getItem('authToken')) {
            let decodeData = jwtDecode(localStorage.getItem('authToken'));
            let role = decodeData.role;
            localStorage.setItem('role', role);

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

    handleSubmitUpdateSMBUser = (values) => {
        let reqObj = {
            username: this.props.username,
            ...values
        }
        this.props.dispatch(
            postData(`${APPLICATION_BFF_URL}/api/UpdateSMBUser`, reqObj, 'UpdateSMBUser', {
                init: 'UpdateSMBUser_init',
                success: 'UpdateSMBUser_success',
                error: 'UpdateSMBUser_error'
            })
        ).then((data) => {
            this.props.dispatch(showMessage({ text: 'Update Succesfully', isSuccess: true }));
            this.basicDataFetcher();
            setTimeout(() => {
                this.props.dispatch(showMessage({}));
            }, 1000);

        })
            .catch((err) => {
                this.props.dispatch(showMessage({ text: err.msg, isSuccess: false }));
                setTimeout(() => {
                    this.props.dispatch(showMessage({}));
                }, 6000);
            })
    }

    render() {
        return (
            <form class='container'>
                <div class='row'>
                    <UserCompanyData
                        initialValues={
                            {
                                firstName: _get(this.props, 'userData.firstName'),
                                lastName: _get(this.props, 'userData.lastName'),
                                email: _get(this.props, 'userData.email'),
                                phoneNumber: _get(this.props, 'userData.phoneNumber'),
                                companyName: _get(this.props, 'userData.companyName'),
                                positionCompany: _get(this.props, 'userData.positionCompany')
                            }
                        }
                        handleSubmitUpdateSMBUser={this.handleSubmitUpdateSMBUser}
                        isFetchingUpdateSMBUser={this.props.isFetchingUpdateSMBUser}
                    />
                    {/* <div class='col-sm-4'>
                        <PreviewUserForm
                            valid={!invalid}
                            anyTouched={this.props.anyTouched}
                            firstName={_get(this.props, 'userData.firstName')}
                            lastName={_get(this.props, 'userData.lastName')}
                            email={_get(this.props, 'userData.email')}
                            phoneNumber={_get(this.props, 'userData.phoneNumber')}
                            companyName={_get(this.props, 'userData.companyName')}
                            positionCompany={_get(this.props, 'userData.positionCompany')}
                        />
                    </div> */}
                </div>
            </form>
        )
    }
}


function mapStateToProps(state) {

    let userData = _get(state, 'BasicInfo.lookUpData');
    let username = _get(state, 'BasicInfo.lookUpData.username', null);
    let isFetchingUpdateSMBUser = _get(state, 'UpdateSMBUser.isFetching');

    console.log(userData, "userData updated")

    return { userData, username, isFetchingUpdateSMBUser }
}

UserForm = connect(mapStateToProps)(UserForm)

export default UserForm;