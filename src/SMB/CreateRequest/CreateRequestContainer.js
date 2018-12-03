import React, { Component } from 'react';

//Redux and Redux-form imports
import { Field, reduxForm, getFormValues, FormSection } from 'redux-form';
import { connect } from 'react-redux';

//Global and material ui imports
import GlobalTextField from '../../Global/Components/GlobalTextField';
import formatMoney from '../../Global/Components/normalizingMoneyField';
import deformatMoney from '../../Global/Components/denormalizingMoney'
import FormControl from '@material-ui/core/FormControl';
import Select from '../../Global/Components/Select';
import GlobalCheckBox from '../../Global/Components/GlobalCheckBox';

//Data fetching imported from common
import genericGetData from '../../Global/dataFetch/genericGetData';
import genericPostData from '../../Global/dataFetch/genericPostData';
import basicDataFetcher from '../../Global/dataFetch/basicDataFetcher'

//side component for preview and submit
import PreviewForm from './components/PreviewForm';

//Lodash import 
import _get from 'lodash/get';
import _find from 'lodash/find'



class CreateRequestContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            workingCapital: false
        }
    }
    componentDidMount() {
        genericGetData({
            dispatch: this.props.dispatch,
            url: '/reference-service/allowedCurrencies',
            constant: {
                init: 'currency_init',
                success: 'currency_success',
                error: 'currency_error'
            },
            identifier: 'currency_get'
        });
        basicDataFetcher(this.props.dispatch)
    }

    //logic to remove value from form
    handleCheck = (name, b) => {
        if(b==false)
        {
        this.props.change(name, null);
        }


    }

    submitLoanDetails = (values) => {
        console.log(values, "values is here");
        let reqObj = {};
        reqObj.companyId = this.props.id;
        reqObj.timeFrame = values.timeFrame;
        reqObj.term = values.term;
        reqObj.fundAllocation = [];
        reqObj.interestRate = parseInt(values.interestRate);
        reqObj.interestRateType = "FIXED"




        //logic to denormalize money
        if (values.moneyRange) {
            values.moneyRange.minAmount = deformatMoney(_get(values, 'moneyRange.minAmount', 0));
            values.moneyRange.maxAmount = deformatMoney(_get(values, 'moneyRange.maxAmount', 0));
        }
        //end
        reqObj.moneyRange = values.moneyRange;


        // logic to add fundallocation array
        if (values.capitalExpensePecentage) {
            reqObj.fundAllocation.push({ purpose: 'Expansion', percentage: parseInt(values.capitalExpensePecentage) })
        }
        if (values.workingCapitalPecentage) {
            reqObj.fundAllocation.push({ purpose: ',Working Capital', percentage: parseInt(values.workingCapitalPecentage) })
        }
        if (values.refinancingPecentage) {
            reqObj.fundAllocation.push({ purpose: 'Refinancing', percentage: parseInt(values.refinancingPecentage) })
        }
        if(values.otherPurpose)
        {
            reqObj.fundAllocation.push({ purpose: values.otherPurpose, percentage:100 })

        }
        //logic end here

        genericPostData({
            dispatch: this.props.dispatch, url: '/api/SaveLoan',
            identifier: 'loan-post', successText: 'Loan Saved Succesfully', reqObj,
            constants: {
                init: 'create_loan_init',
                success: 'create_loan_success',
                error: 'create_loan_error'
            }
        })

    }
    render() {

        console.log(this.props, 'qqqqq')
        return (
            <div className="row">
                <div className='col-sm-8'>
                    <FormSection name='moneyRange'>
                        <FormControl margin="normal" required fullWidth>
                            <Field
                                label='Minimum'
                                name='minAmount'
                                component={GlobalTextField}
                                fullWidth={true}
                                normalize={formatMoney}
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <Field
                                label='Maximum'
                                name='maxAmount'
                                component={GlobalTextField}
                                fullWidth={true}
                                normalize={formatMoney}
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <Field
                                label="Currency"
                                name="currency"
                                component={Select}
                                variantType='outlined'
                                options={this.props.currencyList}
                            />
                        </FormControl>
                    </FormSection>
                    <FormControl margin="normal" required fullWidth>
                        <Field
                            label='Desired Rate'
                            name='interestRate'
                            component={GlobalTextField}
                            fullWidth={true}
                            normalize={formatMoney}
                            endAdornment="%"
                        />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <Field
                            label='Working Capital'
                            name='workingCapital'
                            color='primary'
                            component={GlobalCheckBox}
                            onChange={(e, value) => this.handleCheck('workingCapitalPecentage', value)}
                        />
                        {_get(this.props, 'formValues.workingCapital', false) ?
                            <Field
                                label='Part of loan(%)'
                                name='workingCapitalPecentage'
                                component={GlobalTextField}
                                fullWidth={true}
                                normalize={formatMoney}
                                endAdornment="%"
                            /> : null
                        }
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <Field
                            label='Capital Expense'
                            name='capitalExpense'
                            color='primary'
                            component={GlobalCheckBox}
                            onChange={(e, value) => this.handleCheck('capitalExpensePecentage', value)}
                        />
                        {_get(this.props, 'formValues.capitalExpense', false) ?
                            <Field
                                label='Part of loan(%)'
                                name='capitalExpensePecentage'
                                component={GlobalTextField}
                                fullWidth={true}
                                normalize={formatMoney}
                                endAdornment="%"
                            /> : null
                        }
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <Field
                            label='Refinancing'
                            name='refinancing'
                            color='primary'
                            component={GlobalCheckBox}
                            onChange={(e, value) => this.handleCheck('refinancingPecentage', value)}
                        />
                        {_get(this.props, 'formValues.refinancing', false) ?
                            <Field
                                label='Part of loan(%)'
                                name='refinancingPecentage'
                                component={GlobalTextField}
                                fullWidth={true}
                                normalize={formatMoney}
                                endAdornment="%"
                            /> : null
                        }
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <Field
                            label='Other purpose..'
                            name='otherPurpose'
                            component={GlobalTextField}
                            fullWidth={true}
                        />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <Field
                            label="Loan Term"
                            name="term"
                            component={Select}
                            variantType='outlined'
                            options={[{ label: '1 year', value: 1 }, { label: '3 year', value: 3 }, { label: '5 year', value: 5 }]}
                        />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <Field
                            label='Time Frame'
                            name='timeFrame'
                            component={GlobalTextField}
                            type='date'
                            fullWidth={true}
                        />
                    </FormControl>
                </div>
                <div className='col-sm-4'>
                    <PreviewForm
                        submitLoanDetails={this.props.handleSubmit(this.submitLoanDetails)}
                        formValues={this.props.formValues} />
                </div>
            </div>
        )
    }
}

CreateRequestContainer = reduxForm({
    form: 'createLoanRequest',
    enableReinitialize: true,
    keepDirtyOnReinitialize: true
})(CreateRequestContainer);

function mapStateToProps(state) {

    let workingCapital = false;
    let capitalExpense = false;
    let refinancing = false;
    let otherPurpose = '';
    let workingCapitalPecentage;
    let capitalExpensePecentage;
    let refinancingPecentage;
    let id = _get(state, 'BasicInfo.lookUpData.companyDetails.id', '');


    //Login to show the Fund allocation prefilled
    let fundAllocation = _get(state, 'BasicInfo.lookUpData.companyDetails.onboardingInfo.fundAllocation', []);
    fundAllocation.map((Allocation) => {
        if (Allocation.purpose == 'Expansion') {
            capitalExpense = true;
            capitalExpensePecentage = Allocation.percentage
        }
        if (Allocation.purpose == 'Working Capital') {
            workingCapital = true;
            workingCapitalPecentage = Allocation.percentage


        }
        if (Allocation.purpose == 'Refinancing') {
            refinancing = true;
            refinancingPecentage = Allocation.percentage

        }
    })
    //Bug in onboard info
    if (fundAllocation.length == 1 && !_find(fundAllocation, { purpose: 'Expansion' }) && !_find(fundAllocation, { purpose: 'Working Capital' }) && !_find(fundAllocation, { purpose: 'Re Financing' })) {
        otherPurpose = fundAllocation[0].purpose;
    }

    //Login ends here



    return {
        formValues: getFormValues('createLoanRequest')(state),
        currencyList: _get(state, 'currency.lookUpData', []),
        id,
        initialValues: {
            workingCapital,refinancing,capitalExpense,
            capitalExpensePecentage,refinancingPecentage, 
            workingCapitalPecentage,otherPurpose
        }
    }

}



export default connect(mapStateToProps)(CreateRequestContainer);