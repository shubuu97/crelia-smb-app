import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { withState } from 'recompose';
/* Global Components*/
import DropzoneArea from '../../../Global/dropzoneArea';
import decorateWithOnDrop from '../../../Global/onDropDecorater';
/* CSS Imports*/
import '../../styles/finance.css';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import _get from 'lodash/get';


class FinancialInfoUpload extends React.Component {

    handleUploadFinancial=()=>
    {
     let reqObj = {};
     reqObj.financialInfo = {}
     reqObj.financialInfo.financialLinks=[];

    if(_get(this.props,'state.preview1link'))
    {
        reqObj.financialInfo.financialLinks.push(_get(this.props,'state.preview1link'));
    }
    else 
    {
        if(_get(this.props,'initialValues.financialLinks[0]'))
        reqObj.financialInfo.financialLinks.push(_get(this.props,'initialValues.financialLinks[0]'));
    }
    if(_get(this.props,'state.preview2link'))
    {
        reqObj.financialInfo.financialLinks.push(_get(this.props,'state.preview2link'));
    }
    else 
    {
        if(_get(this.props,'initialValues.financialLinks[0]'))
        reqObj.financialInfo.financialLinks.push(_get(this.props,'initialValues.financialLinks[1]'));
    }
    if(_get(this.props,'state.preview3link'))
    {
        reqObj.financialInfo.financialLinks.push(_get(this.props,'state.preview3link'));
    }
    else 
    {
        if(_get(this.props,'initialValues.financialLinks[0]'))
        reqObj.financialInfo.financialLinks.push(_get(this.props,'initialValues.financialLinks[2]'));
    }
    if(_get(this.props,'initialValues.loanProvider'))
    {
        reqObj.financialInfo.loanProvider = _get(this.props,'initialValues.loanProvider')
    }
    if(_get(this.props,'initialValues.financialData'))
    {
        reqObj.financialInfo.financialData = _get(this.props,'initialValues.financialData')
    }
     this.props.handleNext(reqObj);

    }

    render() {
        return (
            <React.Fragment>
                <div className="row justify-content-between ">
                    <div className="col-sm-6">
                        <DropzoneArea
                            title="Financial Statement for last three years"
                            fieldName='preview1'
                            onDrop={this.props.onDrop}
                            dropzone={_get(this.props,'state.preview1.name','')||_get(this.props,'state.preview1link','')||_get(this.props,'initialValues.financialLinks[0]')}
                        />
                    </div>
                    <div className="col-sm-6">
                        <DropzoneArea
                            title="2019 Forecast (optional)"
                            fieldName='preview2'
                            onDrop={this.props.onDrop}
                            dropzone={_get(this.props,'state.preview2.name','')||_get(this.props,'state.preview2link','')||_get(this.props,'initialValues.financialLinks[1]')}
                        />
                    </div>
                    <div className="col-sm-6">
                        <DropzoneArea
                            title="Business Plan"
                            fieldName='preview3'
                            onDrop={this.props.onDrop}
                            dropzone={_get(this.props,'state.preview3.name','')||_get(this.props,'state.preview3link','')||_get(this.props,'initialValues.financialLinks[2]')}
                        />
                    </div>
                    <div className="col-sm-6">
                    </div>
                    <div class="common-action-block col-sm-12">
                        <Button
                            type="submit"
                            onClick={this.handleUploadFinancial}
                            fullWidth
                            disabled={localStorage.getItem('companyStatus') == 'PENDING_APPROVAL' ? true : false || this.props.isFetching}
                            variant="contained"
                            color="primary"
                            className="btnprimary"
                        >
                            {this.props.isFetchingSave ? <CircularProgress size={24} /> : 'Save'}

                        </Button>
                        {localStorage.getItem('companyStatus') == 'PENDING_APPROVAL' ? null :
                           <Button
                           fullWidth
                           onClick={this.props.handleSubmitAprroval}                           variant='contained'
                           className="btnprimary  ml-35"
                           color='primary'>
                           Review
                          </Button> 
                        }
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

FinancialInfoUpload.propTypes = {
    classes: PropTypes.object.isRequired,
};

let state = withState('state', 'setState', '')


function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps)(state(decorateWithOnDrop(FinancialInfoUpload)));
