import React, { Component } from 'react';
//Lodash import 
import _get from 'lodash/get';
import _find from 'lodash/find';
/* Material Imports*/
import FormControl from '@material-ui/core/FormControl';

/* Redux Imports */
import { connect } from 'react-redux';
import { Field, reduxForm, getFormValues, FormSection } from 'redux-form';
import { postData } from '../../Redux/postAction';
import showMessage from '../../Redux/toastAction';
import { getData } from '../../Redux/getAction';
import { APPLICATION_BFF_URL } from '../../Redux/urlConstants'
import { commonActionCreater } from '../../Redux/commonAction';

/* Global Imports*/
import GlobalTextField from '../../Global/Components/GlobalTextField';
import formatMoney from '../../Global/Components/normalizingMoneyField';
import Select from '../../Global/Components/Select';
import GlobalCheckBox from '../../Global/Components/GlobalCheckBox';
import deformatMoney from '../../Global/Components/denormalizingMoney'

/* Data fetching imported from common */
import genericGetData from '../../Global/dataFetch/genericGetData';
import genericPostData from '../../Global/dataFetch/genericPostData';
/* Components Imports*/
import PreviewForm from './components/PreviewForm';


class Loan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            workingCapital: false
        }
    }
    componentDidMount() {
        this.getApiCall('reference-service/allowedCurrencies', 'currency');
        let urlToHit =  'LoanOffer';
        let idToSend =  _get(this.props, 'fundId');
        
        if (idToSend) {
            genericGetData({
                dispatch: this.props.dispatch,
                url: `/api/${urlToHit}/${encodeURIComponent(idToSend)}`,
                constant: {
                    init: 'loan_id_init',
                    success: 'loan_id_success',
                    error: 'loan_id_error'
                },
                identifier: 'loan_id'
            }).then(data => {
                this.props.autofill('moneyRange', data.moneyRange);
                this.props.autofill('interestRate', data.interestRate);
                this.props.autofill('term', data.term);
                this.props.autofill('timeFrame', data.timeFrame.split('T')[0]);
                this.props.autofill('principalRepaymentFrequency', _get(data, 'repaymentTerms.principalRepaymentFrequency'));
                this.props.autofill('principalRepaymentTimeValue', _get(data, 'repaymentTerms.principalGracePeriod.timeValue'));
                this.props.autofill('principalRepaymentTimeUnit', _get(data, 'repaymentTerms.principalGracePeriod.timeUnit'));
                this.props.autofill('interestRepaymentFrequency', _get(data, 'repaymentTerms.interestRepaymentFrequency'));
                this.props.autofill('interestRepaymentTimeValue', _get(data, 'repaymentTerms.interestGracePeriod.timeValue'));
                this.props.autofill('interestRepaymentTimeUnit', _get(data, 'repaymentTerms.interestGracePeriod.timeUnit'));

                _get(data, 'fundAllocation', []).map((Allocation) => {
                    //todo this need to be change
                    if (Allocation.purpose == 'Expansion') {
                        this.props.autofill('capitalExpense', true);
                        this.props.autofill('capitalExpensePecentage', Allocation.percentage);
                    }
                    if (Allocation.purpose == 'Working Capital') {
                        this.props.autofill('workingCapital', true);
                        this.props.autofill('workingCapitalPecentage', Allocation.percentage);
                    }
                    if (Allocation.purpose == 'Refinancing') {
                        this.props.autofill('refinancing', true);
                        this.props.autofill('refinancingPecentage', Allocation.percentage);
                    }
                    if (Allocation.purpose !== 'Expansion' &&
                        Allocation.purpose !== 'Working Capital' &&
                        Allocation.purpose !== 'Refinancing') {

                        this.props.autofill('otherPurpose', Allocation.purpose);
                    }
                })
            }).catch(err => {

            });
        }
        
        else {
            this.props.history.push({ pathname: "/loans/request" });
        }

    }
    getApiCall = (url, identifier) => {
        return this.props.dispatch(getData(`${APPLICATION_BFF_URL}/${url}`, identifier, {
            init: `${identifier}_init`,
            success: `${identifier}_success`,
            error: `${identifier}_error`
        }))
    }
    handleCheck = (name, b) => {
        if (b == false) {
            this.props.change(name, null);
        }
    }

    componentWillUnmount() {
        this.props.dispatch(commonActionCreater({
            reqID: null
        }, 'SAVE_FUND_REQ_ID'));
        this.props.dispatch(commonActionCreater({
            offerId: null,
            loanId: null
        }, 'SAVE_OFFER_ID'))
    }

    handleCheck = (name, b) => {
        this.setState({ [name]: b })
    }

    makeReqObj = (values)=>
    {
        let reqObj = {};
        // Static data needs to be fixed
        reqObj.repaymentTerms = {
            principalRepaymentFrequency: values.principalRepaymentFrequency,
            principalGracePeriod: {
                timeValue: parseInt(values.principalRepaymentTimeValue),
                timeUnit: values.principalRepaymentTimeUnit,
            },
            interestRepaymentFrequency: values.interestRepaymentFrequency,
            interestGracePeriod: {
                timeValue: parseInt(values.interestRepaymentTimeValue),
                timeUnit: values.interestRepaymentTimeUnit,
            }
        }
        reqObj.loanId = this.props.fundId ? this.props.fundId : '';
        reqObj.id =  _get(this, 'props.offer.offerId', '');
        //reqObj.id = this.props.investorId
        //reqObj.companyId = this.props.investorId
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
            reqObj.fundAllocation.push({ purpose: 'Working Capital', percentage: parseInt(values.workingCapitalPecentage) })
        }
        if (values.refinancingPecentage) {
            reqObj.fundAllocation.push({ purpose: 'Refinancing', percentage: parseInt(values.refinancingPecentage) })
        }
        if (values.otherPurpose) {
            reqObj.fundAllocation.push({ purpose: values.otherPurpose, percentage: 100 })

        }
        return reqObj
    }

    saveLoanDetails = (values) => {
       
        //logic end here
        this.setState({SaveOfferLoading:true});

        let reqObj = this.makeReqObj(values)

        genericPostData({
            dispatch: this.props.dispatch, url: '/api/SaveLoanOffer',
            identifier: 'create_offer',
            successText: 'Offer Saved Sucessfully',
            reqObj,
            constants: {
                init: 'save_offer_init',
                success: 'save_offer_success',
                error: 'save_offer_error'
            },
            successCb: this.returnedData,
            errorCb:()=>this.setState({SaveOfferLoading:false})
        })
    }

    returnedData = (data) => {
        this.setState({SaveOfferLoading:false})
        this.props.dispatch(commonActionCreater({
            offerId: data.id
        }, 'SAVE_OFFER_ID'));
    }

    submitLoanDetails = (values) => {
        let reqObj = this.makeReqObj(values);
        this.setState({MakeOfferLoading:true})
        genericPostData({
            dispatch: this.props.dispatch, url: '/api/SendLoanOffer',
            identifier: 'send_offer',
            successText: 'Offer Sent Sucessfully',
            reqObj,
            constants: {
                init: 'send_offer_init',
                success: 'send_offer_success',
                error: 'send_offer_error'
            },
            successCb: ()=> this.setState({MakeOfferLoading:false}),
            errorCb:()=>this.setState({MakeOfferLoading:false})
        })
    }

    render() {
        return (
            <div className="loan-request">
                <div className="col-sm-12 ">
                    <h1>Make an Offer</h1>
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

                                    <h4 className="pt-30">Principal Repayment Term</h4>
                                    <div className="row">
                                        <div className='col-sm-10'>
                                            <FormControl margin="normal" required fullWidth>
                                                <Field
                                                    label="Principal Repayment Frequency"
                                                    name="principalRepaymentFrequency"
                                                    component={Select}
                                                    variantType='outlined'
                                                    options={[{ label: 'Monthly', value: "MONTHLY" }, { label: 'Quarterly', value: 'QUARTERLY' }, { label: 'Semi Annually', value: "SEMI_ANNUALLY" }, { label: 'Annually', value: "ANNUALLY" }]}
                                                />
                                            </FormControl>
                                        </div>
                                        <div className='col-sm-10 flex-row padding-0'>
                                            <div className='col-sm-8'>
                                                <FormControl margin="normal" required fullWidth>
                                                    <Field
                                                        label='Principal Grace Period'
                                                        name='principalRepaymentTimeValue'
                                                        component={GlobalTextField}
                                                    />
                                                </FormControl>
                                            </div>
                                            <div className='col-sm-4'>
                                                <FormControl margin="normal" required fullWidth>
                                                    <Field
                                                        label="Unit"
                                                        name="principalRepaymentTimeUnit"
                                                        component={Select}
                                                        variantType='outlined'
                                                        options={[{ label: 'Day', value: "DAY" }, { label: 'Month', value: 'MONTH' }, { label: 'Year', value: "YEAR" }]}
                                                    />
                                                </FormControl>
                                            </div>
                                        </div>
                                    </div>

                                    <h4 className="pt-30">Interest Repayment Term</h4>
                                    <div className="row">

                                        <div className='col-sm-10'>
                                            <FormControl margin="normal" required fullWidth>
                                                <Field
                                                    label="Interest Repayment Frequency"
                                                    name="interestRepaymentFrequency"
                                                    component={Select}
                                                    variantType='outlined'
                                                    options={[{ label: 'Monthly', value: "MONTHLY" }, { label: 'Quarterly', value: 'QUARTERLY' }, { label: 'Semi Annually', value: "SEMI_ANNUALLY" }, { label: 'Annually', value: "ANNUALLY" }]}
                                                />
                                            </FormControl>
                                        </div>
                                        <div className='col-sm-10 flex-row padding-0'>
                                            <div className='col-sm-8'>
                                                <FormControl margin="normal" required fullWidth>
                                                    <Field
                                                        label='Interest Grace Period'
                                                        name='interestRepaymentTimeValue'
                                                        component={GlobalTextField}
                                                    />
                                                </FormControl>
                                            </div>
                                            <div className='col-sm-4'>
                                                <FormControl margin="normal" required fullWidth>
                                                    <Field
                                                        label="Unit"
                                                        name="interestRepaymentTimeUnit"
                                                        component={Select}
                                                        variantType='outlined'
                                                        options={[{ label: 'Day', value: "DAY" }, { label: 'Month', value: 'MONTH' }, { label: 'Year', value: "YEAR" }]}
                                                    />
                                                </FormControl>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-sm-4'>
                                <div className="details-block">
                                    <PreviewForm
                                        SaveOfferLoading = {this.state.SaveOfferLoading}
                                        MakeOfferLoading = {this.state.MakeOfferLoading}
                                        offerId={_get(this, 'props.offer.offerId')}
                                        saveLoanDetails={
                                            this.props.handleSubmit(this.saveLoanDetails)
                                        }
                                        submitLoanDetails={
                                            this.props.handleSubmit(this.submitLoanDetails)
                                        }
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

Loan = reduxForm({
    form: 'createLoanRequest',
    enableReinitialize: true,
    keepDirtyOnReinitialize: true
})(Loan);

function mapStateToProps(state) {

    let workingCapital = false;
    let capitalExpense = false;
    let refinancing = false;
    let otherPurpose = '';
    let workingCapitalPecentage;
    let capitalExpensePecentage;
    let refinancingPecentage;
    let Smb = _get(state, 'FundDataById.lookUpData.smb', '');
    let smbId = Smb.substr(Smb.indexOf("#") + 1);

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
        currencyList: _get(state, 'Currency.lookUpData', []),
        fundId: _get(state, 'staticReducers.fund.reqId'),
        loanId: _get(state, 'FundDataById.lookUpData.id'),
        offer: _get(state, 'staticReducers.offer'),
        investorId: _get(state, 'BasicInfo.lookUpData.company.id', ''),
        smeId: smbId,
        
    }

}

export default connect(mapStateToProps)(Loan);