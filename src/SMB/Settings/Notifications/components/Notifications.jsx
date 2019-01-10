import React, { Component } from 'react';
import Switch from '../../../../Global/Components/switchControl';

class Notifications extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showNotifications: false
        }
    }

    handleEmailNotificationsSwitch = () => {
        this.setState({
            showNotifications: !this.state.showNotifications
        })
    }

    nothing = () => {

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

                                    <Switch name="" onChange={this.nothing} />
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