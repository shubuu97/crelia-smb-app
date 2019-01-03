import React, { Component } from 'react';
import { connect } from 'react-redux';
import _get from 'lodash/get';
import PopulateOfferData from './component/PopulateOfferData';
import genericGetDataFetcher from '../../../../Global/dataFetch/genericGetData';
import genericPostData from '../../../../Global/dataFetch/genericPostData';
import LoaderButton from '../../../../Global/Components/LoaderButton';


class TaskDetailsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fieldAccessRequest: []
        }
    }

    componentDidMount() {
        let requestedFields = _get(this.props,`taskList[${this.props.rowId}].requestedFields`,[]);
        this.setState({requestedFields})
    }
    FieldAccessReqTask = (reqObj) => {
        this.setState({ fieldAccessRequest: reqObj })
    }
    submitRequest = () => {
        console.log(this.state.fieldAccessRequest, Object.keys(this.state.fieldAccessRequest))
        let allowedFields = Object.keys(this.state.fieldAccessRequest)
            .filter((key, index) => this.state.fieldAccessRequest[key])
            .map(data => data.toUpperCase());
        let reqObj = {};
        reqObj.task = _get(this.props,`taskList[${this.props.rowId}].id`,[]);
        reqObj.allowedFields = allowedFields;
        this.setState({loading:true})
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
                <PopulateOfferData
                    FieldAccessReqTask={this.FieldAccessReqTask}
                    fields={this.state.fieldAccessRequest}
                    dataObject={this.state.requestedFields}
                />
                 <LoaderButton
                    onClick={this.submitRequest}
                    isFetching = {this.state.loading}
                    color='primary' variant='contained'>Apply</LoaderButton>
            </React.Fragment>

        )
    }
}

function mapStateToProps(state) {
    let taskList = _get(state,'TaskList.lookUpData');  

    return {
        taskList
    }
}

export default connect(mapStateToProps)(TaskDetailsContainer)

