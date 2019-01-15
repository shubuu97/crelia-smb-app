import React from 'react';
/* Lodash Imports */
import _get from 'lodash/get';
/* Pose Imports */
import posed from "react-pose";
import { tween } from "popmotion";
/* Material import */

/* Redux Imports */ 

/* Images */
import profile1 from '../images/profile1.jpg'
import profile2 from '../images/profile2.jpg'
import profile3 from '../images/profile3.jpg'
import profile4 from '../images/profile4.jpg'

const itemConfig = {
    open: {
        height: 'auto',
        opacity: 1,
        padding: '15px',
        flip: true
    },
    closed: {
        height: '0',
        opacity: 0,
        padding: 0,
        flip: true
    }
}

const Item = posed.div(itemConfig)


class EachRow extends React.Component {

    constructor() {
        super();
        this.state = {
            isExtended: false
        }
    }

    expandCard = () => {
        this.setState(
            {isExtended: !this.state.isExtended}
        )
    }
    
    render() {
        return (
            <div className='notification-cards '>
                    <div className=' notification-body flex-row flex-space-between' onClick={this.expandCard}>
                        <div className='flex-column card-notification-main'>
                            <div className='notification-card-header-part'>
                                <div className='card-header-task'>Investor requesting Access</div>
                                <div style={{width: '5px',height: '5px',background: 'rgba(0,0,0,0.2)',borderRadius: '50%'}}
                                ></div>
                                <div className='card-header-time'>now</div>
                            </div>
                            <div className='notification-card-body-part'>
                                <div className='body-part-info-area'>
                                    <div className='body-part-title'>
                                        Title
                                        </div>
                                    <div className='body-part-desc'>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                                        </div>
                                </div>
                            </div>
                        </div>
                        <div className='card-notification-icon'>
                            <img className='card-notification-icon-img' src={profile1} />
                        </div>
                    </div>

                    <Item className="notification-actions flex-row item" pose={this.state.isExtended ? 'open' : 'closed'}>
                        <div className='card-actions'>Reply</div>
                        <div className='card-actions'>Lorem Ispum</div>
                    </Item>
                </div>
        );
    }
}

export default EachRow;