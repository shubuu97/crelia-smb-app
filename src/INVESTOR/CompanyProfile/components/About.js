import React, { Component } from 'react';
import _get from 'lodash/get';
/* Material Imports */
import FormControl from '@material-ui/core/FormControl';
/* Redux Imports*/
import { postData } from '../../../Redux/postAction';
import { connect } from 'react-redux';
import showMessage from '../../../Redux/toastAction';
import { getData } from '../../../Redux/getAction';
import { APPLICATION_BFF_URL } from '../../../Redux/urlConstants';
import { Field, reduxForm } from 'redux-form';
/* Global Imports*/
import GlobalTextField from '../../../Global/Components/GlobalTextField';
import Select from '../../../Global/Components/Select';
import ToggleButtons from '../../../Global/Components/ToggleButton';
import LoaderButton from '../../../Global/Components/LoaderButton'
/* Components */
import SideBar from './SideBar';

var jwtDecode = require('jwt-decode');

class About extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        let decodeData;
        let role;
        if (localStorage.getItem('authToken')) {
            decodeData = jwtDecode(localStorage.getItem('authToken'));
            role = decodeData.role;
            localStorage.setItem('role', role);
        }
        this.props.dispatch(
            getData(`${APPLICATION_BFF_URL}/api/${role}/${encodeURIComponent(decodeData.id)}`, 'fetchingbasicdata', {
                init: 'basicdata_init',
                success: 'basicdata_success',
                error: 'basicdata_error'
            })
        )
        this.props.dispatch(
            getData(`${APPLICATION_BFF_URL}/reference-service/industries`, 'IndustryList-data', {
                init: 'industry_init',
                success: 'industry_success',
                error: 'industry_error'
            })
        )
        this.props.dispatch(
            getData(`${APPLICATION_BFF_URL}/reference-service/legalEntities`, 'legalEntities-data', {
                init: 'legalEntities_init',
                success: 'legalEntities_success',
                error: 'legalEntities_error'
            })
        )

    }
    aboutSubmit = (values) => {
        let reqObj = { ...values, id: this.props.id }
        this.props.dispatch(
            postData(`${APPLICATION_BFF_URL}/api/SaveSMB`, reqObj, 'UpdateSMB-data', {
                init: 'UpdateSMB_init',
                success: 'UpdateSMB_success',
                error: 'UpdateSMB_error'
            })
        ).then((data) => {
            this.props.dispatch(showMessage({ text: 'Saved succesfully', isSuccess: true }));

            setTimeout(() => {
                this.props.dispatch(showMessage({}));
            }, 1000);
        })
            .catch((err) => {
                this.props.dispatch(showMessage({ text: err.msg, isSuccess: false }));
                setTimeout(() => {
                    this.props.dispatch(showMessage({}));
                }, 3000);
            })

    }
    render() {
        let { handleSubmit } = this.props
        return (
            <div>
                <form onSubmit={handleSubmit(this.aboutSubmit)}>
                    <div className="row">
                        <div className="col-sm-6">
                            <FormControl margin="normal" required fullWidth>
                                <Field
                                    label="Company Name"
                                    placeholder="Company Name   "
                                    name="legalName"
                                    component={GlobalTextField}
                                    fullWidth={true}
                                    variant={'standard'}
                                />
                            </FormControl>

                            <FormControl margin="normal" required fullWidth>
                                <Field
                                    label="Industry"
                                    name="industryType"
                                    component={Select}
                                    variantType='outlined'
                                    options={this.props.industryList}
                                />
                            </FormControl>

                            <FormControl margin="normal" required fullWidth>
                                <Field
                                    variantType="outlined"
                                    label="Incorporation Type"
                                    name="legalEntityType"
                                    component={Select}
                                    options={this.props.legalEntityList}
                                />
                            </FormControl>

                            <FormControl margin="normal" required fullWidth>
                                <Field
                                    type="date"
                                    label="Date Of Incorporation"
                                    defaultValue='2017-05-24'
                                    name="incorporationDate"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    component={GlobalTextField}
                                    fullWidth={true}
                                />
                            </FormControl>

                            <FormControl margin="normal" required fullWidth>
                                <Field
                                    label="Registration Number"
                                    name="registrationNumber"
                                    component={GlobalTextField}
                                    variant={localStorage.getItem('TextFilledVaraint') || 'standard'}
                                    fullWidth={true}
                                />
                            </FormControl>
                            <div className="numberemployee">

                                <div className="numberOfEmployees-sub-title pt-20">Number Of Employees</div>

                                <FormControl margin="normal" required fullWidth>
                                    <Field
                                        name="numberOfEmployees"
                                        component={ToggleButtons}
                                        toggleList={[
                                            { label: '1-10', alinValue: '1-10' },
                                            { label: '10-50', alinValue: '10-50' },
                                            { label: '50-100', alinValue: '50-100' },
                                            { label: '>100', alinValue: '>100' }
                                        ]}
                                    />
                                </FormControl>
                            </div>
                            <div class="action-block">
                                <LoaderButton
                                    isFetching={this.props.isFetchingUpdateSMB}
                                    type="submit"
                                    color="primary"
                                    variant="contained">Save Draft</LoaderButton>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

About = reduxForm({
    form: 'About',
    enableReinitialize: true,
    keepDirtyOnReinitialize: true
})(About);

function mapStateToProps(state) {
    let industryList = [];
    let legalEntities = [];
    _get(state.IndustryList, 'lookUpData', []).map(item => (
        industryList.push({ value: item.industry })
    ))
    _get(state.LegalEntities, 'lookUpData', []).map(item => (
        legalEntities.push({ value: item.type })
    ))
    let isFetchingUpdateSMB = _get(state, 'UpdateSMB.isFetching');

    let id = _get(state, 'BasicInfo.lookUpData.companyDetails.id');

    let legalEntityType = _get(state, 'BasicInfo.lookUpData.companyDetails.legalEntityType');
    let legalName = _get(state, 'BasicInfo.lookUpData.companyDetails.legalName');
    let incorporationDate = _get(state, 'BasicInfo.lookUpData.companyDetails.incorporationDate', '').split('T')[0].trim();
    let registrationNumber = _get(state, 'BasicInfo.lookUpData.companyDetails.registrationNumber');
    let numberOfEmployees = _get(state, 'BasicInfo.lookUpData.companyDetails.numberOfEmployees');
    let industryType = _get(state, 'BasicInfo.lookUpData.companyDetails.industryType')

    let initialValues = { legalEntityType, legalName, incorporationDate, registrationNumber, numberOfEmployees, industryType };

    return {
        industryList: industryList,
        legalEntityList: legalEntities,
        initialValues,
        isFetchingUpdateSMB,
        id
    };
}

export default connect(mapStateToProps)(SideBar(About));

