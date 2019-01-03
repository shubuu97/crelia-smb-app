import React from 'react';
import _get from 'lodash/get';
/* Global Imports */
import CardTable from '../../../Global/Components/CardTable/CardTable';
import genericPostData from '../../../Global/dataFetch/genericPostData';
import genericGetDataFetcher from '../../../Global/dataFetch/genericGetData';
/* Component Import */
import TaskDetails from './TaskDetails/TaskDetailsContainer'


class TaskList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Loading: false
        }
    }

    getTaskListData = () => genericGetDataFetcher({
        dispatch: this.props.dispatch,
        url: '/api/FieldAccessReqTask',
        constant: {
            init: 'TaskList_init',
            success: 'TaskList_success',
            error: 'TaskList_error'
        },
        identifier: 'TaskList'
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

    render() {
        return (
            <div>
                <CardTable
                    title="Your Tasks"
                    loader={this.state.Loading}
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
                        'Investor Id',
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