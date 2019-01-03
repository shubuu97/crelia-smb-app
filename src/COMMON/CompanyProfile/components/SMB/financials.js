import React from 'react';
import _get from 'lodash/get';
/* Redux Imports*/
import { connect } from 'react-redux';
/* Global Components*/
import DropzoneArea from '../../../../Global/dropzone/dropzoneArea';
import decorateWithOnDrop from '../../../../Global/dropzone/onDropDecorater';
import basicDataFetcher from '../../../../Global/dataFetch/basicDataFetcher';
import LoaderButton from '../../../../Global/Components/LoaderButton';
import genericPostData from '../../../../Global/dataFetch/genericPostData'
import { withState, compose, renderComponent } from 'recompose';
/* Assets */
import imgquestion from '../../../../Assets/images/question.png';
/* Components Import */
import sidebar from '../SideBar.js';

class financial extends React.Component {

    componentDidMount() {
        basicDataFetcher(this.props.dispatch);
    }

    successCb = () => {
        console.log("Financial Success")
    }

    handleFinancialDataUpload = () => {
        let reqObj = {};
        reqObj.financialInfo = {}
        reqObj.financialInfo.financialLinks = [];
        if (_get(this.props, 'state.preview1link')) {
            reqObj.financialInfo.financialLinks.push(_get(this.props, 'state.preview1link'));
        }
        else {
            if (_get(this.props, 'initialValues.financialLinks[0]'))
                reqObj.financialInfo.financialLinks.push(_get(this.props, 'initialValues.financialLinks[0]'));
        }
        if (_get(this.props, 'state.preview2link')) {
            reqObj.financialInfo.financialLinks.push(_get(this.props, 'state.preview2link'));
        }
        else {
            if (_get(this.props, 'initialValues.financialLinks[1]'))
                reqObj.financialInfo.financialLinks.push(_get(this.props, 'initialValues.financialLinks[1]'));
        }
        if (_get(this.props, 'state.preview3link')) {
            reqObj.financialInfo.financialLinks.push(_get(this.props, 'state.preview3link'));
        }
        else {
            if (_get(this.props, 'initialValues.financialLinks[2]'))
                reqObj.financialInfo.financialLinks.push(_get(this.props, 'initialValues.financialLinks[2]'));
        }
        if (_get(this.props, 'state.preview4link')) {
            reqObj.financialInfo.financialLinks.push(_get(this.props, 'state.preview3link'));
        }
        else {
            if (_get(this.props, 'initialValues.financialLinks[3]'))
                reqObj.financialInfo.financialLinks.push(_get(this.props, 'initialValues.financialLinks[3]'));
        }
        if (_get(this.props, 'initialValues.loanProvider')) {
            reqObj.financialInfo.loanProvider = _get(this.props, 'initialValues.loanProvider')
        }
        if (_get(this.props, 'initialValues.financialData')) {
            reqObj.financialInfo.financialData = _get(this.props, 'initialValues.financialData')
        }
        reqObj.id = this.props.id
        genericPostData({
            dispatch: this.props.dispatch,
            reqObj,
            url: '/api/SaveSMB',
            constants: { init: 'cobsave_init', success: 'cobsave_success', error: 'cobsave_error' },
            successCb: () => basicDataFetcher(this.props.dispatch)
        })
    }

    render() {
        console.log(this.props.isFetchingUpdateSMB, 'isFetchingUpdateSMB')
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="row align-items-center">
                            <div className="col-sm-6">
                                <h4>Cash Flow</h4>
                                <DropzoneArea
                                    fieldName='cashFlow'
                                    onDrop={this.props.onDrop}
                                    afterParseFunction={this.cashFlowParseAction}
                                    parseData={true}
                                    progress={_get(this.props, 'state.cashFlowuploadProgress')}
                                    dropzone={_get(this.props, 'state.cashFlow.name', '') || _get(this.props, 'state.cashFlowlink', '') || _get(this.props, 'initialValues.cashFlow')}
                                />
                            </div>
                            <div className="col-sm-4 downlaod-external">
                                <div className="msgicon"><img src={imgquestion} /></div>
                                <p>You need to use predefined templates:</p>
                                <a href="#" > <i class="material-icons">save_alt </i> <span>Download cash low XLSX-template</span></a>
                            </div>
                        </div>
                        <div className="row align-items-center pt-30">
                            <div className="col-sm-6">
                                <h4>Balance Sheet</h4>
                                <DropzoneArea

                                    fieldName='balanceSheet'
                                    onDrop={this.props.onDrop}
                                    afterParseFunction={this.cashFlowParseAction}
                                    parseData={true}
                                    progress={_get(this.props, 'state.balanceSheetProgress')}
                                    dropzone={_get(this.props, 'state.balanceSheet.name', '') || _get(this.props, 'state.balanceSheetlink', '') || _get(this.props, 'initialValues.balanceSheet')}
                                />
                            </div>
                            <div className="col-sm-4 downlaod-external">
                                <a href="#"> <i class="material-icons">save_alt </i> <span>Download balance sheet common size statement XLSX-template</span></a>
                            </div>
                        </div>
                        <div className="row align-items-center pt-30">
                            <div className="col-sm-6">
                                <h4>Income Statement</h4>
                                <DropzoneArea
                                    fieldName='incomeStatement'
                                    onDrop={this.props.onDrop}
                                    afterParseFunction={this.cashFlowParseAction}
                                    parseData={true}
                                    progress={_get(this.props, 'state.incomeStatementProgress')}
                                    dropzone={_get(this.props, 'state.incomeStatement.name', '') || _get(this.props, 'state.incomeStatementlink', '') || _get(this.props, 'initialValues.incomeStatement')}
                                />
                            </div>
                            <div className="col-sm-4 downlaod-external">
                                <a href="#"> <i class="material-icons">save_alt </i> <span>Download income common size statement XLSX-template</span></a>
                            </div>
                        </div> <div className="row align-items-center pt-30">
                            <div className="col-sm-6">
                                <h4>2019 Forecast (optional)</h4>
                                <DropzoneArea
                                    progress={_get(this.props, 'state.forecastuploadProgress')}
                                    fieldName='forecast'
                                    onDrop={this.props.onDrop}
                                    dropzone={_get(this.props, 'state.forecast.name', '') || _get(this.props, 'state.forecastlink', '') || _get(this.props, 'initialValues.forecast')}
                                />
                            </div>
                            {/* <div className="col-sm-4 downlaod-external">
                                <a href="#"> <i class="material-icons">save_alt </i> <span>Download balance sheet  common size statement XLSX-template</span></a>
                            </div> */}
                        </div>
                        <div className="row align-items-center pt-30">
                            <div className="col-sm-6">
                                <h4>Business Plan</h4>
                                <DropzoneArea
                                    fieldName='businessPlan'
                                    progress={_get(this.props, 'state.businessPlanuploadProgress')}
                                    onDrop={this.props.onDrop}
                                    dropzone={_get(this.props, 'state.businessPlan.name', '') || _get(this.props, 'state.businessPlanlink', '') || _get(this.props, 'initialValues.businessPlan')}
                                />
                            </div>
                            {/* <div className="col-sm-4 downlaod-external">
                                <a href="#"> <i class="material-icons">save_alt </i> <span>Download balance sheet  common size statement XLSX-template</span></a>
                            </div> */}
                        </div>
                    </div>
                </div>
                <div class="action-block">
                    <LoaderButton
                        isFetching={this.props.isFetchingUpdateSMB}
                        onClick={this.handleFinancialDataUpload}
                        color="primary"
                        variant="contained">Save Draft</LoaderButton>
                </div>
            </React.Fragment>
        )
    }
}


let state = withState('state', 'setState', '')

financial = compose(
    state,
    decorateWithOnDrop,
    sidebar,

)(financial);

function mapStateToProps(state) {
    return {
        id: _get(state, 'BasicInfo.lookUpData.companyDetails.id'),
        isFetchingUpdateSMB: _get(state, 'CobPost.isFetching'),
        initialValues: _get(state, 'BasicInfo.lookUpData.companyDetails.financialInfo', [])
    };
}

export default connect(mapStateToProps)(financial);


