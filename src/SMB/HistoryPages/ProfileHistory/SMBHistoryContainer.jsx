import React, { Component } from 'react';
import { connect } from 'react-redux';
import _get from 'lodash/get';

import HistoryParent from '../HistoryParent/HistoryParentContainer';
import PopulateOfferData from './component/PopulateOfferData';
import PopulateComparisionOfferData from './component/PopulateComparisionOfferData'
import DetailedViewParent from '../HistoryParent/component/DetailedViewParent';
import ComparisonViewParent from '../HistoryParent/component/ComparisonViewParent'
import basicDataFetcher from '../../../Global/dataFetch/basicDataFetcher';
import genericPostData from '../../../Global/dataFetch/genericPostData';



class SMBHistoryContainer extends Component {

    constructor(props){
        super(props);
        this.state = {
            isFetching: true
        }
    }

    componentDidMount() {
        debugger
        basicDataFetcher(this.props.dispatch).then((data) => {
            let reqObj = { transactionIds: _get(data, 'companyDetails.transactionIds', []) }

            genericPostData({
                dispatch: this.props.dispatch,
                reqObj,
                url: '/api/TransactionHistory',
                constants: {
                    init: 'ProfileHistory_init',
                    success: 'ProfileHistory_success',
                    error: 'ProfileHistory_error'
                },
                successCb:()=>this.setState({isFetching: false}),
                errorCb:()=>this.setState({isFetching: false}),
                successText: '',
                dontShowMessage: true,
            })
        })
    }

    extendedComponentAction = () => {

    }
    render() {
        return (
            <HistoryParent
                isFetching={this.state.isFetching}
                dataObject={this.props.ProfileHistoryData}
                DetailedView={DetailedViewParent(
                    PopulateOfferData,
                )}
                ComparisonView={ComparisonViewParent(
                    PopulateComparisionOfferData,
                    'company'
                )}
            />
        )
    }
}

function mapStateToProps(state) {
    let ProfileHistoryData = _get(state, 'ProfileHistory.lookUpData')
    return {
        ProfileHistoryData
    }
}

export default connect(mapStateToProps)(SMBHistoryContainer)


