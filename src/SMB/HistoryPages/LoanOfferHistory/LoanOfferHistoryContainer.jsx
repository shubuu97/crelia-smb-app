import React, { Component } from 'react';
import HistoryParent from '../HistoryParent/HistoryParentContainer';
import PopulateOfferData from './component/PopulateOfferData';
import PopulateComparisionOfferData from './component/PopulateComparisionOfferData'
import DetailedViewParent from '../HistoryParent/component/DetailedViewParent';
import ComparisonViewParent from '../HistoryParent/component/ComparisonViewParent'


class LoanOfferHistoryContainer extends Component {
    render() {
        return (
            <HistoryParent
            DetailedView= {DetailedViewParent(PopulateOfferData)}
            ComparisonView = {ComparisonViewParent(PopulateComparisionOfferData,'offer')}

             />
        )
    }
}

export default LoanOfferHistoryContainer;


