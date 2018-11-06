import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import _camelCase from 'lodash/camelCase';
import _get from 'lodash/get';
import setwith from 'lodash/setWith'
/* Material Imports*/
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
/* Global Imports */
import GlobalTextField from '../../../Global/GlobalTextField'
import SelectField from '../../../Global/Select'
import ToggleButtons from '../../../Global/ToggleButton'
import asyncValidate from '../../validate';
/* Styles */
import '../../styles/CompanyOnBoarding.less';

class AboutMain extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    handlerCheck = (status, field) => {
        this.setState({ [field]: status });
    }

    componentDidMount() {
        if (_get(this.props, 'initialValues.expansion'))
            this.setState({ expansion: true })
        if (_get(this.props, 'initialValues.workingCapital'))
            this.setState({ workingCapital: true });
        if (_get(this.props, 'initialValues.refinancing'))
            this.setState({ refinancing: true })
    }

    checkboxTest = () => {
        let labels = ["Expansion", "Working Capital", "Refinancing"];
        var markup = labels.map((label) => {
            let name = _camelCase(label)
            return (
                <div className="flex-row justify-space-between align-center loan-section">
                    <FormControlLabel
                        control={
                            <Checkbox
                                onChange={(event, value) => this.handlerCheck(value, name)}
                                color={'primary'}
                                defal
                                checked={this.state[name]}
                                value={this.state[name]}
                            />
                        }
                        label={label}
                    />
                    {this.state[name] ? <div className="flex-row align-center loan-section-percent">
                        <span className="small-helptext width-100-percent">Percentage of total</span>
                        <Field
                            placeholder="Percentage of total"
                            name={name}
                            disabled={localStorage.getItem('disabled')}
                            component={GlobalTextField}
                            variant="outlined"
                            endAdornment="%"
                        />
                    </div> : null}
                </div>
            );
        });

        return (
            <div>{markup}</div>
        );
    }

    submitHandler = (values) => {
        let reqObj = {};
        let loanAllocation = []
        if (values.expansion) {
            loanAllocation.push({ loanPurpose: 'Expansion', percentage: parseInt(values.expansion) });
        }
        if (values.refinancing) {
            loanAllocation.push({ loanPurpose: 'Re Financing', percentage: parseInt(values.refinancing) })
        }
        if (values.workingCapital) {
            loanAllocation.push({ loanPurpose: 'Working Capital', percentage: parseInt(values.workingCapital) })
        }
        //reqObj.phoneNumber = values.phoneNumber ;
        //reqObj.email = values.email;
        setwith(reqObj,'onboardingInfo.moneyRequired',parseInt(values.moneyRequired));
        setwith(reqObj,'onboardingInfo.loanAllocation',loanAllocation);
        setwith(reqObj,'onboardingInfo.timeFrame',values.timeFrame)
        this.props.handleNext(reqObj)

    }
    disableDecider = () => {
        if (localStorage.getItem('companyStatus') == 'PENDING_APPROVAL') {
            return true;
        }
        else {
            return false;
        }
    }
    render() {
        const { classes } = this.props;
        let { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit(this.submitHandler)} className="fwidth" >
                <fieldset disabled="">
                    <div className="Onboarding_Title">Apply for Business Financing</div>
                    <div className="row justify-content-between pt-20">
                        <div className="col-sm-6">
                            <div class="col-sm-12"><span className="onboarding-sub-title">How much funding do you need?</span></div>
                            <Field
                                label=""
                                disabled={localStorage.getItem('disabled')}
                                name="moneyRequired"
                                component={GlobalTextField}
                                variant="outlined"
                                fullWidth={true}
                                startAdornment="$"
                                type="number"
                            />
                        </div>
                        <div className="col-sm-6 get-money">
                            <div class="col-sm-12">
                                <span className="onboarding-sub-title">How soon do you need the money?</span>
                            </div>
                            <Field
                                name="timeFrame"
                                disabled={localStorage.getItem('disabled')}
                                component={ToggleButtons}
                                toggleList={[
                                    { label: '30 Days', alinValue: '30 Days' },
                                    { label: '3 Mnths', alinValue: '3 Mnths' },
                                    { label: '6 Mnths', alinValue: '6 Mnths' },
                                    { label: '1 Yr', alinValue: '1 Yr' },
                                    { label: '>1 Yr', alinValue: '> 1 Year' }
                                ]}
                            />
                        </div>
                    </div>
                    <div className="row justify-content-between pt-20">

                        <div className="col-sm-6">
                            <div className="onboarding-sub-title">How will you see the loan?</div>
                            <div class="mdc-layout-grid__inner">
                                <div class="mdc-layout-grid__cell--span-12">
                                    <div className="flex-column">
                                        {this.checkboxTest()}
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6">
                            <div class="mdc-layout-grid__inner">
                                <div class="mdc-layout-grid__cell--span-12">

                                    <div class="mdc-layout-grid__inner">
                                        <div class="mdc-layout-grid__cell--span-12">
                                            <Field
                                                label="Phone Number"
                                                disabled={localStorage.getItem('disabled')}
                                                name="personalPhoneNumber"
                                                component={GlobalTextField}
                                                variant="outlined"
                                                fullWidth={true}
                                                
                                            />
                                        </div>
                                    </div>
                                    <div class="mdc-layout-grid__inner">
                                        <div class="mdc-layout-grid__cell--span-12">
                                            <Field
                                                label="Email Address"
                                                placeholder=""
                                                name="userEmail"
                                                disabled={true}
                                                component={GlobalTextField}
                                                variant="outlined"
                                                fullWidth={true}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="common-action-block pt-78">
                        <Button
                            type="submit"
                            fullWidth
                            // disabled={this.props.isFetching}
                            variant="contained"
                            disabled={localStorage.getItem('companyStatus') == 'PENDING_APPROVAL' ? true : false || this.props.isFetching}
                            color="primary"
                            className="btnprimary ml-50"
                        >
                            {this.props.isFetching ? <CircularProgress size={24} /> : 'Save & continue'}
                        </Button>
                    </div>
                </fieldset>
            </form>
        );
    }
}

AboutMain = reduxForm({
    form: 'COB_AboutStepForm',
    enableReinitialize: true,
    keepDirtyOnReinitialize: true
})(AboutMain)

export default AboutMain;