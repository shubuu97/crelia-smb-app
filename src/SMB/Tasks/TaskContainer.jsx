import React, { Component } from 'react';
import { connect } from 'react-redux';

/* Data Fetcher Imports */
/* Lodash Imports */
import _get from 'lodash/get';

//Material ui import



//component imports
import TaskList from './component/TaskList';

//selector imports
import {tableDataSelector} from './selectors/taskListDataSelector'
import genericPostData from '../../Global/dataFetch/genericPostData';

class TaskContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        genericPostData({
            dispatch: this.props.dispatch,
            reqObj:{getAll:false,first:0,limit:10},
            url: '/api/taskList',
            constants:{
                init:'TaskList_init',
                success:'TaskList_success',
                error:'TaskList_error'
            },
            identifier:'TaskList',
            dontShowMessage:true
        })
    }

    render() {
        return (
            <div>
                <TaskList
                dispatch = {this.props.dispatch}
                 listData = {this.props.taskList}
                 TableData = {this.props.TableData}
                 total = {this.props.total}
                />
            </div>
        )
    }
}


function mapStateToProps(state) {

let taskList = _get(state,'TaskList.lookUpData.rows');
let total = _get(state,'TaskList.lookUpData.total_rows')
return {
    taskList,
    TableData:tableDataSelector(state),
    total
    }
}

export default connect(mapStateToProps)(TaskContainer)