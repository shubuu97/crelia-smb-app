import React, { Component } from 'react';
/* Material Imports*/
import { Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
/* Assets Imports*/
import imgsecure from '../../Assets/images/secure.png';
import imgquestion from '../../Assets/images/question.png';


class Help extends React.Component {
    render() {
        const { activeStep } = this.props;
        return (
            <div >
                <div className="info-secure">
                    <div className="block-a"><div className="msgicon"><img src={imgsecure} /></div></div>
                    <div className="block-b">
                        <h4>Information Secured</h4>
                        <p>All the information provided will be kept strictly confidential</p>
                    </div>
                </div>

                <div className="questions">
                    <div className="block-a"><div className="msgicon"><img src={imgquestion} /></div></div>
                    <div className="block-b">
                        <h4>Any Questions?</h4>
                        <p>We are here to help answer your questions or take your application over the phone:
                        <span>(800) 435-7376</span>
                        </p>
                        <div className="contact-block">
                            <div className="contact-block-a"><i class="material-icons">mail_outline</i> Email Support</div>
                            <div className="contact-block-b"><i class="material-icons">chat_bubble_outline</i> Live Chat</div>
                        </div>
                    </div>
                </div>
                <div className="request-assistance">
                    <Card>
                        <CardContent>
                            <Typography
                                component="h6"
                                variant="title"
                                gutterBottom
                            >
                                Need help getting through this step?
                                 </Typography>
                            <div className="row justify-content-center pt-15 pb-15">

                                <Button className="btnprimary" color='primary' variant='outlined' size="large">Request Assistance</Button>

                            </div>
                            <Typography>
                                Our specialist will contact you at your convenience
                                </Typography>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }
}

export default Help;