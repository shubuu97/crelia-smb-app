import React,{Component} from 'react';
import Button from '@material-ui/core/Button';
import sidebar from './SideBar.js';
import DropzoneButton from '../../Global/dropzoneButton'
import decorateWithOnDrop from '../../Global/onDropDecorater';
import {withState,compose} from 'recompose';
import {Field,reduxForm} from 'redux-form';
import RFTextField from '../../Global/GlobalTextField';
import FormControl from '@material-ui/core/FormControl';
import companypresentation from '../../Assets/images/company-presentation.png';



let  MarketingMaterial = (props)=>{
console.log(props,"11")
{
    return(
       <div className="row">
            <div className="col-sm-12">
                     <div className="row">
                        <div className="col-sm-6">
                            <FormControl margin="normal" required fullWidth>
                                <Field
                                label="Organization Link"
                                name="organizationLink" component={RFTextField}/>
                            </FormControl>
                        </div>                    
                    </div>  
                    <div className="row pt-30">
                    <div className="col-sm-4">
                    <h4>Presentation</h4>
                        <img
                            className="img-fluid mb-20 minHeightbox"
                            src={companypresentation} />
                          <DropzoneButton
                            name="Upload Presentation"
                            fieldName="presentaion"
                            onDrop={props.onDrop}
                            />                
                    </div>
                    <div className="col-sm-4  offset-sm-1">
                    <h4>Video</h4>
                         <video width="100%" className="mb-20 minHeightbox" controls>
                            <source src="mov_bbb.mp4" type="video/mp4"/>
                            <source src="mov_bbb.ogg" type="video/ogg"/>
                            Your browser does not support HTML5 video.
                            </video>
                            <DropzoneButton
                            name="Upload Presentational Video"
                            fieldName="presentaionVideo"
                            onDrop={props.onDrop}
                        />
                    </div>  
                 </div>
            </div>
        </div>

    )
}
}

let state = withState('state', 'setState', '')

export default compose(
state,
decorateWithOnDrop,
sidebar,
reduxForm({form:'MarketingMaterial'}),

)(MarketingMaterial);



