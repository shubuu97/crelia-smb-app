import React from 'react';
import { Field, reduxForm, FormSection } from 'redux-form';
import _get from 'lodash/get';
/* Material Imports */
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
/* Global Imports */
import GlobalTextField from '../../../../Global/Components/GlobalTextField';
import CustomizedTooltips from '../../../../Global/Components/ToolTip'
import _setWith from 'lodash/setWith';
class FinancialInformationForm extends React.Component {

    state = {
        name: '',
        age: '',
        multiline: 'Controlled',
        currency: 'EUR',
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    datapopulate = (values) => {
        let data = []
        let currentYear = (new Date()).getFullYear();
        var totalKeys = Object.keys(_get(values, 'manualFinancial', {}))
        var oldestYear = { "year": currentYear - 2 }, lastYear = { "year": currentYear - 1 }, current = { "year": currentYear }, forcastYear = { "year": currentYear + 1 }
        for (let i = 0; i < totalKeys.length; i++) {
            let filter = totalKeys[i].split('-').pop().trim();
            let key = totalKeys[i].split('-')[0].trim();
            if (filter == oldestYear.year) {
                oldestYear[key] = parseInt(values.manualFinancial[totalKeys[i]])
            }
            else if (filter == lastYear.year) {
                lastYear[key] = parseInt(values.manualFinancial[totalKeys[i]])
            }
            else if (filter == current.year) {
                current[key] = parseInt(values.manualFinancial[totalKeys[i]])
            }
            else if (filter == forcastYear.year) {
                forcastYear[key] = parseInt(values.manualFinancial[totalKeys[i]])
            }
        }
        data.push(oldestYear, lastYear, current, forcastYear);
        let reqObj = {};
        delete values.manualFinancial
        reqObj = {...values};
        _setWith(reqObj,'financialInfo.financialData',data)
        this.props.handleNext(reqObj);
        return reqObj
    }

    forecastLable = () => {
        let currentYear = (new Date()).getFullYear();
        return (
            <div className="flex-row">
                <span>{currentYear + 1} forecast</span>
                <CustomizedTooltips
                    title="The forecast is optional, but it really helps investors understand your business aspirations better, your effort to fill out as much as you can is appreciated"
                    arrow={true}
                />
            </div>
        )
    }

    handleReview = () => {
        let hocSubmitFunc = this.props.handleSubmit(this.datapopulate);
        hocSubmitFunc();

        this.props.handleSubmitAprroval()
    }

    render() {
        let currentYear = (new Date()).getFullYear();
        let { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit(this.datapopulate)} autoComplete="off">
                <div className="Onboarding_Title"> Financial Summary</div>
                <div className="row justify-content-between pt-20">
                    <FormSection name="manualFinancial">
                        <div className="col-sm-10">
                            <div className="row">
                                <div className="onboarding-sub-title col-sm-12"> SALES, US$</div>
                                <div className="col-sm-3">
                                    <Field
                                        disabled={localStorage.getItem('companyStatus') == 'PENDING_APPROVAL' ? true : false}
                                        name={`sales-${currentYear - 2}`}
                                        component={GlobalTextField}
                                        label={currentYear - 2}
                                        margin="normal"
                                        onChange={this.handleChange('name')}
                                        variant="outlined"
                                        type="number"
                                        startAdornment="$"
                                    />
                                </div>
                                <div className="col-sm-3">
                                    <Field
                                        disabled={localStorage.getItem('companyStatus') == 'PENDING_APPROVAL' ? true : false}
                                        name={`sales-${currentYear - 1}`}
                                        label={currentYear - 1}
                                        component={GlobalTextField}
                                        margin="normal"
                                        onChange={this.handleChange('name')}
                                        variant="outlined"
                                        type="number"
                                        startAdornment="$"
                                    />
                                </div>
                                <div className="col-sm-3">
                                    <Field
                                        disabled={localStorage.getItem('companyStatus') == 'PENDING_APPROVAL' ? true : false}
                                        name={`sales-${currentYear}`}
                                        label={currentYear}
                                        component={GlobalTextField}
                                        margin="normal"
                                        onChange={this.handleChange('name')}
                                        variant="outlined"
                                        type="number"
                                        startAdornment="$"
                                    />
                                </div>
                                <div className="col-sm-3">
                                    <Field
                                        disabled={localStorage.getItem('companyStatus') == 'PENDING_APPROVAL' ? true : false}
                                        name={`sales-${currentYear + 1}`}
                                        label={this.forecastLable()}
                                        component={GlobalTextField}
                                        margin="normal"
                                        onChange={this.handleChange('name')}
                                        variant="outlined"
                                        type="number"
                                        startAdornment="$"
                                    />
                                </div>
                            </div>
                            <div className="row justify-content-between pt-20">
                                <div className="onboarding-sub-title col-sm-12"> EBITDA</div>
                                <div className="col-sm-3">
                                    <Field
                                        disabled={localStorage.getItem('companyStatus') == 'PENDING_APPROVAL' ? true : false}
                                        name={`ebitda-${currentYear - 2}`}
                                        label={currentYear - 2}
                                        component={GlobalTextField}
                                        margin="normal"
                                        onChange={this.handleChange('name')}
                                        variant="outlined"
                                        startAdornment="$"
                                    />
                                </div>
                                <div className="col-sm-3">
                                    <Field
                                        disabled={localStorage.getItem('companyStatus') == 'PENDING_APPROVAL' ? true : false}
                                        name={`ebitda-${currentYear - 1}`}
                                        label={currentYear - 1}
                                        component={GlobalTextField}
                                        margin="normal"
                                        onChange={this.handleChange('name')}
                                        variant="outlined"
                                        type="number"
                                        startAdornment="$"
                                    />
                                </div>
                                <div className="col-sm-3">
                                    <Field
                                        disabled={localStorage.getItem('companyStatus') == 'PENDING_APPROVAL' ? true : false}
                                        name={`ebitda-${currentYear}`}
                                        label={currentYear}
                                        component={GlobalTextField}
                                        margin="normal"
                                        onChange={this.handleChange('name')}
                                        variant="outlined"
                                        type="number"
                                        startAdornment="$"
                                    />
                                </div>
                                <div className="col-sm-3">
                                    <Field
                                        disabled={localStorage.getItem('companyStatus') == 'PENDING_APPROVAL' ? true : false}
                                        name={`ebitda-${currentYear + 1}`}
                                        label={this.forecastLable()}
                                        component={GlobalTextField}
                                        margin="normal"
                                        onChange={this.handleChange('name')}
                                        variant="outlined"
                                        type="number"
                                        startAdornment="$"
                                    />
                                </div>
                            </div>

                            <div className="row justify-content-between pt-20">
                                <div className="onboarding-sub-title col-sm-12"> Interest Expense</div>
                                <div className="col-sm-3">
                                    <Field
                                        disabled={localStorage.getItem('companyStatus') == 'PENDING_APPROVAL' ? true : false}
                                        name={`interestExpense-${currentYear - 2}`}
                                        label={currentYear - 2}
                                        component={GlobalTextField}
                                        margin="normal"
                                        onChange={this.handleChange('name')}
                                        variant="outlined"
                                        type="number"
                                        startAdornment="$"
                                    />
                                </div>
                                <div className="col-sm-3">
                                    <Field
                                        disabled={localStorage.getItem('companyStatus') == 'PENDING_APPROVAL' ? true : false}
                                        name={`interestExpense-${currentYear - 1}`}
                                        label={currentYear - 1}
                                        component={GlobalTextField}
                                        margin="normal"
                                        onChange={this.handleChange('name')}
                                        variant="outlined"
                                        type="number"
                                        startAdornment="$"
                                    />
                                </div>
                                <div className="col-sm-3">
                                    <Field
                                        disabled={localStorage.getItem('companyStatus') == 'PENDING_APPROVAL' ? true : false}
                                        name={`interestExpense-${currentYear}`}
                                        label={currentYear}
                                        component={GlobalTextField}
                                        margin="normal"
                                        onChange={this.handleChange('name')}
                                        variant="outlined"
                                        type="number"
                                        startAdornment="$"
                                    />
                                </div>
                                <div className="col-sm-3">
                                    <Field
                                        disabled={localStorage.getItem('companyStatus') == 'PENDING_APPROVAL' ? true : false}
                                        name={`interestExpense-${currentYear + 1}`}
                                        label={this.forecastLable()}
                                        component={GlobalTextField}
                                        margin="normal"
                                        onChange={this.handleChange('name')}
                                        variant="outlined"
                                        type="number"
                                        startAdornment="$"
                                    />
                                </div>
                            </div>
                            <div className="row justify-content-between pt-20">
                                <div className="onboarding-sub-title col-sm-12">Cash </div>
                                <div className="col-sm-3">
                                    <Field
                                        disabled={localStorage.getItem('companyStatus') == 'PENDING_APPROVAL' ? true : false}
                                        name={`cash-${currentYear - 2}`}
                                        label={currentYear - 2}
                                        component={GlobalTextField}
                                        margin="normal"
                                        onChange={this.handleChange('name')}
                                        variant="outlined"
                                        type="number"
                                        startAdornment="$"
                                    />
                                </div>
                                <div className="col-sm-3">
                                    <Field
                                        disabled={localStorage.getItem('companyStatus') == 'PENDING_APPROVAL' ? true : false}
                                        name={`cash-${currentYear - 1}`}
                                        label={currentYear - 1}
                                        component={GlobalTextField}
                                        margin="normal"
                                        onChange={this.handleChange('name')}
                                        variant="outlined"
                                        type="number"
                                        startAdornment="$"
                                    />
                                </div>
                                <div className="col-sm-3">
                                    <Field
                                        disabled={localStorage.getItem('companyStatus') == 'PENDING_APPROVAL' ? true : false}
                                        name={`cash-${currentYear}`}
                                        label={currentYear}
                                        component={GlobalTextField}
                                        margin="normal"
                                        onChange={this.handleChange('name')}
                                        variant="outlined"
                                        type="number"
                                        startAdornment="$"
                                    />
                                </div>
                                <div className="col-sm-3">
                                    <Field
                                        disabled={localStorage.getItem('companyStatus') == 'PENDING_APPROVAL' ? true : false}
                                        name={`cash-${currentYear + 1}`}
                                        label={this.forecastLable()}
                                        component={GlobalTextField}
                                        margin="normal"
                                        onChange={this.handleChange('name')}
                                        variant="outlined"
                                        type="number"
                                        startAdornment="$"
                                    />
                                </div>
                            </div>
                            <div className="row justify-content-between pt-20">
                                <div className="onboarding-sub-title col-sm-12"> Total Final Debt</div>
                                <div className="col-sm-3">
                                    <Field
                                        disabled={localStorage.getItem('companyStatus') == 'PENDING_APPROVAL' ? true : false}
                                        name={`totalFinalDebt-${currentYear - 2}`}
                                        label={currentYear - 2}
                                        component={GlobalTextField}
                                        margin="normal"
                                        onChange={this.handleChange('name')}
                                        variant="outlined"
                                        type="number"
                                        startAdornment="$"
                                    />
                                </div>
                                <div className="col-sm-3">
                                    <Field
                                        disabled={localStorage.getItem('companyStatus') == 'PENDING_APPROVAL' ? true : false}
                                        name={`totalFinalDebt-${currentYear - 1}`}
                                        label={currentYear - 1}
                                        component={GlobalTextField}
                                        margin="normal"
                                        onChange={this.handleChange('name')}
                                        variant="outlined"
                                        type="number"
                                        startAdornment="$"
                                    />
                                </div>
                                <div className="col-sm-3">
                                    <Field
                                        disabled={localStorage.getItem('companyStatus') == 'PENDING_APPROVAL' ? true : false}
                                        name={`totalFinalDebt-${currentYear}`}
                                        label={currentYear}
                                        component={GlobalTextField}
                                        margin="normal"
                                        onChange={this.handleChange('name')}
                                        variant="outlined"
                                        type="number"
                                        startAdornment="$"
                                    />
                                </div>
                                <div className="col-sm-3">
                                    <Field
                                        disabled={localStorage.getItem('companyStatus') == 'PENDING_APPROVAL' ? true : false}
                                        name={`totalFinalDebt-${currentYear + 1}`}
                                        label={this.forecastLable()}
                                        component={GlobalTextField}
                                        margin="normal"
                                        onChange={this.handleChange('name')}
                                        variant="outlined"
                                        type="number"
                                        startAdornment="$"
                                    />
                                </div>
                            </div>
                            <div className="row justify-content-between pt-20">
                                <div className="onboarding-sub-title col-sm-12"> Total Shareholder Equity</div>
                                <div className="col-sm-3">
                                    <Field
                                        disabled={localStorage.getItem('companyStatus') == 'PENDING_APPROVAL' ? true : false}
                                        name={`totalShareholderEquity-${currentYear - 2}`}
                                        label={currentYear - 2}
                                        component={GlobalTextField}
                                        margin="normal"
                                        onChange={this.handleChange('name')}
                                        variant="outlined"
                                        type="number"
                                        startAdornment="$"
                                    />
                                </div>
                                <div className="col-sm-3">
                                    <Field
                                        disabled={localStorage.getItem('companyStatus') == 'PENDING_APPROVAL' ? true : false}
                                        name={`totalShareholderEquity-${currentYear - 1}`}
                                        label={currentYear - 1}
                                        component={GlobalTextField}
                                        margin="normal"
                                        onChange={this.handleChange('name')}
                                        variant="outlined"
                                        type="number"
                                        startAdornment="$"
                                    />
                                </div>
                                <div className="col-sm-3">
                                    <Field
                                        disabled={localStorage.getItem('companyStatus') == 'PENDING_APPROVAL' ? true : false}
                                        name={`totalShareholderEquity-${currentYear}`}
                                        label={currentYear}
                                        component={GlobalTextField}
                                        margin="normal"
                                        onChange={this.handleChange('name')}
                                        variant="outlined"
                                        type="number"
                                        startAdornment="$"
                                    />
                                </div>
                                <div className="col-sm-3">
                                    <Field
                                        disabled={localStorage.getItem('companyStatus') == 'PENDING_APPROVAL' ? true : false}
                                        name={`totalShareholderEquity-${currentYear + 1}`}
                                        label={this.forecastLable()}
                                        component={GlobalTextField}
                                        margin="normal"
                                        onChange={this.handleChange('name')}
                                        variant="outlined"
                                        type="number"
                                        startAdornment="$"
                                    />
                                </div>
                            </div>
                        </div>
                    </FormSection>
                </div>
                <div class="common-action-block col-sm-12">
                    <Button
                        type="submit"
                        disabled={localStorage.getItem('companyStatus') == 'PENDING_APPROVAL' ? true : false || this.props.isFetchingSave}
                        fullWidth
                        variant="contained"
                        color="primary"
                        className="btnprimary">
                        {this.props.isFetchingSave ? <CircularProgress size={24} /> : 'Save Draft'}

                    </Button>
                    <Button
                        fullWidth
                        onClick={this.handleReview}
                        variant='contained'
                        className="btnprimary  ml-35"
                        color='primary'>
                        Review
                       </Button>
                </div>
            </form>
        );
    }
}
FinancialInformationForm = reduxForm({
    form: 'FinancialInformationForm',
    enableReinitialize: true,
    keepDirtyOnReinitialize: true
})(FinancialInformationForm)

export default FinancialInformationForm