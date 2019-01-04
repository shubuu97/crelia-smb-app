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
import LoaderButton from '../../Global/Components/LoaderButton';


//Data fetching imported from common
import genericPostData from '../../Global/dataFetch/genericPostData';
import GlobalRadio from '../../Global/Components/Radio';
//side component for preview and submit
import PreviewFormEquity from './components/PreviewFormEquity';

import { commonActionCreater } from '../../Redux/commonAction';
import { APPLICATION_BFF_URL } from '../../Redux/urlConstants';
import { getData } from '../../Redux/getAction';
import genericGetData from '../../Global/dataFetch/genericGetData';



//Lodash import 
import _get from 'lodash/get';
import _find from 'lodash/find'



class Equity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            workingCapital: false,
            loadingSave: false
        }
    }
    componentDidMount() {
        debugger;
        this.getApiCall('reference-service/allowedCurrencies', 'currency');
        let urlToHit = 'EquityOffer';
        let idToSend = _get(this.props, 'offer.offerId') ? _get(this.props, 'offer.offerId') : _get(this.props, 'fundId') ? _get(this.props, 'fundId') : null;
        if (idToSend) {
            this.getApiCall(`api/${urlToHit}/${encodeURIComponent(idToSend)}`, 'fundDataById').then(data => {

                this.props.autofill('currency', _get(data, 'money.currency', ''));
                this.props.autofill('amount', formatMoney(_get(data, 'money.amount', '')));
                this.props.autofill('lowerValue', _get(data, 'lowerValue', ''));
                this.props.autofill('upperValue', _get(data, 'upperValue', ''));

                _get(data, 'fundAllocation', []).map((Allocation, index) => {
                    if (Allocation.purpose == 'Expansion') {
                        this.props.autofill('expansion', true);
                        this.props.autofill('expansionPecentage', _get(Allocation, 'percentage', ''));
                    }
                    if (Allocation.purpose == 'Recapitalization') {
                        this.props.autofill('recapitalization', true);
                        this.props.autofill('recapitalizationPecentage', _get(Allocation, 'percentage', ''));
                    }
                    if (Allocation.purpose !== 'Expansion' &&
                        Allocation.purpose !== 'Recapitalization') {
                        this.props.autofill('otherPurpose', _get(Allocation, 'percentage', ''));
                    }
                })

                this.props.autofill('safeDiscount', _get(data, 'safeDiscount', ''));
                this.props.autofill('safeMarketCap', _get(data, 'safeMarketCap', ''));
                this.props.autofill('comment', _get(data, 'comment', ''));

                if (data.isNationAgreement) {
                    this.props.autofill('isNationAgreement', 'yes');
                } else {
                    this.props.autofill('isNationAgreement', 'no');
                }
                if (data.isBoardMembership) {
                    this.props.autofill('isBoardMembership', 'yes');
                } else {
                    this.props.autofill('isBoardMembership', 'no');
                }
                if (data.isSafeOffering) {
                    this.props.autofill('notSureRange', true);
                    this.props.autofill('isSafeOffering', 'yes');
                } else {
                    this.props.autofill('isSafeOffering', 'no');
                }

                const companyId = _get(data, 'smb', '') ? _get(data, 'smb', '').split('#')[1] : '';
                this.setState({ smbCompanyId: companyId });


                this.props.autofill('timeFrame', data.timeFrame.split('T')[0], '');


            }).catch(err => {
            });
        }
        // else {
        //     this.props.history.push({ pathname: "/loans/request" });
        // }

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
   makeReqObj = (values)=>
   {
    let reqObj = {};
    reqObj.companyId = this.props.companyId;
    reqObj.equityId = _get(this.props,'match.params.equityId')
    reqObj.id =  this.props.fundId ? this.props.fundId : '';
    reqObj.timeFrame = values.timeFrame;

    reqObj.fundAllocation = [];
    values.money = {};

    reqObj.equityType = "COMMON";
    reqObj.lowerValue = _get(values, 'lowerValues', 0);
    reqObj.upperValue = _get(values, 'upperValue', 0);
    reqObj.comment = _get(values, 'comment', '');

    //logic to denormalize money
    if (values.amount) {
        debugger;
        values.money.amount = deformatMoney(_get(values, 'amount', 0));
    }
    values.money.currency = _get(values, 'currency', '');
    reqObj.money = values.money;

    reqObj.safeDiscount = values.safeDiscount;
    reqObj.safeMarketCap = values.safeMarketCap;
    if (values.isSafeOffering === 'yes') {
        reqObj.isSafeOffering = true;
    }
    if (values.isNationAgreement === 'yes') {
        reqObj.isNationAgreement = true;
    }
    if (values.isBoardMembership === 'yes') {
        reqObj.isBoardMembership = true;
    }


    // logic to add fundallocation array
    if (values.expansionPecentage) {
        reqObj.fundAllocation.push({ purpose: 'Expansion', percentage: parseInt(values.expansionPecentage) })
    }
    if (values.recapitalizationPecentage) {
        reqObj.fundAllocation.push({ purpose: 'Recapitalization', percentage: parseInt(values.recapitalizationPecentage) })
    }
    if (values.otherPurpose) {
        reqObj.fundAllocation.push({ purpose: values.otherPurpose, percentage: 100 })
    }
    return reqObj;
   }

    submitLoanDetails = (values) => {
        this.setState({ loadingSave: true });
        let reqObj = this.makeReqObj(values);
        //logic end here

        genericPostData({
            dispatch: this.props.dispatch,
            url: `/api/NegotiateEquityOffer`,
            identifier: 'equity-post',
            successText: 'Equity Saved Succesfully',
            reqObj,
            constants: {
                init: 'create_equity_init',
                success: 'create_equity_success',
                error: 'create_equity_error'
            },
            successCb: ()=>this.setState({loadingSave:false}),
            errorCb: (err) => this.setState({ loadingSave: false })
        })

    }


    handleNotSure = (name, b) => {
        this.handleCheck('notSureRange', b);
        this.props.autofill('lowerValue', '');
        this.props.autofill('upperValue', '')
    }

    submitOfferDetails = (values) => {

        let reqObj = this.makeReqObj(values);
        this.setState({ loadingOfferSave: true });
        genericPostData({
            dispatch: this.props.dispatch, url: '/api/SendEquityOffer',
            identifier: 'send_offer',
            successText: 'Offer Sent Sucessfully',
            reqObj,
            constants: {
                init: 'send_offer_init',
                success: 'send_offer_success',
                error: 'send_offer_error'
            },
            successCb: () => this.setState({ loadingOfferSave: false }),
            errorCb: () => this.setState({ loadingOfferSave: false })
        })

    }

    render() {
        let { handleSubmit } = this.props;
        return (
            <div className="user-table-section loan-request">
                <form>
                    <div className="row align-items-center">
                        <div className="col-sm-6 ">
                            <h1>Negotiate Loan Offer</h1>
                        </div>
                        <div className="col-sm-6 d-flex justify-content-end "></div>
                    </div>
                    <div className="cardwrapper">
                        <div className="row">
                            <div className="col-sm-8">


                                <div className="row">
                                    <div className='col-sm-6'>
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
                                    <div className='col-sm-6'>
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
                                {/* Needs css changes here */}
                                <div className="pt-20">
                                    <div className="onboarding-sub-title">
                                        What percentage range are you offering for this amount?
                                    </div>
                                    <div className="row align-items-center">
                                        <div class="col-sm-3">
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
                                        <div class="col-sm-3">
                                            <FormControl margin="normal" required fullWidth>
                                                <Field
                                                    label="Range To"
                                                    onChange={() => this.props.autofill('notSureRange', false)}
                                                    name="upperValue"
                                                    component={GlobalTextField}
                                                    fullWidth={true}
                                                    normalize={formatMoney}
                                                />
                                            </FormControl>
                                        </div>
                                        <div class="col-sm-1"><span class="or">or</span></div>
                                        <div class="col-sm-5">
                                            <FormControl margin="normal" required fullWidth>
                                                <Field
                                                    label='Not Sure'
                                                    onChange={this.handleNotSure}
                                                    name='notSureRange'
                                                    color='primary'
                                                    component={GlobalCheckBox}
                                                />
                                            </FormControl>
                                        </div>
                                    </div>
                                </div>


                                <div className="row pt-15">
                                    <div className="col-sm-12">
                                        {_get(this.props, 'formValues.notSureRange', false) ?
                                            <FormControl margin="normal" required fullWidth>
                                                <div className="onboarding-sub-title">
                                                    Do you want to offer a SAFE (Simple Agreement for Future Equity)?
                                                </div>
                                                <Field
                                                    // label='Do you want to offer a SAFE (Simple Agreement for Future Equity)?'
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
                                    _get(this.props, 'formValues.isSafeOffering', 'no') === 'yes' &&
                                        _get(this.props, 'formValues.notSureRange', false) ?
                                        <div>
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <FormControl margin="normal" required fullWidth>
                                                        <Field
                                                            label="What discount are you willing to offer?"
                                                            name="safeDiscount"
                                                            component={GlobalTextField}
                                                            fullWidth={true}
                                                            normalize={formatMoney}
                                                        />
                                                    </FormControl>
                                                </div>
                                                <div className="col-sm-6">
                                                    <FormControl margin="normal" required fullWidth>
                                                        <Field
                                                            label="What market cap are you willing to commit to?"
                                                            name="safeMarketCap"
                                                            component={GlobalTextField}
                                                            fullWidth={true}
                                                            normalize={formatMoney}
                                                        />
                                                    </FormControl>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <FormControl margin="normal" required fullWidth>
                                                        <div className="onboarding-sub-title">
                                                            Are you willing to offer most favored nation agreement?
                                                         </div>
                                                        <Field
                                                            // label='Are you willing to offer most favored nation agreement?'
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
                                        {_get(this.props, 'formValues.upperValue', 0) > 10 ?
                                            <FormControl margin="normal" required fullWidth>
                                                <div className="onboarding-sub-title">
                                                    Are you willing to offer board membership to lead investor?
                                                </div>
                                                <Field
                                                    // label='Are you willing to offer Board Membership to lead investor?'
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
                                <div className="pt-10">
                                    <div className="onboarding-sub-title">
                                        Use of Funds
                                </div>
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <FormControl margin="normal" required fullWidth>
                                                <Field
                                                    id='expansion'
                                                    label='Expansion'
                                                    name='expansion'
                                                    color='primary'
                                                    component={GlobalCheckBox}
                                                    onChange={(e, value) => this.handleCheck('expansionPecentage', value)}
                                                />
                                            </FormControl>
                                        </div>
                                        <div className="col-sm-3">
                                            {
                                                _get(this.props, 'formValues.expansion', false) ?
                                                    <FormControl margin="normal" required fullWidth>
                                                        <Field
                                                            label='Part of loan (%)'
                                                            id='expansionPecentage'
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
                                </div>
                                <div className="row">
                                    <div className="col-sm-3">
                                        <FormControl margin="normal" required fullWidth>
                                            <Field
                                                label='Recapitalization'
                                                name='recapitalization'
                                                id='recapitalization'
                                                color='primary'
                                                component={GlobalCheckBox}
                                                onChange={(e, value) => this.handleCheck('recapitalizationPecentage', value)}
                                            />
                                        </FormControl>
                                    </div>
                                    <div className="col-sm-3">
                                        {
                                            _get(this.props, 'formValues.recapitalization', false) ?
                                                <FormControl margin="normal" required fullWidth>
                                                    <Field
                                                        label='Part of loan (%)'
                                                        name='recapitalizationPecentage'
                                                        id='recapitalizationPecentage'
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
                                    <div className='col-sm-6'>
                                        <FormControl margin="normal" required fullWidth>
                                            <Field
                                                label='Other purpose..'
                                                name='otherPurpose'
                                                component={GlobalTextField}
                                                fullWidth={true}
                                            />
                                        </FormControl>
                                    </div>
                                    <div className='col-sm-6'>
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
                                <div className="row">
                                    <div className="col-sm-12">
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
                            <div className="col-sm-4">
                                <div className="details-block">
                                    <PreviewFormEquity
                                        formValues={this.props.formValues}
                                    />
                                    <LoaderButton
                                        onClick={handleSubmit(this.submitLoanDetails)}
                                        isFetching={this.state.loadingSave}
                                        color='primary'
                                        className="full-width-btn btnprimary mt-30"
                                        variant='contained'>Negotiate Offer
                                        </LoaderButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

Equity = reduxForm({
    form: 'createLoanRequest',
    enableReinitialize: true,
    keepDirtyOnReinitialize: true
})(Equity);

function mapStateToProps(state) {
    let companyId = _get(state, 'BasicInfo.lookUpData.company.id', '');


    return {
        companyId,
        currencyList: _get(state, 'currency.lookUpData', []),
        formValues: getFormValues('createLoanRequest')(state),
        offer: _get(state, 'staticReducers.offer'),
        fundId: _get(state, 'staticReducers.fund.reqId'),

    }

}

export default connect(mapStateToProps)(Equity);