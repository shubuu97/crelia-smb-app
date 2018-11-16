import React from 'react';
import { Field, reduxForm, FormSection } from 'redux-form';
import _get from 'lodash/get';
/* Material Imports*/
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
/* Global Imports*/
import GlobalTextField from '../../../Global/GlobalTextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import CustomizedTooltips from '../../../Global/ToolTip'


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
        // ********* Important **********
        // Code needs to be optimized and needs to be dynamic 
        let data = []
        var totalKeys = Object.keys(_get(values, 'manualFinancial', {}))
        var y2016 = { "year": 2016 }, y2017 = { "year": 2017 }, y2018 = { "year": 2018 }, y2019 = { "year": 2019 }
        for (let i = 0; i < totalKeys.length; i++) {
            let filter = totalKeys[i].split('-').pop().trim();
            let key = totalKeys[i].split('-')[0].trim();
            if (filter == 2016) {
                y2016[key] = parseInt(values.manualFinancial[totalKeys[i]])
            }
            else if (filter == 2017) {
                y2017[key] = parseInt(values.manualFinancial[totalKeys[i]])
            }
            else if (filter == 2018) {
                y2018[key] = parseInt(values.manualFinancial[totalKeys[i]])
            }
            else if (filter == 2019) {
                y2019[key] = parseInt(values.manualFinancial[totalKeys[i]])
            }
        }
        data.push(y2016, y2017, y2018,y2019);
        let reqObj = {};
        reqObj.financialInfo = {}
        reqObj.financialInfo.financialData = data;
        reqObj.financialInfo.loanProvider = _get(values,'loanProvider',[]);
        reqObj.financialInfo.financialLinks = _get(values,'financialLinks',[])
        this.props.handleNext(reqObj);
        return reqObj
    }

    forecastLable = () => {
        // ********* Important **********
        // Code needs to be optimized and needs to be dynamic 
        return (
            <div className="flex-row">
                <span>2019 forecast</span>
                <CustomizedTooltips
                    title="The forecast is optional, but it really helps investors understand your business aspirations better, your effort to fill out as much as you can is appreciated"
                    arrow={true}
                />
            </div>
        )
    }

    handleReview = () => {
       let hocSubmitFunc =  this.props.handleSubmit(this.datapopulate);
       hocSubmitFunc();

        this.props.handleSubmitAprroval()
    }

    render() {
        // ********* Important **********
        // Code needs to be optimized and needs to be dynamic 

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
                                        name="sales-2016"
                                        component={GlobalTextField}
                                        label="2016"
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
                                        name="sales-2017"
                                        label="2017"
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
                                        name="sales-2018"
                                        label="2018"
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
                                        name="sales-2019"
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
                                        name="ebitda-2016"
                                        label="2016"
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
                                        name="ebitda-2017"
                                        label="2017"
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
                                        name="ebitda-2018"
                                        label="2018"
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
                                        name="ebitda-2019"
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
                                        name="interestExpense-2016"
                                        label="2016"
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
                                        name="interestExpense-2017"
                                        label="2017"
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
                                        name="interestExpense-2018"
                                        label="2018"
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
                                        name="interestExpense-2019"
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
                                        name="cash-2016"
                                        label="2016"
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
                                        name="cash-2017"
                                        label="2017"
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
                                        name="cash-2018"
                                        label="2018"
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
                                        name="cash-2019"
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
                                        name="totalFinalDebt-2016"
                                        label="2016"
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
                                        name="totalFinalDebt-2017"
                                        label="2017"
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
                                        name="totalFinalDebt-2018"
                                        label="2018"
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
                                        name="totalFinalDebt-2019"
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
                                        name="totalShareholderEquity-2016"
                                        label="2016"
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
                                        name="totalShareholderEquity-2017"
                                        label="2017"
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
                                        name="totalShareholderEquity-2018"
                                        label="2018"
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
                                        name="totalShareholderEquity-2019"
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
                        // disabled={this.props.isFetching}
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