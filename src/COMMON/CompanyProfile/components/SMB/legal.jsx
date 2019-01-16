import React, { Component } from 'react';
import _get from 'lodash/get';
/* Global Imports*/
import DropzoneButton from '../../../../Global/dropzone/dropzoneButton'
import decorateWithOnDrop from '../../../../Global/dropzone/onDropDecorater';
import LoaderButton from '../../../../Global/Components/LoaderButton';
/* Recompose*/
import { withState, compose } from 'recompose';
/* Redux Imports*/
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { APPLICATION_BFF_URL } from '../../../../Redux/urlConstants';
import { postData } from '../../../../Redux/postAction';
import { getData } from '../../../../Redux/getAction';
import showMessage from '../../../../Redux/toastAction';
/* Material Imports */
import CircularProgress from '@material-ui/core/CircularProgress';

var jwtDecode = require('jwt-decode');

class Legal extends Component {

    constructor(props) {
        super(props)
    }

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

    handleSubmitLegal = (values) => {
        let reqObj = {
            registrationCertificateLink: _get(this.props, 'state.registrationCertificatelink'),
            organizationalChartLink: _get(this.props, 'state.organizationalChartlink'),
            taxCertificateLink: _get(this.props, 'state.taxCertificatelink'),
            id: this.props.id
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
                <img src={_get(this.props, `state.${name}link`) || _get(this.props, `${name}Link`)} className="legal-images" />
        )
    }

    render() {
        let { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit(this.handleSubmitLegal)}>
                <div>
                    <div className="row">
                        <div className="col-sm-4 flex-column align-center">
                            <h4>Registration Certificate</h4>
                            <div className="legal-images-container">
                                {this.dropzoneImageProgressPopulate('registrationCertificate')}
                            </div>
                            <br />
                            <DropzoneButton
                                fieldName='registrationCertificate'
                                name="Upload File"
                                onDrop={this.props.onDrop} />
                        </div>
                        <div className="col-sm-4 flex-column align-center ">
                            <h4>Organizational Chart</h4>
                            <div className="legal-images-container">
                                {this.dropzoneImageProgressPopulate('organizationalChart')}
                            </div>
                            <br />
                            <DropzoneButton
                                fieldName='organizationalChart'
                                name="Upload File"
                                onDrop={this.props.onDrop} />
                        </div>
                        <div className="col-sm-4 flex-column align-center ">
                            <h4>Tax Certificate</h4>
                            <div className="legal-images-container">
                                {this.dropzoneImageProgressPopulate('taxCertificate')}
                            </div>

                            <br />
                            <DropzoneButton
                                fieldName='taxCertificate'
                                name="Upload File"
                                onDrop={this.props.onDrop} />
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
            </form>
        )
    }
}

let state = withState('state', 'setState', '')

Legal = compose(
    state,
    decorateWithOnDrop,
    reduxForm({ form: 'Legal' }),

)(Legal);

function mapStateToProps(state) {
    let id = _get(state, 'BasicInfo.lookUpData.companyDetails.id');
    let isFetchingUpdateSMB = _get(state, 'UpdateSMB.isFetching');

    let registrationCertificateLink = _get(state, 'BasicInfo.lookUpData.companyDetails.registrationCertificateLink');
    let organizationalChartLink = _get(state, 'BasicInfo.lookUpData.companyDetails.organizationalChartLink');
    let taxCertificateLink = _get(state, 'BasicInfo.lookUpData.companyDetails.taxCertificateLink');

    return { id, isFetchingUpdateSMB, registrationCertificateLink, organizationalChartLink, taxCertificateLink }
}

export default connect(mapStateToProps)(Legal);


