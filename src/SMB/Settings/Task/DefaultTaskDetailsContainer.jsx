import React, { Component } from 'react';
import { connect } from 'react-redux';
/* Lodash */
import _get from 'lodash/get';
/* Global Imports */
import TaskViewContainer from '../../../Global/Components/TaskView/TaskViewContainer'
import genericPostData from '../../../Global/dataFetch/genericPostData';
import LoaderButton from '../../../Global/Components/LoaderButton';
import parseDataBeforeSubmit from '../../../Global/Components/TaskView/dataUtility/parseDataBeforeSubmit'
import genericGetDataFetcher from '../../../Global/dataFetch/genericGetData';

class DefaultTaskDetailsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fieldAccessRequest: []
        }
    }

   componentDidMount() {
        genericGetDataFetcher({
            dispatch: this.props.dispatch,
            url: `/api/smb/${this.props.smbId}`,
            constant: {
                init: "smbbyid_init",
                success: 'smbbyid_success',
                error: 'smbbyid_error'
            },
            identifier: "smbbyid"
        }).then((data) => {
            let obj = {};
            _get(data, 'privacyPolicy.defaultFields', []).map((data) => {

                obj[data] = true
                return obj
            })

            this.setState({ fieldAccessRequest: obj })
        })
    }

    FieldAccessReqTask = (reqObj) => {
        this.setState({ fieldAccessRequest: reqObj })
    }

    submitRequest = () => {
        console.log(this.state.fieldAccessRequest, Object.keys(this.state.fieldAccessRequest))
        let fields = Object.keys(this.state.fieldAccessRequest)
            .filter((key, index) => this.state.fieldAccessRequest[key])
            .map(data => parseDataBeforeSubmit(data).toUpperCase())
        let reqObj = {};
        reqObj.smbId = _get(this.props, `smbId`);
        reqObj.fields = fields;
        this.setState({ loading: true })
        genericPostData({
            dispatch: this.props.dispatch,
            reqObj: reqObj,
            url: '/api/AddToDefaultAccess',
            constants: {
                init: 'AddToDefaultAccess_init',
                error: 'AddToDefaultAccess_error',
                success: 'AddToDefaultAccess_success'
            },
            identifier: 'AddToDefaultAccess',
            successText: 'SuccessFully Add to Default Access Fields',
            successCb: (() => this.setState({ loading: false })),
            errorCb: () => this.setState({ loading: false })
        })
    }

    render() {
        return (
            <React.Fragment>
                <span className="Setting-header"> Choose the details which investors can see</span>
                <TaskViewContainer
                    FieldAccessReqTask={this.FieldAccessReqTask}
                    fields={this.state.fieldAccessRequest}
                    dataObject={this.state.requestedFields}
                    defaultTask={true}
                />
                <LoaderButton
                    onClick={this.submitRequest}
                    isFetching={this.state.loading}
                    color='primary' variant='contained'>
                    Apply Changes
                </LoaderButton>
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    let taskList = _get(state, 'TaskList.lookUpData');
    let smbId = _get(state, 'BasicInfo.lookUpData.companyDetails.id');

    return {
        taskList,
        smbId
    }
}

export default connect(mapStateToProps)(DefaultTaskDetailsContainer)

