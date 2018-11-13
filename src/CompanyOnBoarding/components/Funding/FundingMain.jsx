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
import CustomizedTooltips from '../../../Global/ToolTip'
/* Styles */
import '../../styles/CompanyOnBoarding.less';
import FormControl from '@material-ui/core/FormControl';


class AboutMain extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    handlerCheck = (status, field) => {
        this.setState({ [field]: status });
    }

    componentDidMount() {
        if (_get(this.props, 'initialValues.investment'))
            this.setState({ investment: true })
        if (_get(this.props, 'initialValues.workingCapital'))
            this.setState({ workingCapital: true });
        if (_get(this.props, 'initialValues.refinancing'))
            this.setState({ refinancing: true })
        if (_get(this.props, 'initialValues.loan'))
            this.setState({ loan: true })
        if (_get(this.props, 'initialValues.equity'))
            this.setState({ equity: true });
        if (_get(this.props, 'initialValues.other'))
            this.setState({ equity: true });
            if (_get(this.props, 'initialValues.otherLoanDescription'))
            this.setState({ otherLoanDescription: true });


    }
    toggleUseMoneyDesc = () => {

        this.setState({ otherLoanDescription: !this.state.otherLoanDescription })
    }
    CheckboxTest = () => {
        let labels = ["Investment", "Working Capital", "Refinancing"];
        let tooltip = [
            "Investment is purchase of equipment, new branches/locations, renovation of new premises.",
            "Working Capital is salaries, raw materials, prepaid services, inventory work-in-process, finished goods, returns and defects.",
            "Refinancing is capital used to pay down previous loans or to buy out existing investor partners."
        ]
        let index = -1;
        var markup = labels.map((label) => {
            index++
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
                    <CustomizedTooltips
                        title={tooltip[index]}
                        arrow={true}
                    />
                </div>
            );
        });

        return (
            <div>

                <div>{markup}</div>
                <div onClick={this.toggleUseMoneyDesc} ><a>Or tell us about the intended use of capital in your own words:</a></div>
                <div>{this.state.otherLoanDescription ? <Field multiline={true} name='otherLoanDescription' component={GlobalTextField} /> : null}</div>
            </div>
        );
    }

    LoanEquityCheckbox = () => {
        let labels = ["Loan", "Equity", "Other"];
        let tooltip = [
            "Loan tooltip content",
            "Equity content",
            "other content"
        ]
        let index = -1;
        var markup = labels.map((label) => {
            index++
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

                    {this.state[name]&&!this.state.otherLoanDescription ? <div className="flex-row align-center loan-section-percent">
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
                    <CustomizedTooltips
                        title={tooltip[index]}
                        arrow={true}
                    />
                </div>
            );
        });

        return (
            <div>{markup}</div>
        );
    }

    submitHandler = (values) => {
        let reqObj = {};
        let fundAllocation = [];
        let fundingType = [];
        if (values.investment) {
            fundAllocation.push({ purpose: 'Expansion', percentage: parseInt(values.investment) });
        }
        if (values.refinancing) {
            fundAllocation.push({ purpose: 'Re Financing', percentage: parseInt(values.refinancing) })
        }
        if (values.workingCapital) {
            fundAllocation.push({ purpose: 'Working Capital', percentage: parseInt(values.workingCapital) })
        }
        if(values.otherLoanDescription)
        {
            fundAllocation.push({purpose:values.otherLoanDescription,percentage:100})
        }

        //funding type code fetching from redux form
        if (values.loan) {
            fundingType.push({ fundingType: 'Loan', percentage: parseInt(values.investment) });
        }
        if (values.equity) {
            fundingType.push({ fundingType: 'Equity', percentage: parseInt(values.refinancing) })
        }
        if (values.other) {
            fundingType.push({ fundingType: 'other', percentage: parseInt(values.workingCapital) })
        }
        //reqObj.phoneNumber = values.phoneNumber ;
        //reqObj.email = values.email;
        setwith(reqObj, 'onboardingInfo.moneyRequired', parseInt(values.moneyRequired));
        setwith(reqObj, 'onboardingInfo.fundAllocation', fundAllocation);
        setwith(reqObj, 'onboardingInfo.fundingType', fundingType);

        setwith(reqObj, 'onboardingInfo.timeFrame', values.timeFrame)
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
                            <div class="col-sm-12"><span className="onboarding-sub-title">How much funding do you think you may need?</span></div>
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
                                <span className="onboarding-sub-title">How soon will you need the money?</span>
                            </div>
                            <Field
                                name="timeFrame"
                                disabled={localStorage.getItem('disabled')}
                                component={ToggleButtons}
                                toggleList={[
                                    { label: '< 1 Month', alinValue: '< 1 Month' },
                                    { label: '1-3 Mnths', alinValue: '1-3 Mnths' },
                                    { label: '3-6 Mnths', alinValue: '3-6 Mnths' },
                                    { label: '> 6 Mnths', alinValue: '> 6 Mnths' }
                                ]}
                            />
                            <div class="col-sm-12">
                                <span className="onboarding-sub-title">Or give us a date by when you need the money in the bank</span>
                            </div>
                            <FormControl margin="normal" required fullWidth>
                                <Field
                                    id="date"
                                    disabled={localStorage.getItem('disabled')}
                                    name="timeFrame"
                                    component={GlobalTextField}
                                    defaultValue="2017-05-24"
                                    type="date"
                                    variantType='outlined'
                                    fullWidth="true"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                /></FormControl>
                        </div>
                    </div>
                    <div className="row justify-content-between pt-20">

                        <div className="col-sm-6">
                            <div className="onboarding-sub-title">How will you use the money?</div>
                            <div class="mdc-layout-grid__inner">
                                <div class="mdc-layout-grid__cell--span-12">
                                    <div className="flex-column">
                                        {this.CheckboxTest()}
                                    </div>

                                </div>
                            </div>

                        </div>

                        <div className="col-sm-6">
                            <div className="onboarding-sub-title">Do you prefer to borrow or attract partners?</div>
                            <div class="mdc-layout-grid__inner">
                                <div class="mdc-layout-grid__cell--span-12">

                                    {this.LoanEquityCheckbox()}

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