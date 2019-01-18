import React, { Component } from 'react';
import Switch from '../../../../Global/Components/switchControl';
import { postData } from '../../../../Redux/postAction';
import {APPLICATION_BFF_URL} from '../../../../Redux/urlConstants';
import showMessage from '../../../../Redux/toastAction';

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

    handleFundRequestNotification = () => {
        let reqBody = {
            preference: 'FUND'
        }
        this.setState({ onFundRequestNotification: !this.state.onFundRequestNotification })
        if(this.state.onFundRequestNotification) {
            this.props.dispatch(
                postData(`${APPLICATION_BFF_URL}/AddToNotificationPreferences`, reqBody, 'fund-request-notification-preference', {
                    init: 'fundReq_notification_init',
                    success: 'fundReq_notification_success',
                    error: 'fundReq_notification_error'
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
        }
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

                                    <Switch name="" onChange={this.handleFundRequestNotification} />
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
                                    <Switch name="" onChange={this.nothing} />
                                </div>
                            </div>
                            <div>
                                <div className="flex-row align-center">
                                    <div className='flex-column sub-heading'>
                                        <span className='other-switch'>Company Profile</span>
                                        <span className='helper-text'>Enable to receive notifications about company profile updates.</span>
                                    </div>
                                    <Switch name="" onChange={this.nothing} />
                                </div>
                            </div>
                            <div>
                                <div className="flex-row align-center">
                                    <div className='flex-column sub-heading'>
                                        <span className='other-switch'>My Profile</span>
                                        <span className='helper-text'>Enable to receive notifications about your profile updates.</span>
                                    </div>
                                    <Switch name="" onChange={this.nothing} />
                                </div>
                            </div>
                        </div> : ''
                }
            </div>
        )
    }
}

export default Notifications;