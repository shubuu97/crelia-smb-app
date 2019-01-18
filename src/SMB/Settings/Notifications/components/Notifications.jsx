import React, { Component } from 'react';
import Switch from '../../../../Global/Components/switchControl';
import { postData } from '../../../../Redux/postAction';
import {APPLICATION_BFF_URL} from '../../../../Redux/urlConstants';
import showMessage from '../../../../Redux/toastAction';
import {connect} from 'react-redux';

class Notifications extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showNotifications: false,
            onFundRequestNotification: false,
            onOfferNotification: false,
            onCompanyProfileNotification: false,
            onMyProfileNotification: false
        }
    }

    handleEmailNotificationsSwitch = () => {
        this.setState({
            showNotifications: !this.state.showNotifications
        })
    }

    handleNotificationPreference = (emailType, stateName) => {
        let reqBody = {
            preference: emailType
        }
        
        this.setState(() => ({
            stateName: !this.state.stateName
        }), () => {
            if(this.state.onFundRequestNotification) {
                this.props.dispatch(
                    postData(`${APPLICATION_BFF_URL}/api/AddToNotificationPreferences`, reqBody, 'add-fund-request-notification-preference', {
                        init: 'add_fundReq_notification_init',
                        success: 'add_fundReq_notification_success',
                        error: 'add_fundReq_notification_error'
                    })
                ).then(data => {
                    console.log(data, 'fundrequestsuccessdata')
                    this.props.dispatch(showMessage({
                        text: 'Fund Request Notification Successfully set', isSuccess: true
                    }))
                    setTimeout(() => {
                        this.props.dispatch(showMessage({}));  
                    }, 6000)
                }).catch(error => {
                    console.log(error, 'fundrequestfaildata')
                    this.props.dispatch(showMessage({
                        text: error.msg, isSuccess: false
                    }))
                    setTimeout(() => {
                        this.props.dispatch(showMessage({}));  
                    }, 6000)
                })
            } else {
                this.props.dispatch(
                    postData(`${APPLICATION_BFF_URL}/api/RemoveFromNotificationPreferences`, reqBody, 'remove-fund-request-notification-preference', {
                        init: 'remove_fundReq_notification_init',
                        success: 'remove_fundReq_notification_success',
                        error: 'remove_fundReq_notification_error'
                    })
                ).then(data => {
                    console.log(data, 'removefundrequestsuccessdata')
                    this.props.dispatch(showMessage({
                        text: 'Fund Request Notification Successfully Cancelled', isSuccess: true
                    }))
                    setTimeout(() => {
                        this.props.dispatch(showMessage({}));  
                    }, 6000)
                }).catch(error => {
                    console.log(error, 'removedfundrequestfaildata')
                    this.props.dispatch(showMessage({
                        text: error.msg, isSuccess: false
                    }))
                    setTimeout(() => {
                        this.props.dispatch(showMessage({}));  
                    }, 6000)
                })
            }
        })
    }

    render() {
        return (
            <div className="notification-switch">
                <div className="flex-row align-center main-switch">
                    <div className='flex-column email-heading'>
                        <span className='email-switch'>E-Mail Notifications</span>
                        <span className='helper-text'>Enable e-mail notifications to receive notifications.</span>
                    </div>
                    <Switch name="" onChange={this.handleEmailNotificationsSwitch} />
                </div>

                {
                    this.state.showNotifications ?
                        <div className='sub-switches'>
                            <div>
                                <div className="flex-row align-center">
                                    <div className='flex-column sub-heading'>
                                        <span className='other-switch'>Fund Request</span>
                                        <span className='helper-text'>Enable to receive notifications about status updates of your fund requests.</span>
                                    </div>

                                    <Switch name="" onChange={this.handleNotificationPreference('FUND', 'onFundRequestNotification')} />
                                </div>
                                <div className="switch-notification-text">

                                </div>
                            </div>
                            <div>
                                <div className="flex-row align-center">
                                    <div className='flex-column sub-heading'>
                                        <span className='other-switch'>Offer</span>
                                        <span className='helper-text'>Enable to receive notifications whenever you recieve a new offer or status of an offer changes.</span>
                                    </div>
                                    <Switch name="" onChange={this.handleNotificationPreference('OFFER', 'onOfferNotification')} />
                                </div>
                            </div>
                            <div>
                                <div className="flex-row align-center">
                                    <div className='flex-column sub-heading'>
                                        <span className='other-switch'>Company Profile</span>
                                        <span className='helper-text'>Enable to receive notifications about company profile updates.</span>
                                    </div>
                                    <Switch name="" onChange={this.handleNotificationPreference('COMPANY_PROFILE', 'onCompanyProfileNotification')} />
                                </div>
                            </div>
                            <div>
                                <div className="flex-row align-center">
                                    <div className='flex-column sub-heading'>
                                        <span className='other-switch'>My Profile</span>
                                        <span className='helper-text'>Enable to receive notifications about your profile updates.</span>
                                    </div>
                                    <Switch name="" onChange={this.handleNotificationPreference('MY_PROFILE', 'onMyProfileNotification')} />
                                </div>
                            </div>
                        </div> : ''
                }
            </div>
        )
    }
}

export default connect()(Notifications);