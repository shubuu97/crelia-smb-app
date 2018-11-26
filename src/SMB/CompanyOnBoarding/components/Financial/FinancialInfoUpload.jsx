import React from 'react';
import PropTypes from 'prop-types';
import { withState } from 'recompose';
import _get from 'lodash/get';
/* Material Imports */
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
/* Redux Imports */
import { connect } from 'react-redux';
/* Global Components*/
import DropzoneArea from '../../../../Global/dropzone/dropzoneArea';
import decorateWithOnDrop from '../../../../Global/dropzone/onDropDecorater';
/* CSS Imports*/
import '../../styles/finance.css';
import {withRouter} from 'react-router-dom';

//Dialogue import 
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ParseInfo from '../ParserInfo/ParserInfoContainer'

//lodash imports
import _setWith from 'lodash/setWith'


class FinancialInfoUpload extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            reqObj: {}
        }
    }

    cashFlowParseAction = (data) => {
        this.setState({openModal:true})
    }

 

    handleUploadFinancial = () => {
        let reqObj = {};
        reqObj.financialInfo = {}

        if (_get(this.props, 'state.cashFlowlink')) {
            debugger;

            _setWith(reqObj.financialInfo,'cashFlow',[_get(this.props, 'state.cashFlowlink')]);

        }
        else {
            if (_get(this.props, 'initialValues.cashFlow'))
            _setWith(reqObj.financialInfo,'cashFlow',_get(this.props, 'initialValues.cashFlow'));

        }
        if (_get(this.props, 'state.businessPlanlink')) {
            _setWith(reqObj.financialInfo,'businessPlan',[_get(this.props, 'state.businessPlanlink')]);
        }
        else {
            if (_get(this.props, 'initialValues.businessPlanlink'))
            _setWith(reqObj.financialInfo,'businessPlan',_get(this.props, 'initialValues.businessPlanlink'));

        }
        if (_get(this.props, 'state.forecastlink')) {
            _setWith(reqObj.financialInfo,'forecast',[_get(this.props, 'state.forecastlink')]);

        }
        else {
            if (_get(this.props, 'initialValues.forecast'))
            _setWith(reqObj.financialInfo,'forecast',_get(this.props, 'initialValues.businessPlanlink'));

        }
        if (_get(this.props, 'initialValues.loanProvider')) {
            reqObj.financialInfo.loanProvider = _get(this.props, 'initialValues.loanProvider')
        }
        if (_get(this.props, 'initialValues.financialData')) {
            reqObj.financialInfo.financialData = _get(this.props, 'initialValues.financialData')
        }
        this.setState({ reqObj: reqObj })
        this.props.handleNext(reqObj);
    }

    handleReview = () => {
        this.handleUploadFinancial()
        this.props.handleSubmitAprroval()
    }

    render() {
        console.log(this.props.state, 'state is here')
        return (
            <React.Fragment>
                <div className="row justify-content-between ">
                    <div className="col-sm-6">
                        <DropzoneArea
                            title="Financial Statement for last three years"
                            fieldName='cashFlow'
                            onDrop={this.props.onDrop}
                            afterParseFunction={this.cashFlowParseAction}
                            parseData={true}
                            progress={_get(this.props, 'state.cashFlowuploadProgress')}
                            dropzone={_get(this.props, 'state.cashFlow.name', '') || _get(this.props, 'state.cashFlowlink', '') || _get(this.props, 'initialValues.cashFlow')}
                        />
                    </div>
                    <div className="col-sm-6">
                        <DropzoneArea
                            title="2019 Forecast (optional)"
                            fieldName='businessPlan'
                            progress={_get(this.props, 'state.businessPlanuploadProgress')}
                            onDrop={this.props.onDrop}
                            dropzone={_get(this.props, 'state.businessPlan.name', '') || _get(this.props, 'state.businessPlanlink', '') || _get(this.props, 'initialValues.businessPlan')}
                        />
                    </div>
                    <div className="col-sm-6">
                        <DropzoneArea
                            title="Business Plan"
                            progress={_get(this.props, 'state.forecastuploadProgress')}
                            fieldName='forecast'
                            onDrop={this.props.onDrop}
                            dropzone={_get(this.props, 'state.forecast.name', '') || _get(this.props, 'state.forecastlink', '') || _get(this.props, 'initialValues.forecast')}
                        />
                    </div>
                    <div className="col-sm-6">
                    </div>
                    <div class="common-action-block col-sm-12">
                        <Button
                            onClick={this.handleUploadFinancial}
                            fullWidth
                            disabled={localStorage.getItem('companyStatus') == 'PENDING_APPROVAL' ? true : false || this.props.isFetching}
                            variant="contained"
                            color="primary"
                            className="btnprimary"
                        >
                            {this.props.isFetchingSave ? <CircularProgress size={24} /> : 'Save Draft'}

                        </Button>
                        {localStorage.getItem('companyStatus') == 'PENDING_APPROVAL' ? null :
                            <Button
                                fullWidth
                                onClick={this.handleReview} variant='contained'
                                className="btnprimary  ml-35"
                                color='primary'>
                                Review
                          </Button>
                        }
                    </div>
                    <Dialog
          open={this.state.openModal}
          onClose={()=>this.setState({openModal:false})}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Preview Your Data and Confirm"}</DialogTitle>
          <DialogContent>
            <ParseInfo/>
          </DialogContent>
          <DialogActions>
          <Button color='primary' variant='outlined' onClick={()=>this.setState({openModal:false})}>Re-upload Statements</Button>
                <Button color='primary' variant='contained' onClick={this.handleUploadFinancial}>Confirm Statements</Button>
          </DialogActions>
        </Dialog>
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

export default connect(mapStateToProps)(state(
  withRouter(  decorateWithOnDrop(
        FinancialInfoUpload)
    ))
);
