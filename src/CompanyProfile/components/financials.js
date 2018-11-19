import React from 'react';
import sidebar from './SideBar.js';
/* Global Components*/
import DropzoneArea from '../../Global/dropzoneArea';
import decorateWithOnDrop from '../../Global/onDropDecorater';
import { withState, compose, renderComponent } from 'recompose';
import imgquestion from '../../Assets/images/question.png';
import { connect } from 'react-redux';
import _get from 'lodash/get';
import basicDataFetcher from '../../Global/basicDataFetcher';
import LoaderButton from '../../Global/LoaderButton';
import genericPostData from '../../Global/genericPostData'

class financial extends React.Component {

    componentDidMount() {
        basicDataFetcher(this.props.dispatch);
    }

    successCb=()=>
    {
        debugger;
    }
    handleFinancialDataUpload=()=>
    {
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
            dispatch:this.props.dispatch,
            reqObj,
            url:'/api/SaveSMB',
            constants:{init: 'cobsave_init',success: 'cobsave_success',error: 'cobsave_error'},
            successCb:()=> basicDataFetcher(this.props.dispatch)
        })
    }
    render() {
       console.log(this.props.isFetchingUpdateSMB,'isFetchingUpdateSMB')
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="row align-items-center">
                            <div className="col-sm-6">
                                <h4>Income statements for last two years and YTD</h4>
                                <DropzoneArea
                                    fieldName='preview1'
                                    onDrop={this.props.onDrop}
                                    progress={_get(this.props, 'state.preview1uploadProgress')}
                                    dropzone={_get(this.props, 'state.preview1.name', '') || _get(this.props, 'state.preview1link', '') || _get(this.props, 'initialValues.financialLinks[0]')}
                                />
                            </div>
                            <div className="col-sm-4 downlaod-external">
                                <div className="msgicon"><img src={imgquestion} /></div>
                                <p>You need to use predefined templates:</p>
                                <a href="#" > <i class="material-icons">save_alt </i> <span>Download income statement XLSX-template</span></a>
                            </div>
                        </div>
                        <div className="row align-items-center pt-30">
                            <div className="col-sm-6">
                                <h4>2019 Forecast (optional)</h4>
                                <DropzoneArea
                                    fieldName='preview2'
                                    progress={_get(this.props, 'state.preview2uploadProgress')}
                                    onDrop={this.props.onDrop}
                                    dropzone={_get(this.props, 'state.preview2.name', '') || _get(this.props, 'state.preview2link', '') || _get(this.props, 'initialValues.financialLinks[1]')}
                                />
                            </div>
                            <div className="col-sm-4 downlaod-external">
                                <a href="#"> <i class="material-icons">save_alt </i> <span>Download balance sheet  common size statement XLSX-template</span></a>
                            </div>
                        </div>
                        <div className="row align-items-center pt-30">
                            <div className="col-sm-6">
                                <h4>Business Plan</h4>
                                <DropzoneArea
                                    fieldName='preview3'
                                    progress={_get(this.props, 'state.preview2uploadProgress')}
                                    onDrop={this.props.onDrop}
                                    dropzone={_get(this.props, 'state.preview3.name', '') || _get(this.props, 'state.preview3link', '') || _get(this.props, 'initialValues.financialLinks[2]')}
                                />
                            </div>
                            <div className="col-sm-4 downlaod-external">
                                <a href="#"> <i class="material-icons">save_alt </i> <span>Download balance sheet  common size statement XLSX-template</span></a>
                            </div>
                        </div> <div className="row align-items-center pt-30">
                            <div className="col-sm-6">
                                <h4>Balance sheet common size statement</h4>
                                <DropzoneArea
                                    fieldName='preview4'
                                    progress={_get(this.props, 'state.preview4uploadProgress')}
                                    onDrop={this.props.onDrop}
                                    dropzone={_get(this.props, 'state.preview4.name', '') || _get(this.props, 'state.preview4link', '') || _get(this.props, 'initialValues.financialLinks[3]')}
                                />
                            </div>
                            <div className="col-sm-4 downlaod-external">
                                <a href="#"> <i class="material-icons">save_alt </i> <span>Download balance sheet  common size statement XLSX-template</span></a>
                            </div>
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
        id:_get(state, 'BasicInfo.lookUpData.companyDetails.id'),
        isFetchingUpdateSMB:_get(state,'CobPost.isFetching'),
        initialValues: _get(state, 'BasicInfo.lookUpData.companyDetails.financialInfo', []) };
}

export default connect(mapStateToProps)(financial);


