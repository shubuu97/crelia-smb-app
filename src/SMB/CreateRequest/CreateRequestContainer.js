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

            <div className="loan-request">
                    <div className="col-sm-12 ">
                        <h1>Loan Request</h1>                       
                        <div className="cardwrapper">
                        <div className="row">
                            <div className='col-sm-8'>                           
                                <div className="search-area">
                                <h4>Loan Amount</h4>
                                <FormSection name='moneyRange'>
                                    <div className="row">
                                        <div className='col-sm-5'>
                                            <FormControl margin="normal" required fullWidth>
                                                <Field
                                                    label='Minimum'
                                                    name='minAmount'
                                                    component={GlobalTextField}
                                                    fullWidth={true}
                                                    normalize={formatMoney}
                                                />
                                            </FormControl>
                                        </div>
                                        <div className='col-sm-5'>
                                            <FormControl margin="normal" required fullWidth>
                                                <Field
                                                    label='Maximum'
                                                    name='maxAmount'
                                                    component={GlobalTextField}
                                                    fullWidth={true}
                                                    normalize={formatMoney}
                                                />
                                            </FormControl>
                                        </div>
                                        <div className='col-sm-2'>
                                            <FormControl margin="normal" required fullWidth>
                                                <Field
                                                    label="Currency"
                                                    name="currency"
                                                    component={Select}
                                                    variantType='outlined'
                                                    options={this.props.currencyList}
                                                />
                                            </FormControl>
                                        </div>
                                    </div>
                                </FormSection>
                                <div className="row">
                                    <div className='col-sm-5'>
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
                                    </div>
                                </div>
                                <h4 className="pt-30">Purpose of Loan</h4>
                                <FormControl margin="normal" required fullWidth>
                                <div className="row">
                                <div className='col-sm-3'>
                                    <Field
                                        label='Working Capital'
                                        name='workingCapital'
                                        color='primary'
                                        component={GlobalCheckBox}
                                        onChange={(e, value) => this.handleCheck('workingCapitalPecentage', value)}
                                    />
                                    </div>
                                    <div className='col-sm-7'>
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
                                    </div>
                                    </div>
                                </FormControl>
                                
                                <FormControl margin="normal" required fullWidth>
                                <div className="row">
                                    <div className='col-sm-3'>
                                    <Field
                                        label='Capital Expense'
                                        name='capitalExpense'
                                        color='primary'
                                        component={GlobalCheckBox}
                                        onChange={(e, value) => this.handleCheck('capitalExpensePecentage', value)}
                                    />
                                     </div>                                   
                                    <div className='col-sm-7'>
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
                                    </div>
                                    </div>
                                </FormControl>
                                <FormControl margin="normal" required fullWidth>
                                <div className="row">
                                    <div className='col-sm-3'>
                                    <Field
                                        label='Refinancing'
                                        name='refinancing'
                                        color='primary'
                                        component={GlobalCheckBox}
                                        onChange={(e, value) => this.handleCheck('refinancingPecentage', value)}
                                    />
                                      </div>                                  
                                    <div className='col-sm-7'>
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
                                     </div>
                                    </div>
                                </FormControl>
                                <FormControl margin="normal" required fullWidth>
                                <div className="row">
                                    <div className='col-sm-10'>
                                    <Field
                                        label='Other purpose..'
                                        name='otherPurpose'
                                        component={GlobalTextField}
                                        fullWidth={true}
                                    />
                                    </div>
                                    </div>
                                </FormControl>

                                <h4 className="pt-30">Term</h4>
                                <div className="row">
                                    <div className='col-sm-10'>
                                <FormControl margin="normal" required fullWidth>
                               
                                    <Field
                                        label="Loan Term"
                                        name="term"
                                        component={Select}
                                        variantType='outlined'
                                        options={[{ label: '1 year', value: 1 }, { label: '3 year', value: 3 }, { label: '5 year', value: 5 }]}
                                    />
                                </FormControl>
                                </div>
                                <div className='col-sm-10'>
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
                                </div>
                            </div>
                            </div>
                            <div className='col-sm-4'>
                            <div className="details-block">
                                <PreviewForm
                                    submitLoanDetails={this.props.handleSubmit(this.submitLoanDetails)}
                                    formValues={this.props.formValues} />
                            </div>
                            </div>
                        </div>
            </div>
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