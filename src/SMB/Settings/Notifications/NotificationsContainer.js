import React, {Component} from 'react';
import NotificationComponent from './components/Notifications';

class Notifications extends Component {

    componentWillMount() {
        const listItemData = [
            {path: "settings", name: "Privacy"},
            {path: "notifications", name: " Notifications"},
            {path: "myProfile", name: "My Profile"},
            {path: "changePassword", name: "Change Password"}
        ]
        this.props.listItem(listItemData);
    }
    
    render() {
        return (
            <NotificationComponent />
        )
    }
}

export default Notifications;