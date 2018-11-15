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
import {connect} from 'react-redux';
import LoaderButton from '../../Global/LoaderButton';
import _get from 'lodash/get';



class MarketingMaterial extends Component
{
    handleMarketingMaterialSubmit=(values)=>
    {
    let reqObj = {};
    
    }

render(){
    let {handleSubmit} = this.props;

    return(
    <form onSubmit={handleSubmit(this.handleMarketingMaterialSubmit)}>
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
                         <a href={_get(this.props,'state.presentaion')||_get(this.props,'state.presentaionlink')}>presentaion ppt</a> 
                          <DropzoneButton
                            name="Upload Presentation"
                            fieldName="presentaion"
                            onDrop={this.props.onDrop}
                            />                
                    </div>
                    <div className="col-sm-4  offset-sm-1">
                    <h4>Video</h4>
                    <a href={_get(this.props,'state.presentaionVideo')||_get(this.props,'state.presentaionVideolink')}>Video</a> 
                         {/* <Player width="100%" className="mb-20 minHeightbox">
                            <source src={_get(this.props,'state.presentaionVideo')||_get(this.props,'state.presentaionVideolink')||''}/>
                            Your browser does not support HTML5 video.
                            </Player> */}
                            <DropzoneButton
                            name="Upload Presentational Video"
                            fieldName="presentaionVideo"
                            onDrop={this.props.onDrop}
                        />
                        <div class="action-block">
                    <LoaderButton
                                    isFetching={this.props.isFetchingUpdateSMB}
                                    type="submit"
                                    color="primary"
                                    variant="contained">Save Draft</LoaderButton>
                    </div>
                    </div>  
                    
                 </div>
            </div>
        </div>
        </form>

    )
}
}


let state = withState('state', 'setState', '')

MarketingMaterial = compose(
state,
decorateWithOnDrop,
sidebar,
reduxForm({form:'MarketingMaterial'}),

)(MarketingMaterial);

function mapStateToProps(state)
{
    return {}
}

export default connect(mapStateToProps)(MarketingMaterial);



