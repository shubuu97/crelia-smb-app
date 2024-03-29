import React, { Component } from 'react';
/* Lodash Imports */
import _get from 'lodash/get';
import setWith from 'lodash/setWith';
import _find from 'lodash/find';
/* Material Imports */
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import CircularProgress from '@material-ui/core/CircularProgress';
/* Redux Imports*/
import { Field, reduxForm, FormSection } from 'redux-form';
import { connect } from 'react-redux';
import { getData } from '../../../../Redux/getAction';
import { APPLICATION_BFF_URL } from '../../../../Redux/urlConstants'
/* Global Imports*/
import GlobalTextField from '../../../../Global/Components/GlobalTextField'
import RadioButtonGroup from '../../../../Global/Components/Radio';
import Select from '../../../../Global/Components/Select';

class ContactContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            yearList: [],
            legalEntityList: null
        };
    }

    componentDidMount() {
        for (let i = 1900; i <= new Date().getFullYear(); i++) {
            this.state.yearList.push({ value: i, label: i });
        }
        this.props.dispatch(
            getData(`${APPLICATION_BFF_URL}/reference-service/legalEntities`, 'legalEntities-data', {
                init: 'legalEntities_init',
                success: 'legalEntities_success',
                error: 'legalEntities_error'
            })
        )
        let legalEntityType = _get(this.props, 'BasicInfo.lookUpData.companyDetails.legalEntityType', null);
        if (legalEntityType != null) {
            let filteredEntity = this.props.alllegalEntitiesList.filter((legalEntitiesByRegion) => {
                let legalEntities = _get(legalEntitiesByRegion, 'legalEntities');
                return _find(legalEntities, { value: legalEntityType })
    
            })
           let legalEntityList = _get(filteredEntity[0],'legalEntities',[]);
            let region =   _get(filteredEntity[0],'regionName',[]);
            this.props.autofill('region',region);
        }
    }

    handleBusinessUnderDiffName = (event) => {
        console.log(event);
    }

    submitFunction = (values) => {
        delete values.region
        let reqObj = { ...values };
        if (values.businessUnderName == 'no') {
            setWith(reqObj, 'onboardingInfo.otherCompanyName', '');
            setWith(reqObj, 'onboardingInfo.fundAllocation', _get(this.props, 'initialValues.fundAllocation', []))
            setWith(reqObj, 'onboardingInfo.fundingType', _get(this.props, 'initialValues.fundingType', []))
        }

        else {
            setWith(reqObj, 'onboardingInfo.otherCompanyName', values.otherCompanyName)
            setWith(reqObj, 'onboardingInfo.fundAllocation', _get(this.props, 'initialValues.fundAllocation', []))
            setWith(reqObj, 'onboardingInfo.fundingType', _get(this.props, 'initialValues.fundingType', []))
        }
        delete reqObj.businessUnderName;
        delete reqObj.yearofStartBusiness;
        delete reqObj.otherCompanyName;
        delete reqObj.fundingType;
        delete reqObj.fundAllocation;

        this.props.handleNext(reqObj);
    }

    disableDecider = () => {
        if (localStorage.getItem('companyStatus') == 'PENDING_APPROVAL') {
            return true;
        }
        else {
            return false;
        }
    }
    handleRegionSelect = (a, b, c) => {
        console.log(this.props.alllegalEntitiesList, "here")
        let legalEnitryForRegion = _find(this.props.alllegalEntitiesList, { regionName: b });
        let legalEntities = _get(legalEnitryForRegion, 'legalEntities', []);
        this.setState({ 'legalEntityList': legalEntities })

    }

    render() {
        let { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit(this.submitFunction)}>
                <div className="Onboarding_Title">Business Information</div>
                <div className="row justify-content-between pt-20">
                    <div className="col-sm-4 ">
                        <Field
                            disabled={localStorage.getItem('disabled')}
                            label="Legal Business Name"
                            placeholder="Legal Business Name"
                            name="legalName"
                            component={GlobalTextField}
                            variant="outlined"
                            fullWidth="true"
                        />
                    </div>
                    <div className="col-sm-4">
                        <Field
                            variantType="outlined"
                            label="Region"
                            name="region"
                            component={Select}
                            onChange={this.handleRegionSelect}
                            options={this.props.regionList}
                        />
                    </div>
                    <div className="col-sm-4">
                        <Field
                            disabled={localStorage.getItem('disabled')}
                            name="legalEntityType"
                            label='Types of incorporation'
                            component={Select}
                            options={this.state.legalEntityList || this.props.legalEntityList}
                            variantType="outlined"
                        />
                    </div>

                    <div className="col-sm-12">
                        <FormControl margin="normal" required fullWidth>
                            <Field
                                disabled={localStorage.getItem('disabled')}
                                label="Business Tax ID"
                                name="taxId"
                                component={GlobalTextField}
                                variant="outlined"
                                fullWidth="true"
                            />
                        </FormControl>
                    </div>
                </div>
                <div className="row justify-content-between pt-20">
                    <div className="onboarding-sub-title col-sm-12">Do you do or have previously done business under a different name?</div>
                    <div className="col-sm-12">
                        <Field
                            disabled={localStorage.getItem('disabled')}
                            name="businessUnderName"
                            component={RadioButtonGroup}
                            radioList={[{ label: "Yes", value: "yes" }, { label: "No", value: "no" }]}
                        />

                    </div>
                </div>
                {this.props.businessUnderNameValue === 'yes' &&
                    <div className="row justify-content-between">
                        <div className="col-sm-6">
                            <Field
                                disabled={localStorage.getItem('disabled')}
                                label="Other Company Name"
                                placeholder=""
                                name="otherCompanyName"
                                component={GlobalTextField}
                                variant="outlined"
                                fullWidth="true"
                            />
                        </div>
                    </div>
                }
                <div className="row justify-content-between pt-10">
                    <div className="onboarding-sub-title col-sm-12">Since when are you in business?</div>
                    <div className="col-sm-12">
                        <FormControl margin="normal" required fullWidth>
                            <Field
                                id="date"
                                disabled={localStorage.getItem('disabled')}
                                name="incorporationDate"
                                component={GlobalTextField}
                                defaultValue="2017-05-24"
                                type="date"
                                variantType='outlined'
                                fullWidth="true"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </FormControl>
                    </div>
                    <FormSection name="address">
                        <div className="col-sm-12">
                            <div className="row">
                                <div className="col-sm-5">
                                    <FormControl margin="normal" required fullWidth>
                                        <Field
                                            disabled={localStorage.getItem('disabled')}
                                            label="Business Street Address"
                                            placeholder="Business Street Address"
                                            name="line1"
                                            component={GlobalTextField}
                                            variant="outlined"
                                            fullWidth="true"
                                        />
                                    </FormControl>
                                </div>
                                <div className="col-sm-5">
                                    <FormControl margin="normal" required fullWidth>
                                        <Field
                                            disabled={localStorage.getItem('disabled')}
                                            label="Business Street Address, Line 2"
                                            name="line2"
                                            component={GlobalTextField}
                                            variant="outlined"
                                            fullWidth="true"
                                        />
                                    </FormControl>
                                </div>
                                <div className="col-sm-2">
                                    <FormControl margin="normal" required fullWidth>
                                        <Field
                                            disabled={localStorage.getItem('disabled')}
                                            label="Zip Code"
                                            name="zipCode"
                                            component={GlobalTextField}
                                            variant="outlined"
                                            fullWidth="true"
                                        />
                                    </FormControl>
                                </div>
                            </div>
                        </div>
                    </FormSection>
                    <div className="col-sm-12">
                        <FormControl margin="normal" required fullWidth>
                            <Field
                                disabled={localStorage.getItem('disabled')}
                                label="Business Phone"
                                name="phoneNumber"
                                component={GlobalTextField}
                                variant="outlined"
                                fullWidth="true"
                            />
                        </FormControl>
                    </div>
                    <div className="col-sm-12 pt-20">
                        <Field
                            disabled={localStorage.getItem('disabled')}
                            label="Business Email"
                            name="email"
                            component={GlobalTextField}
                            variant="outlined"
                            fullWidth="true"
                        />
                    </div>
                    <br />

                </div>
                <div class="common-action-block">
                    <Button
                        type="submit"
                        disabled={localStorage.getItem('companyStatus') == 'PENDING_APPROVAL' ? true : false || this.props.isFetching}
                        fullWidth
                        // disabled={this.props.isFetching}
                        variant="contained"
                        color="primary"
                        className="btnprimary ml-50"
                    >
                        {this.props.isFetching ? <CircularProgress size={24} /> : 'Save Draft & continue'}
                    </Button>
                </div>
            </form>
        )
    }
}


ContactContainer = reduxForm({
    form: 'COB_ContactStepForm',
    enableReinitialize: true,
    keepDirtyOnReinitialize: true
})(ContactContainer)

function mapStateToProps(state) {
    let regionList = [];
    let region = '';
    let alllegalEntitiesList = _get(state, 'LegalEntities.lookUpData');
    let legalEntityList = [];
    let BasicInfo = _get(state, 'BasicInfo', null);
    let legalEntityType = _get(state, 'BasicInfo.lookUpData.companyDetails.legalEntityType', null);
    console.log(legalEntityType,"jordaar")
     
    // Map Issue to be fixed
     _get(state.LegalEntities, 'lookUpData', []).map(item => (
        regionList.push({ cc: item.cc, value: item.regionName })
    ))

//Login to show region and legalEnittyList from type (to be fixed)
if (legalEntityType != null) {
    let filteredEntity = alllegalEntitiesList.filter((legalEntitiesByRegion) => {
        let legalEntities = _get(legalEntitiesByRegion, 'legalEntities');
        return _find(legalEntities, { value: legalEntityType })

    })
    console.log(filteredEntity,"jordaar")
    legalEntityList = _get(filteredEntity[0],'legalEntities',[]);
    region =   _get(filteredEntity[0],'regionName',[]);
}
    return {
        regionList: regionList,
        alllegalEntitiesList,
        legalEntityList,
        BasicInfo

    };
}

export default connect(mapStateToProps)(ContactContainer);
