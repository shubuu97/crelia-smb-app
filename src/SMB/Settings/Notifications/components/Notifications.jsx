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
                    <span>E-MAIL NOTIFICATIONS</span>
                    <Switch name="" onChange={this.handleEmailNotificationsSwitch} />
                </div>
                <div className="switch-notification-text">
                    <p>Enable e-mail notifications to receive notifications on e-mail.</p>
                </div>
                {
                    this.state.showNotifications ?
                        <div>
                            <div>
                                <div className="flex-row align-center">
                                    <span>MY REQUEST STATUS NOTIFICATIONS</span>
                                    <Switch name="" />
                                </div>
                                <div className="switch-notification-text">
                                    <p>Enable request status notifications to receive notifications on e-mail.</p>
                                </div>
                            </div>
                            <div>
                                <div className="flex-row align-center">
                                    <span>PROFILE UPDATE NOTIFICATIONS</span>
                                    <Switch name="" />
                                </div>
                                <div className="switch-notification-text">
                                    <p>Enable profile update notifications to receive notifications on e-mail.</p>
                                </div>
                            </div>
                            <div>
                                <div className="flex-row align-center">
                                    <span>OFFER STATUS NOTIFICATIONS</span>
                                    <Switch name="" />
                                </div>
                                <div className="switch-notification-text">
                                    <p>Enable offer status notifications to receive notifications on e-mail.</p>
                                </div>
                            </div>
                        </div> : ''
                }
            </div>
        )
    }
}

export default Notifications;