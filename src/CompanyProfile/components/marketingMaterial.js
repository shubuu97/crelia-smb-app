import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import sidebar from './SideBar.js';
import DropzoneButton from '../../Global/dropzoneButton'
import decorateWithOnDrop from '../../Global/onDropDecorater';
import { withState, compose } from 'recompose';
import { Field, reduxForm } from 'redux-form';
import RFTextField from '../../Global/GlobalTextField';
import FormControl from '@material-ui/core/FormControl';
import companypresentation from '../../Assets/images/company-presentation.png';
import { connect } from 'react-redux';
import LoaderButton from '../../Global/LoaderButton';
import _get from 'lodash/get';
import { APPLICATION_BFF_URL } from '../../Redux/urlConstants';
import { postData } from '../../Redux/postAction';
import { getData } from '../../Redux/getAction';
import showMessage from '../../Redux/toastAction';
var jwtDecode = require('jwt-decode');



class MarketingMaterial extends Component {

    componentDidMount() {
        this.basicDataFetcher();
    }
    basicDataFetcher = () => {
        if (localStorage.getItem('authToken')) {
            let decodeData = jwtDecode(localStorage.getItem('authToken'));

            let role = decodeData.role


            this.props.dispatch(
                getData(`${APPLICATION_BFF_URL}/api/${role}/${encodeURIComponent(decodeData.id)}`, 'fetchingbasicdata', {
                    init: 'basicdata_init',
                    success: 'basicdata_success',
                    error: 'basicdata_error'
                })
            )
        }
        else {
            // this.props.history.push('/')
        }
    }
    handleMarketingMaterialSubmit = (values) => {
        let reqObj = {
            presentationLink: _get(this.props, 'state.presentaionlink'),
            videoLink: _get(this.props, 'state.presentaionVideolink'),
            id: this.props.id,
            url: _get(values, 'url'),
        };
        this.props.dispatch(
            postData(`${APPLICATION_BFF_URL}/api/SaveSMB`, reqObj, 'UpdateSMB-data', {
                init: 'UpdateSMB_init',
                success: 'UpdateSMB_success',
                error: 'UpdateSMB_error'
            })
        ).then((data) => {
            this.basicDataFetcher();
            this.props.dispatch(showMessage({ text: 'Saved succesfully', isSuccess: true }));

            setTimeout(() => {
                this.props.dispatch(showMessage({}));
            }, 6000);
        })
            .catch((err) => {
                this.props.dispatch(showMessage({ text: err.msg, isSuccess: false }));
                setTimeout(() => {
                    this.props.dispatch(showMessage({}));
                }, 6000);
            })
    }

    render() {
        let { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleMarketingMaterialSubmit)}>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="row">
                            <div className="col-sm-6">
                                <FormControl margin="normal" required fullWidth>
                                    <Field

                                        label="Organization Link"
                                        name="url"
                                        component={RFTextField} />
                                </FormControl>
                            </div>
                        </div>
                        <div className="row pt-30">
                            <div className="col-sm-4">
                                <h4>Presentation</h4>
                                <a href={_get(this.props, 'state.presentaion') || _get(this.props, 'state.presentaionlink') || _get(this.props, 'presentationLink')} target="_blank">presentaion ppt</a>
                                <DropzoneButton
                                    name="Upload Presentation"
                                    fieldName="presentaion"
                                    onDrop={this.props.onDrop}
                                />
                            </div>
                            <div className="col-sm-4  offset-sm-1">
                                <h4>Video</h4>
                                <a href={_get(this.props, 'state.presentaionVideo') || _get(this.props, 'state.presentaionVideolink') || _get(this.props, 'videoLink')} target="_blank">Video</a>
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
    reduxForm({
        form: 'MarketingMaterial',
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
    }),

)(MarketingMaterial);

function mapStateToProps(state) {
    let id = _get(state, 'BasicInfo.lookUpData.companyDetails.id');
    let isFetchingUpdateSMB = _get(state, 'UpdateSMB.isFetching');
    let presentationLink = _get(state, 'BasicInfo.lookUpData.companyDetails.presentationLink');
    let videoLink = _get(state, 'BasicInfo.lookUpData.companyDetails.videoLink');
    let initialValues = {
        url: _get(state, 'BasicInfo.lookUpData.companyDetails.url', '')
    }

    return { id, isFetchingUpdateSMB, presentationLink, videoLink, initialValues }
}

export default connect(mapStateToProps)(MarketingMaterial);



