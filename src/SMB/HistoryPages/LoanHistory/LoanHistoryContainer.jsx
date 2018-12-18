import React, { Component } from 'react';
import { connect } from 'react-redux';

/* Component Imports */
import PopulateDataDetail from './component/PopulateDataDetail';
import PopulateDataComparison from './component/PopulateDataComparison';
import HistoryParent from '../HistoryParent/HistoryParentContainer';
import ComparisonViewParent from '../HistoryParent/component/ComparisonViewParent';
import DetailedViewParent from '../HistoryParent/component/DetailedViewParent'



class LoanHistory extends Component {
    
    //callback when compare history checkbox are clicked
    
    render() {
        return (
            <React.Fragment>
                <HistoryParent
                DetailedView= {DetailedViewParent(PopulateDataDetail)}
                ComparisonView = {ComparisonViewParent(PopulateDataComparison,'fund')}
                 />
            </React.Fragment>
        )
    }
}



export default LoanHistory;