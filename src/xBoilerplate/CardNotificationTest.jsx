import React from 'react';
/* Lodash Imports */
import _get from 'lodash/get';
/* Material import */

/* Redux Imports */ 

/* Component Imports */
import CardNotification from '../Global/Components/CardNotification/CardNotification'

// Todo : Dummy Data Structure
// Todo : 

class CardNotificationTest extends React.Component {

    constructor(){
        super();
        this.state = {
            
        }
    }
    
    render() {
        return (
            <div>
                <CardNotification
                    header='Notifications'
                />
            </div>
        );
    }
}

export default CardNotificationTest;