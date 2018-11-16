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

    render() {
        let { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit(this.handleSubmitLegal)}>
                <div>
                    <div className="row">
                        <div className="col-sm-4">
                            <h4>Registration Certificate</h4>
                            <div className="legal-images-container">
                                <img src={_get(this.props, 'state.registrationCertificatelink') || _get(this.props, 'registrationCertificateLink')} className="legal-images"/>
                            </div>
                            <br />
                            <DropzoneButton
                                fieldName='registrationCertificate'
                                name="Upload File"
                                onDrop={this.props.onDrop} />
                        </div>
                        <div className="col-sm-4">
                            <h4>Tax Id</h4>
                            <div className="legal-images-container">
                                <img src={_get(this.props, 'state.organizationalChartlink') || _get(this.props, 'organizationalChartLink')} className="legal-images"/>
                            </div>
                            <br />
                            <DropzoneButton
                                fieldName='organizationalChart'
                                name="Upload File"
                                onDrop={this.props.onDrop} />
                        </div>
                        <div className="col-sm-4">
                            <h4>Tax Id</h4>
                            <div className="legal-images-container">
                                <img src={_get(this.props, 'state.taxCertificatelink') || _get(this.props, 'taxCertificateLink')} className="legal-images"/>
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
    sidebar,
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


