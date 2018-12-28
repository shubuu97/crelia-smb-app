import React, { Component } from 'react';
import { connect } from 'react-redux';

/* Data Fetcher Imports */
import genericGetDataFetcher from '../../Global/dataFetch/genericGetData';

/* Lodash Imports */
import _get from 'lodash/get';

//Material ui import



//component imports
import TaskList from './component/TaskList';

//selector imports
import {tableDataSelector} from './selectors/taskListDataSelector'

class TaskContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        genericGetDataFetcher({
            dispatch: this.props.dispatch,
            url: '/api/FieldAccessReqTask',
            constant:{
                init:'TaskList_init',
                success:'TaskList_success',
                error:'TaskList_error'
            },
            identifier:'TaskList'
        })
    }

    render() {
        return (
            <div>
                <TaskList
                dispatch = {this.props.dispatch}
                 listData = {this.props.taskList}
                 TableData = {this.props.TableData}
                />
            </div>
        )
    }
}


function mapStateToProps(state) {

let taskList = _get(state,'TaskList.lookUpData');  
return {
    taskList,
    TableData:tableDataSelector(state)
    }
}

export default connect(mapStateToProps)(TaskContainer)