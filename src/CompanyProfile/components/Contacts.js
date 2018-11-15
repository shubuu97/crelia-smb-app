import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import GlobalTextField from '../../Global/GlobalTextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '../../Global/Select';
import Button from '@material-ui/core/Button';
import sidebar from './SideBar';
import { connect } from 'react-redux';
import { getData } from '../../Redux/getAction';
import _get from 'lodash/get';
import { APPLICATION_BFF_URL } from '../../Redux/urlConstants';
import { postData } from '../../Redux/postAction';
import showMessage from '../../Redux/toastAction';
import {FormSection} from 'redux-form';
import LoaderButton from '../../Global/LoaderButton'

var jwtDecode = require('jwt-decode');



class Contacts extends Component {
    constructor(props) {
        super(props)
    }

    basicDataFetcher = () => {
        if (localStorage.getItem('authToken')) {
            let decodeData = jwtDecode(localStorage.getItem('authToken'));
            
            let role = decodeData.role
    

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
    componentDidMount() {
        this.props.dispatch(
            getData(`${APPLICATION_BFF_URL}/reference-service/allowedCountries`, 'CountryList-data', {
                init: 'country_init',
                success: 'country_success',
                error: 'country_error'
            })
        );
        this.basicDataFetcher();
    }
    contactSubmit = (values) => {
        let reqObj = { ...values, id: this.props.id }
        this.props.dispatch(
            postData(`${APPLICATION_BFF_URL}/api/SaveSMB`, reqObj, 'UpdateSMB-data', {
                init: 'UpdateSMB_init',
                success: 'UpdateSMB_success',
                error: 'UpdateSMB_error'
            })
        ).then((data) => {
            this.basicDataFetcher();
            this.props.dispatch(showMessage({ text: 'Saved succesfully', isSuccess: true }));
            setTimeout(() => {
                this.props.dispatch(showMessage({}));
            }, 2000);
        })
            .catch((err) => {
                this.props.dispatch(showMessage({ text: err.msg, isSuccess: false }));
                setTimeout(() => {
                    this.props.dispatch(showMessage({}));
                }, 6000);
            })

    }
    render() {
        let { handleSubmit } = this.props
        return (
            <div className="row">
                <div className="col-sm-6">
                <form onSubmit={handleSubmit(this.contactSubmit)}>
                <FormSection name='address'>
                    <FormControl margin="normal" required fullWidth>
                        <Field
                            name="line1"
                            component={GlobalTextField}
                            label="Street"
                            variant={localStorage.getItem('TextFilledVaraint') || 'standard'}
                        />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <Field
                            name="line2"
                            component={GlobalTextField}
                            label="Street,Line 2"
                            variant={localStorage.getItem('TextFilledVaraint') || 'standard'}
                        />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <Field
                            name="zipCode"
                            component={GlobalTextField}
                            label="Zip Code"
                            variant={localStorage.getItem('TextFilledVaraint') || 'standard'}
                        />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <Field
                            name="city"
                            component={GlobalTextField}
                            label="City"
                            variant={localStorage.getItem('TextFilledVaraint') || 'standard'}
                        />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <Field
                            name="region"
                            component={GlobalTextField}
                            label="Region"
                            variant={localStorage.getItem('TextFilledVaraint') || 'standard'}
                        />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        {/* <Field
                    name="country"
                    component={GlobalTextField}
                    label="Country"
                    variant={localStorage.getItem('TextFilledVaraint') || 'standard'}
                /> */}
                        <Field
                            label="Country"
                            name="country"
                            component={Select}
                            variantType='outlined'
                            options={this.props.countryList}
                        // fullWidth="true"
                        />
                    </FormControl>
                    </FormSection>
                    <h4 className="pt-20">Contacts</h4>
                    <FormControl margin="normal" required fullWidth>
                        <Field
                            name="phoneNumber"
                            component={GlobalTextField}
                            label="Phone Number"
                            variant={localStorage.getItem('TextFilledVaraint') || 'standard'}
                        />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <Field
                            name="email"
                            component={GlobalTextField}
                            label="Corporate Email"
                            variant={localStorage.getItem('TextFilledVaraint') || 'standard'}
                        />
                    </FormControl>


                    <div class="action-block">
                    <LoaderButton
                                    isFetching={this.props.isFetchingUpdateSMB}
                                    type="submit"
                                    color="primary"
                                    variant="contained">Save Draft</LoaderButton>
                    </div>
                    </form>
                </div>
            </div>
        )
    }
}

Contacts = reduxForm({
    form: 'Contact'
})(Contacts)

function mapStateToProps(state) {
    let countryList = [];
    _get(state.CountryList, 'lookUpData', []).map(item => (
        countryList.push({ value: item.name })
    ))
    let id = _get(state, 'BasicInfo.lookUpData.companyDetails.id');

    let initialValues = {
        address:_get(state, 'BasicInfo.lookUpData.companyDetails.address'),
        phoneNumber:_get(state, 'BasicInfo.lookUpData.companyDetails.phoneNumber'),
        email:_get(state, 'BasicInfo.lookUpData.companyDetails.email')
    };
    let isFetchingUpdateSMB = _get(state, 'UpdateSMB.isFetching');

    return { countryList,initialValues,id,isFetchingUpdateSMB };
}

export default connect(mapStateToProps)(sidebar(Contacts));


