import React, {Component} from 'react';
import SideBar from '../../Global/SideBar/sideBar';
import ChangePassword from './ChangePassword/ChangePasswordContainer';
import MyProfile from './MyProfile/MyProfileContainer';
import Notifications from './Notifications/NotificationsContainer';
import Task from './Task/TaskContainer';

class SettingsContainer extends Component {

    sideBarData = [
        {label: "Privacy", component: Task, path: 'privacy'},
        {label: "Notifications", component: Notifications, path: 'notifications'},
        {label: "My Profile", component: MyProfile, path: 'myProfile'},
        {label: "ChangePassword", component: ChangePassword, path: 'changePassword'}
    ]

    render() {
        return (
            <div>
                <div className="title-btn ">
                    <h1>Settings</h1>
                </div>
                <SideBar history = {this.props.history} data = {this.sideBarData} />
            </div>
        )
    }
}

export default SettingsContainer;
