import React, { Component } from 'react';
import _get from 'lodash/get';
import genericGetData from '../../../Global/dataFetch/genericGetData';

//Dialogue import 
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import Button from '@material-ui/core/Button';

//Moment to format date and timee
import moment from 'moment';

import ReviewCOBInfoContainer from '../../CompanyOnBoarding/components/ReviewCOBInfo/ReviewCOBInfoContainer'



export default class History extends Component {


    constructor(props) {
        super(props);
        this.state = {
            openModal: false,
            companyDetails:{}
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
            this.setState({ openModal: !this.state.openModal,companyDetails:_get(data,'eventsEmitted[0].company') })
        })
    }

    render() {
        let eventsEmitted = _get(this.props, 'ProfileHistory.eventsEmitted[0]')

        return (
            <div>



                <div className='longCard'
                    onClick={() => this.handleFetchTransaction()}>
                    <span>{_get(eventsEmitted, 'eventName')}</span>
                    <span>{moment(_get(this.props, 'ProfileHistory.transactionTimestamp')).format('DD-MM-YYYY,h:mm:ss a')}</span>
                </div>
                {/* <Dialog
                    open={this.state.openModal}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Preview Your Data and Confirm"}</DialogTitle>
                    <DialogContent>
                        Content will come here
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => this.setState({ openModal: false })}
                            color='primary'
                            variant='outlined'
                        >Close</Button>

                    </DialogActions>
                </Dialog> */}

             {this.state.openModal?<ReviewCOBInfoContainer
             fetchFromProp={true}
             companyDetailsProp={this.state.companyDetails}/>:null}

            </div>

        )
    }

}