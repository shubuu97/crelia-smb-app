import React from 'react';
import _get from 'lodash/get';
/* Global Imports */
import CardTable from '../../../Global/Components/CardTable/CardTable';
import genericPostData from '../../../Global/dataFetch/genericPostData';
import genericGetDataFetcher from '../../../Global/dataFetch/genericGetData';
/* Component Import */
import TaskDetails from './TaskDetailsContainer'


class TaskList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Loading: false,
            current:1,
            first:0,
            limit:10
        }
    }

    getTaskListData = () => genericPostData({
        dispatch: this.props.dispatch,
        reqObj: { getAll: false, first: this.state.first, limit:this.state.limit },
        url: '/api/taskList',
        constants: {
            init: 'TaskList_init',
            success: 'TaskList_success',
            error: 'TaskList_error'
        },
        identifier: 'TaskList',
        dontShowMessage: true
    })

    markComplete = (data, index) => {
        let reqObj = {
            task: _get(this.props, `listData[${index}].id`, '')
        };
        this.setState({ Loading: true })
        genericPostData({
            dispatch: this.props.dispatch,
            reqObj,
            url: '/api/CompleteFieldAccessReqTask',
            constants: {
                init: 'CompleteFieldAccessReqTask_init',
                success: 'CompleteFieldAccessReqTask_success',
                error: 'CompleteFieldAccessReqTask_error'
            },
            identifier: 'CompleteFieldAccessReqTask',
            successText: 'Task Marked As Complete Succesfully',
            successCb: () => {
                this.setState({ Loading: false });
                this.getTaskListData()
            },
            errorCb: () => this.setState({ Loading: false })
        })
    }

    declineTask = (data, index) => {
        let reqObj = {
            task: _get(this.props, `listData[${index}].id`, '')
        };
        this.setState({ Loading: true })
        genericPostData({
            dispatch: this.props.dispatch,
            reqObj,
            url: '/api/DeclineFieldAccessReqTask',
            constants: {
                init: 'DeclineFieldAccessReqTask_init',
                success: 'DeclineFieldAccessReqTask_success',
                error: 'DeclineFieldAccessReqTask_error'
            },
            identifier: 'DeclineFieldAccessReqTask',
            successText: 'Task Declined Succesfully',
            successCb: () => {
                this.setState({ Loading: false });
                this.getTaskListData()
            },
            errorCb: () => this.setState({ Loading: false })
        })
    }

    editTask = (data, index) => {

    }

    extendedComponentAction = (data, index) => {
        this.setState({ reqID: _get(this.props, `loanData[${index}].id`) })
    }
    //pagination action start here
    onShowSizeChange = (current, pageSize) => {
        this.state.first = (((current - 1) * (pageSize)) + 1) - 1;
        this.state.limit = pageSize;
        this.getTaskListData();
        this.setState({ first: this.state.first, limit: this.state.limit, current: current })

    }
    onPageChange = (current, pageSize) => {
        this.state.first = (((current - 1) * (pageSize)) + 1) - 1;
        this.state.limit = pageSize;
        this.getTaskListData();
        this.setState({ first: this.state.first, limit: this.state.limit, current: current })
    }
    //pagination action end here
    render() {
        return (
            <div>
                <CardTable
                    title="Your Tasks"
                    loader={this.state.Loading}
                    total={this.props.total}
                    current={this.state.current}
                    menuActions={
                        [
                            {
                                Title: 'Mark As Complete',
                                actionEvent: this.markComplete,
                            },
                            {
                                Title: 'Decline',
                                actionEvent: this.declineTask
                            }
                        ]
                    }
                    headingData={[
                        'Task Status',
                        'Investor Name',
                        'Date Created',
                        'Requested Field Count',
                        'Actions'
                    ]}
                    data={this.props.TableData}
                    filter={false}
                    extendedComponent={
                        {
                            component: TaskDetails
                            , actionEvent: this.extendedComponentAction
                        }
                    }
                />
            </div>)
    }
}
export default TaskList;