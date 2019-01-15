import React, {Component} from 'react';
import SideBar from '../../Global/SideBar/SideBar';
import ChangePassword from './ChangePassword/ChangePasswordContainer';
import MyProfile from './MyProfile/MyProfileContainer';
import Notifications from './Notifications/NotificationsContainer';
import Task from './Task/TaskContainer';

class SettingsContainer extends Component {

    sideBarData = [
        {label: "Privacy", path: "/settings", component: Task},
        {label: "Notifications", path: "/notifications", component: Notifications},
        {label: "My Profile", path: "/myProfile", component: MyProfile},
        {label: "ChangePassword", path: "/changePassword", component: ChangePassword}
    ]

    render() {
        return (
            <SideBar 
                data = {this.sideBarData}
            />
        )
    }
}

export default SettingsContainer;
