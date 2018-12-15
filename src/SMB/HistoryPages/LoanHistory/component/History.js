import React, { Component } from 'react';
import _get from 'lodash/get';
import genericGetData from '../../../../Global/dataFetch/genericGetData';

//Moment to format date and timee
import moment from 'moment';

import ReviewCOBInfoContainer from '../../../CompanyOnBoarding/components/ReviewCOBInfo/ReviewCOBInfoContainer'



export default class History extends Component {


    constructor(props) {
        super(props);
        this.state = {
            openModal: false,
            companyDetails: {}
        }

    }
    
    handleFetchTransaction = () => {
        genericGetData({
            dispatch: this.props.dispatch,
            url: `/api/TransactionHistory/${this.props.ProfileHistory.transactionId}`,
            constant: {
                init: 'TransactionDetails_init',
                success: 'TransactionDetails_success',
                error: 'TransactionDetails_error'
            },
            identifier: 'TransactionDetails'

        }).then((data) => {
            console.log(data, "data")
            this.setState({ openModal: !this.state.openModal, companyDetails: _get(data, 'eventsEmitted[0].company') })
        })
    }

    render() {
        let eventsEmitted = _get(this.props, 'ProfileHistory.eventsEmitted[0]')

        return (
            <div>
                <div className='longCard' onClick={() => this.handleFetchTransaction()}>
                    <div className='event-wrapper'>
                        <div className="wrap-block">
                            <span>Event Name</span>
                            <span>{_get(eventsEmitted, 'eventName')}</span>
                        </div>
                        <div className="wrap-block">
                            <span>Transaction Date</span>
                            <span>{moment(_get(this.props, 'ProfileHistory.transactionTimestamp')).format('DD-MM-YYYY,h:mm:ss a')}</span>
                        </div>
                        <div className="wrap-block">
                            <span>Transaction ID</span>
                            <span>{_get(this.props, 'ProfileHistory.transactionId')}</span>
                        </div>
                    </div>
                    {this.state.openModal ? <ReviewCOBInfoContainer
                    fetchFromProp={true}
                    companyDetailsProp={this.state.companyDetails} /> : null}
                </div>              
            </div>
        )
    }
}