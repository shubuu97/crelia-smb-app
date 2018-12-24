import React, { Component } from 'react';
import _get from 'lodash/get';
import Button from '@material-ui/core/Button'
import LoaderButton from '../../../Global/Components/LoaderButton';
class PreviewForm extends Component {


    render() {
        let formValues = this.props.formValues

        return (
            <div>
                <h4>Summary</h4>
                <div className="block-sub-title pt-10">Amount</div>
                <div className="list-data text-gray">
                    <div>{_get(formValues, 'moneyRange.minAmount')} - {_get(formValues, 'moneyRange.maxAmount')} {_get(formValues, 'moneyRange.currency')}</div>
                    <div><span className="inner-btxt">Desired Rate:</span>  {_get(formValues, 'interestRate')}%  </div>
                </div>
                <div className="block-sub-title pt-30">Purpose of Loan</div>
                <div className="list-data text-gray">
                    <div><span className="inner-btxt">Working Capital:</span> {_get(formValues, 'workingCapitalPecentage')}</div>
                    <div><span className="inner-btxt">Refinancing:</span> {_get(formValues, 'refinancingPecentage')}</div>
                    <div><span className="inner-btxt">Capital Expense:</span> {_get(formValues, 'capitalExpensePecentage')}</div>
                    <div><span className="inner-btxt">Other Purpose:</span> {_get(formValues, 'otherPurpose')}</div>
                </div>
                <div className="block-sub-title pt-30">Loan Term</div>
                <div className="list-data text-gray">
                    <div>{_get(formValues, 'term')} Years</div>
                    <div><span className="inner-btxt">Active till:</span> {_get(formValues, 'timeFrame')}</div>
                </div>
                <LoaderButton onClick={this.props.saveLoanDetails} 
                isFetching = {this.props.SaveOfferLoading}
                color='primary'className="full-width-btn btnprimary mt-30" variant='contained'>Save Offer</LoaderButton>
                <LoaderButton
                 isFetching = {this.props.MakeOfferLoading}
                disabled={!this.props.offerId}
                 onClick={this.props.submitLoanDetails} color='primary' className="full-width-btn btnprimary mt-30" variant='contained'>Make Offer</LoaderButton>
            </div>
        )
    }
}




export default PreviewForm;