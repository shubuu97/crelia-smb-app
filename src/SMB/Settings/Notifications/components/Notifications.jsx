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

    render() {
        return (
            <div className="notification-switch">
                <div className="flex-row align-center">
                    <span><b>E-Mail Notifications</b></span>
                    <Switch name="" onChange={this.handleEmailNotificationsSwitch} />
                </div>
                <div className="switch-notification-text">
                    <p>Enable e-mail notifications to receive notifications.</p>
                </div>
                {
                    this.state.showNotifications ?
                        <div>
                            <div>
                                <div className="flex-row align-center">
                                    <span><b> Loan Request</b></span>
                                    <Switch name="" />
                                </div>
                                <div className="switch-notification-text">
                                    <p>Enable to receive notifications about request updates.</p>
                                </div>
                            </div>
                            <div>
                                <div className="flex-row align-center">
                                    <span><b>Offer</b></span>
                                    <Switch name="" />
                                </div>
                                <div className="switch-notification-text">
                                    <p>Enable to receive notifications about offer updates.</p>
                                </div>
                            </div>
                            <div>
                                <div className="flex-row align-center">
                                    <span><b>Company Profile</b></span>
                                    <Switch name="" />
                                </div>
                                <div className="switch-notification-text">
                                    <p>Enable to receive notifications about company profile updates.</p>
                                </div>
                            </div>
                            <div>
                                <div className="flex-row align-center">
                                    <span><b>My Profile</b></span>
                                    <Switch name="" />
                                </div>
                                <div className="switch-notification-text">
                                    <p>Enable to receive notifications about your profile updates.</p>
                                </div>
                            </div>
                        </div> : ''
                }
            </div>
        )
    }
}

export default Notifications;