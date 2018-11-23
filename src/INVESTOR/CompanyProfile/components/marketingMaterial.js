import React, { Component } from 'react';
import _get from 'lodash/get';
/* Material Imports*/
import FormControl from '@material-ui/core/FormControl';
import CircularProgress from '@material-ui/core/CircularProgress';
/* Global Imports*/
import sidebar from './SideBar.js';
import DropzoneButton from '../../../Global/dropzone/dropzoneButton'
import decorateWithOnDrop from '../../../Global/dropzone/onDropDecorater';
import RFTextField from '../../../Global/Components/GlobalTextField';
import LoaderButton from '../../../Global/Components/LoaderButton';
/* Recompose Import*/
import { withState, compose } from 'recompose';
/* Redux Imports*/
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { APPLICATION_BFF_URL } from '../../../Redux/urlConstants';
import { postData } from '../../../Redux/postAction';
import { getData } from '../../../Redux/getAction';
import showMessage from '../../../Redux/toastAction';

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

    dropzoneImageProgressPopulate = (name) => {
        return (
            _get(this.props, `state.${name}uploadProgress`) ?
                <div className="flex-column align-center justify-center mt-16">
                    <CircularProgress
                        className="progress"
                        variant="static"
                        value={_get(this.props, `state.${name}uploadProgress`)}
                    />
                    <span className="progress-text">
                        {_get(this.props, `state.${name}uploadProgress`)} %
                    </span>
                </div>
                :
                <a href={_get(this.props, `state.${name}`) || _get(this.props, `state.${name}link`) || _get(this.props, `${name}Link`)} target="_blank">
                    Link
                </a>
        )
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
                                {this.dropzoneImageProgressPopulate('presentation')}
                                <div className="mt-16">
                                    <DropzoneButton
                                        name="Upload Presentation"
                                        fieldName="presentation"
                                        onDrop={this.props.onDrop}
                                    />
                                </div>
                            </div>
                            <div className="col-sm-4  offset-sm-1">
                                <h4>Video</h4>
                                {this.dropzoneImageProgressPopulate('video')}
                                {/* <Player width="100%" className="mb-20 minHeightbox">
                            <source src={_get(this.props,'state.presentaionVideo')||_get(this.props,'state.presentaionVideolink')||''}/>
                            Your browser does not support HTML5 video.
                            </Player> */}
                                <div className="mt-16">
                                    <DropzoneButton
                                        name="Upload Presentational Video"
                                        fieldName="video"
                                        onDrop={this.props.onDrop}
                                    />
                                </div>

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



