import React, { Component } from 'react';
import { connect } from 'react-redux';
/* Lodash */
import _get from 'lodash/get';
/* Global Imports */
import TaskViewContainer from '../../../Global/Components/TaskView/TaskViewContainer'
import genericPostData from '../../../Global/dataFetch/genericPostData';
import LoaderButton from '../../../Global/Components/LoaderButton';
import genericGetDataFetcher from '../../../Global/dataFetch/genericGetData';

class TaskDetailsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fieldAccessRequest: []
        }
    }

    componentDidMount() {
        genericGetDataFetcher({
            dispatch: this.props.dispatch,
            url: `/api/FieldAccessReqTask/${_get(this.props, `taskList.rows[${this.props.rowId}].id`)}`,
            constant:{
                init:'FieldAccessReqTaskById_init',
                success:'FieldAccessReqTaskById_success',
                error:'FieldAccessReqTaskById_error'
            },
            identifier:'FieldAccessReqTaskById'
        }).then((data)=>
    {
        this.setState({ fieldAccessRequest: data })
     this.setState({ requestedFields:Object.keys(data).map(key=>key)})
    })
}
        // console
        // let requestedFields = _get(this.props, `taskList.[${this.props.rowId}].id`, []);
        // this.setState({ requestedFields })
    

    FieldAccessReqTask = (reqObj) => {
        this.setState({ fieldAccessRequest: reqObj })
    }

    submitRequest = () => {
        console.log(this.state.fieldAccessRequest, Object.keys(this.state.fieldAccessRequest))
        let allowedFields = Object.keys(this.state.fieldAccessRequest)
            .filter((key, index) => this.state.fieldAccessRequest[key])
            .map(data => data.toUpperCase());
        let reqObj = {};
        reqObj.task = _get(this.props, `taskList.rows[${this.props.rowId}].id`, []);
        reqObj.allowedFields = allowedFields;
        this.setState({ loading: true })
        genericPostData({
            dispatch: this.props.dispatch,
            reqObj: reqObj,
            url: '/api/AllowFieldAccess',
            constants: {
                init: 'AllowFieldAccess_init',
                error: 'AllowFieldAccess_error',
                success: 'AllowFieldAccess_success'
            },
            identifier: 'AllowFieldAccess',
            successText: 'SuccessFully Allowed Fields',
            successCb: (() => this.setState({ loading: false })),
            errorCb: () => this.setState({ loading: false })
        })
    }

    render() {
        return (
            <React.Fragment>
                <TaskViewContainer
                    FieldAccessReqTask={this.FieldAccessReqTask}
                    fields={this.state.fieldAccessRequest}
                    dataObject={this.state.requestedFields}
                />
                <LoaderButton
                    onClick={this.submitRequest}
                    isFetching={this.state.loading}
                    color='primary' variant='contained'>
                    Apply
                </LoaderButton>
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    let taskList = _get(state, 'TaskList.lookUpData');

    return {
        taskList
    }
}

export default connect(mapStateToProps)(TaskDetailsContainer)

