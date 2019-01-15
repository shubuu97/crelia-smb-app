import React, { Component } from 'react';
import _get from 'lodash/get';

/* Material Imports*/
import Button from '@material-ui/core/Button';
/* Style Imports*/
import './styles/cardNotification.less'
/* Components Imports*/
import EachRow from './features/EachRow'
/* Images */
import profile1 from './images/profile1.jpg'
import profile2 from './images/profile2.jpg'
import profile3 from './images/profile3.jpg'
import profile4 from './images/profile4.jpg'

class CardNotification extends Component {

    constructor() {
        super();
        this.state = {
            isExtended: false
        }
    }

    componentDidMount() {

    }

    expandCard = () => {
        this.setState(
            {isExtended: !this.state.isExtended}
        )
    }

    render() {
        return (
            <div className='card-notification-container'>
                {
                    this.props.header ?
                        <div className='card-notification-header'>
                            {this.props.header}
                        </div> :
                        null
                }
                
                <EachRow />
                <EachRow />
                <EachRow />
                <EachRow />

                
            </div>
        )
    }
}

export default CardNotification;