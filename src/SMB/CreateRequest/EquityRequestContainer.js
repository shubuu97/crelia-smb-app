import React, { Component } from 'react';

//Redux and Redux-form imports
import { Field, reduxForm, getFormValues, FormSection } from 'redux-form';
import { connect } from 'react-redux';

//Global and material ui imports
import GlobalTextField from '../../Global/Components/GlobalTextField';
import formatMoney from '../../Global/Components/normalizingMoneyField';
import deformatMoney from '../../Global/Components/denormalizingMoney'
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper';


import Select from '../../Global/Components/Select';
import GlobalCheckBox from '../../Global/Components/GlobalCheckBox';

//Data fetching imported from common
import genericPostData from '../../Global/dataFetch/genericPostData';
import GlobalRadio from '../../Global/Components/Radio';
//side component for preview and submit
import PreviewForm from './components/PreviewForm';

import { commonActionCreater } from '../../Redux/commonAction';
import { APPLICATION_BFF_URL } from '../../Redux/urlConstants';
import { getData } from '../../Redux/getAction';
import genericGetData from '../../Global/dataFetch/genericGetData';



//Lodash import 
import _get from 'lodash/get';
import _find from 'lodash/find'



class EquityRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            workingCapital: false
        }
    }
    componentDidMount() {
        this.getApiCall('reference-service/allowedCurrencies', 'allowedCurrencies');
        if (this.props.fundId) {
            this.getApiCall(`api/Loan/${encodeURIComponent(this.props.fundId)}`, 'fundDataById').then(data => {
                this.props.autofill('moneyRange', data.moneyRange);
                this.props.autofill('interestRate', data.interestRate);
                this.props.autofill('term', data.term);
                this.props.autofill('timeFrame', data.timeFrame.split('T')[0]);


                _get(data, 'fundAllocation', []).map((Allocation) => {
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
        }

    }
    componentWillUnmount() {
        this.props.dispatch(commonActionCreater({
            reqID: null
        }, 'SAVE_FUND_REQ_ID'));
    }

    getApiCall = (url, identifier) => {
        return this.props.dispatch(getData(`${APPLICATION_BFF_URL}/${url}`, identifier, {
            init: `${identifier}_init`,
            success: `${identifier}_success`,
            error: `${identifier}_error`
        }))
    }

    //logic to remove value from form
    handleCheck = (name, b) => {
        if (b == false) {
            this.props.change(name, null);
        }
    }

    submitLoanDetails = (values) => {
        console.log(values, "values is here");
        let reqObj = {};
        reqObj.companyId = this.props.companyId;
        reqObj.lowerValue = _get(values,'lowerValue');
        reqObj.upperValue =  _get(values,'upperValue');
        reqObj.fundAllocation = [];
        reqObj.comment = values.comment;
        reqObj.equityType = "COMMON";
        reqObj.isSafeOffering = values.isSafeOffering;


        //logic to denormalize money
        if (values.money) {
            values.money.currency = _get(values, 'money.currency');
            values.money.amount = deformatMoney(_get(values, 'money.amount', 0));
        }
        //end
        reqObj.money = values.money;


        // logic to add fundallocation array
        if (values.expansionPecentage) {
            reqObj.fundAllocation.push({ purpose: 'Expansion', percentage: parseInt(values.expansionPecentage) })
        }
        if (values.recapitalizationPecentage) {
            reqObj.fundAllocation.push({ purpose: 'Recapitalization', percentage: parseInt(values.recapitalizationPecentage) })
        }
        //logic end here

        genericPostData({
            dispatch: this.props.dispatch, url: `/api/SaveEquity`,
            identifier: 'loan-post', successText: 'Loan Saved Succesfully', reqObj,
            constants: {
                init: 'create_loan_init',
                success: 'create_loan_success',
                error: 'create_loan_error'
            }
        })

    }
    render() {
        let { handleSubmit } = this.props;
        return (
            <div className="loan-request">
                <form onSubmit={handleSubmit(this.submitLoanDetails)}>
                    <div className="row">
                        <div className="col-sm-12">
                            <span>
                                <h1>Equity Request</h1>
                                <Button type="submit" color='primary' variant='contained'>Submit</Button>
                            </span>
                            <div >
                                <FormSection name='money'>
                                <div className="row">
                                    <div className='col-sm-4'>
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
                                    <div className='col-sm-4'>
                                        <FormControl margin="normal" required fullWidth>
                                            <Field
                                                label='Amount'
                                                name='amount'
                                                component={GlobalTextField}
                                                fullWidth={true}
                                                normalize={formatMoney}
                                            />
                                        </FormControl>
                                    </div>
                                </div>
                                </FormSection>

                                {/* Needs css changes here */}
                                <br />
                                <div className="onboarding-sub-title">
                                    What percentage range are you offering for this amount?
                                </div>
                                <div className="row">
                                    <div class="col-sm-4">
                                        <FormControl margin="normal" required fullWidth>
                                            <Field
                                                label="Range From"
                                                name="lowerValue"
                                                component={GlobalTextField}
                                                fullWidth={true}
                                                normalize={formatMoney}
                                                placeholder='from'
                                            />
                                        </FormControl>
                                    </div>
                                    <div class="col-sm-4">
                                        <FormControl margin="normal" required fullWidth>
                                            <Field
                                                label="Range To"
                                                name="upperValue"
                                                component={GlobalTextField}
                                                fullWidth={true}
                                                normalize={formatMoney}
                                            />
                                        </FormControl>
                                    </div>
                                    <div class="col-sm-4">
                                        <FormControl margin="normal" required fullWidth>
                                            <Field
                                                label='Not Sure'
                                                name='notSureRange'
                                                color='primary'
                                                component={GlobalCheckBox}
                                            />
                                        </FormControl>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-8">
                                        {_get(this.props, 'formValues.notSureRange', false) ?
                                            <FormControl margin="normal" required fullWidth>
                                                <Field
                                                    label='Do you want to offer a SAFE (Simple Agreement for Future Equity)?'
                                                    name='isSafeOffering'
                                                    color='primary'
                                                    component={GlobalRadio}
                                                    radioList={[
                                                        { label: 'Yes', value: 'yes' },
                                                        { label: 'No', value: 'no' },
                                                        { label: 'Not Sure', value: 'notSure' }
                                                    ]}
                                                />
                                            </FormControl> : null
                                        }
                                    </div>
                                </div>


                                {
                                    _get(this.props, 'formValues.safeOffer', 'no') === 'yes' ?
                                        <div>
                                            <div className="row">
                                                <div className="col-sm-4">
                                                    <FormControl margin="normal" required fullWidth>
                                                        <Field
                                                            label="What discount you are willing to offer?"
                                                            name="safeDiscount"
                                                            component={GlobalTextField}
                                                            fullWidth={true}
                                                            normalize={formatMoney}
                                                        />
                                                    </FormControl>
                                                </div>
                                                <div className="col-sm-4">
                                                    <FormControl margin="normal" required fullWidth>
                                                        <Field
                                                            label="What market cap you are you willing to commit to?"
                                                            name="safeMarketCap"
                                                            component={GlobalTextField}
                                                            fullWidth={true}
                                                            normalize={formatMoney}
                                                        />
                                                    </FormControl>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <FormControl margin="normal" required fullWidth>
                                                        <Field
                                                            label='Are you willing to offer most favored nation agreement?'
                                                            name='isNationAgreement'
                                                            color='primary'
                                                            component={GlobalRadio}
                                                            radioList={[
                                                                { label: 'Yes', value: 'yes' },
                                                                { label: 'No', value: 'no' },
                                                            ]}
                                                        />
                                                    </FormControl>
                                                </div>
                                            </div>
                                        </div> : null
                                }

                                <div className="row">
                                    <div className="col-sm-8">
                                        {_get(this.props, 'formValues.upperValueValue', 0) > 10 ?
                                            <FormControl margin="normal" required fullWidth>
                                                <Field
                                                    label='Are you willing to offer Board Membership to lead investor?'
                                                    name='isBoardMembership'
                                                    color='primary'
                                                    component={GlobalRadio}
                                                    radioList={[
                                                        { label: 'Yes', value: 'yes' },
                                                        { label: 'No', value: 'no' },
                                                    ]}
                                                />
                                            </FormControl> : null
                                        }
                                    </div>
                                </div>

                                <h5>Use Of Funds</h5>
                                <div className="row">
                                    <div className="col-sm-2">
                                        <FormControl margin="normal" required fullWidth>
                                            <Field
                                                label='Expansion'
                                                name='expansion'
                                                color='primary'
                                                component={GlobalCheckBox}
                                                onChange={(e, value) => this.handleCheck('expansionPecentage', value)}
                                            />
                                        </FormControl>
                                    </div>
                                    <div className="col-sm-4">
                                        {
                                            _get(this.props, 'formValues.expansion', false) ?
                                                <FormControl margin="normal" required fullWidth>
                                                    <Field
                                                        label='Part of loan (%)'
                                                        name='expansionPecentage'
                                                        component={GlobalTextField}
                                                        fullWidth={true}
                                                        normalize={formatMoney}
                                                        endAdornment="%"
                                                    />
                                                </FormControl> : null
                                        }
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-2">
                                        <FormControl margin="normal" required fullWidth>
                                            <Field
                                                label='Recapitalization'
                                                name='recapitalization'
                                                color='primary'
                                                component={GlobalCheckBox}
                                                onChange={(e, value) => this.handleCheck('recapitalizationPecentage', value)}
                                            />
                                        </FormControl>
                                    </div>
                                    <div className="col-sm-4">
                                        {
                                            _get(this.props, 'formValues.recapitalization', false) ?
                                                <FormControl margin="normal" required fullWidth>
                                                    <Field
                                                        label='Part of loan (%)'
                                                        name='recapitalizationPecentage'
                                                        component={GlobalTextField}
                                                        fullWidth={true}
                                                        normalize={formatMoney}
                                                        endAdornment="%"
                                                    />

                                                </FormControl> : null
                                        }
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-8">
                                        <FormControl margin="normal" required fullWidth>
                                            <Field
                                                label="Please describe your equity offering in your own words."
                                                name="comment"
                                                component={GlobalTextField}
                                                fullWidth={true}
                                            />
                                        </FormControl>
                                    </div>
                                </div>


                            </div>
                        </div >
                    </div >
                </form >
            </div >
        )
    }
}

EquityRequest = reduxForm({
    form: 'createLoanRequest',
    enableReinitialize: true,
    keepDirtyOnReinitialize: true
})(EquityRequest);

function mapStateToProps(state) {
    let companyId = _get(state, 'BasicInfo.lookUpData.companyDetails.id', '');


    return {
        companyId,
        currencyList: _get(state, 'currency.lookUpData', []),
        formValues: getFormValues('createLoanRequest')(state),
        fundId: _get(state, 'CommonData.fund.reqID', ''),
    }

}

export default connect(mapStateToProps)(EquityRequest);