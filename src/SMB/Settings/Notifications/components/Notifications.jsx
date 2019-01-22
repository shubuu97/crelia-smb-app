import React, { Component } from 'react';
import Switch from '@material-ui/core/Switch';
import CircularProgress from '@material-ui/core/CircularProgress'
import { postData } from '../../../../Redux/postAction';
import {APPLICATION_BFF_URL} from '../../../../Redux/urlConstants';
import showMessage from '../../../../Redux/toastAction';
import {connect} from 'react-redux';

class Notifications extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showNotifications: false,
            FUND: {on: false, isFetching: false},
            OFFER: false,
            COMPANY_PROFILE: false,
            MY_PROFILE: false,
            isFetchingFund: false,
            isFetchingOffer: false,
            isFetchingCompanyProfile: false,
            isFetchingMyProfile: false
        }
    }

    handleEmailNotificationsSwitch = () => {
        this.setState({
            showNotifications: !this.state.showNotifications
        })
    }

    handleNotificationPreference = name => event => {
        this.setState({[name] : {on: event.target.checked, isFetching: true}})
        let reqBody = {
            preference: name
        }
        let preferenceName = event.target.name
        let eventChecked = event.target.checked
        if(event.target.checked) {
            this.props.dispatch(
                postData(`${APPLICATION_BFF_URL}/api/AddToNotificationPreferences`, reqBody, 'add-request-notification-preference', {
                    init: 'add_notification_init',
                    success: 'add_notification_success',
                    error: 'add_notification_error'
                })
            ).then(data => {
                this.setState({[data.preference] : {on: eventChecked, isFetching: false}})
                this.props.dispatch(showMessage({
                    text: `${preferenceName} request notification successfully set`, isSuccess: true
                }))
                setTimeout(() => {
                    this.props.dispatch(showMessage({}));  
                }, 6000)
            }).catch(error => {
                console.log(error, 'errormsg')
                this.setState({[reqBody.preference] : {on: eventChecked, isFetching: false}})
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
                    init: 'remove_notification_init',
                    success: 'remove_notification_success',
                    error: 'remove_notification_error'
                })
            ).then(data => {
                this.setState({[data.preference] : {on: eventChecked, isFetching: false}})
                this.props.dispatch(showMessage({
                    text: `${preferenceName} request notification successfully cancelled`, isSuccess: true
                }))
                setTimeout(() => {
                    this.props.dispatch(showMessage({}));  
                }, 6000)
            }).catch(error => {
                this.setState({[reqBody.preference] : {on: eventChecked, isFetching: false}})
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

                                    <Switch 
                                        checked={this.state.FUND.on} 
                                        name="Fund" 
                                        value="FUND"
                                        onChange={this.handleNotificationPreference('FUND')}
                                        disabled={this.state.FUND.isFetching} 
                                    />
                                    {this.state.FUND.isFetching && <CircularProgress color="primary" size={24} /> }
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
                                    <Switch 
                                        checked={this.state.OFFER} 
                                        name="Offer" 
                                        value="OFFER"
                                        onChange={this.handleNotificationPreference('OFFER')} 
                                        disabled={this.state.OFFER.isFetching} 
                                    />
                                    {this.state.OFFER.isFetching && <CircularProgress color="primary" size={24} /> }
                                </div>
                            </div>
                            <div>
                                <div className="flex-row align-center">
                                    <div className='flex-column sub-heading'>
                                        <span className='other-switch'>Company Profile</span>
                                        <span className='helper-text'>Enable to receive notifications about company profile updates.</span>
                                    </div>
                                    <Switch 
                                        checked={this.state.COMPANY_PROFILE} 
                                        name="Company Profile" 
                                        value="COMPANY_PROFILE"
                                        onChange={this.handleNotificationPreference('COMPANY_PROFILE')} 
                                        disabled={this.state.COMPANY_PROFILE.isFetching} 
                                    />
                                    {this.state.COMPANY_PROFILE.isFetching && <CircularProgress color="primary" size={24} /> }
                                </div>
                            </div>
                            <div>
                                <div className="flex-row align-center">
                                    <div className='flex-column sub-heading'>
                                        <span className='other-switch'>My Profile</span>
                                        <span className='helper-text'>Enable to receive notifications about your profile updates.</span>
                                    </div>
                                    <Switch 
                                        checked={this.state.MY_PROFILE} 
                                        name="My Profile" 
                                        value="MY_PROFILE"
                                        onChange={this.handleNotificationPreference('MY_PROFILE')} 
                                        disabled={this.state.MY_PROFILE.isFetching} 
                                    />
                                    {this.state.MY_PROFILE.isFetching && <CircularProgress color="primary" size={24} /> }
                                </div>
                            </div>
                        </div> : ''
                }
            </div>
        )
    }
}

export default connect()(Notifications);