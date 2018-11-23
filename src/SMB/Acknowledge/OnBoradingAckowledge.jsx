import React from 'react';
/* Material Imports*/
import Button from '@material-ui/core/Button';


const OnBoardingAcknowlege = (props) => {
    return (
        <div>
            <p>Thank You for Submitting Details Please fill full Profile to attract investors</p>
            <Button variant='contained'
                color='primary'
                onClick={() => props.history.push('/about')}>Go to Company Profile</Button>
        </div>)
}

export default OnBoardingAcknowlege