import React, { Component } from 'react';
import _get from 'lodash/get';
/* Style Imports*/

/* Material Imports*/

/* Redux Imports */
import { connect } from 'react-redux';
import { postData } from '../../Redux/postAction';
import showMessage from '../../Redux/toastAction';
import { getData } from '../../Redux/getAction';
import { APPLICATION_BFF_URL } from '../../Redux/urlConstants'
import { commonActionCreater } from '../../Redux/commonAction'
/* Components */
import CardTable from '../../Global/CardTable/CardTable';
import Button from '@material-ui/core/Button';
import PostData from '../../Global/dataFetch/genericPostData';
import { loanDataSelector } from '../LoanRequest/selectors/loanDataSelector';

import withLoader from '../../Global/Components/withLoader'






class OfferContainer extends React.PureComponent {

    constructor() {
        super();
        this.state = {
            TableData: [],
            first: 1,
            limit: 10,
            isLoading:false
        }
    }

    componentDidMount() {
        this.basicDataFetcher();
    }

    basicDataFetcher = () => {
        debugger;
        let fundId = _get(this.props, `loanData[${this.props.rowId}].id`)
        this.setState({isLoading:true})
        this.props.dispatch(
            getData(`${APPLICATION_BFF_URL}/api/offersByFund/${fundId}`, 'fetchingLoanRequestData', {
                init: 'OfferData_init',
                success: 'OfferData_success',
                error: 'OfferData_error'
            })
            
        ).then((data)=>
        {
            this.setState({isLoading:false})
            let TableData = []
            debugger;
            data.rows.map((data, index) => {
                let time = _get(data, 'term', '-')
                if (time != '-') {
                    time = time + " year"
        
                }
                console.log("TableData data - ", data)
                let obj = {
                    name: _get(data, 'investor.legalName', '-'),
                    Amount: `${_get(data, 'moneyRange.minAmount', '')} - ${_get(data, 'moneyRange.maxAmount', '')}`,
                    Currency: `${_get(data, 'moneyRange.currency', '-')}`,
                    term: time,
                    interestRate: _get(data, 'interestRate') ? `${_get(data, 'interestRate', '')}%` : '-',
                }
        
                console.log("TableData obj - ", obj);
                let $class = _get(data, '$class');
                let $classarr = $class.split('.');
                let fundType = $classarr[$classarr.length - 1];
                if (fundType == 'Equity') {
                    obj.Amount = _get(data, 'money.amount');
                    obj.Currency = _get(data, 'money.currency')
                }
                TableData.push(obj);
            })
            this.setState({TableData})

        })
    }
    

    


   
    onShowSizeChange = (current, pageSize) => {
        this.state.first = ((current - 1) * (pageSize)) + 1;
        this.state.limit = pageSize;
        this.basicDataFetcher();
        this.setState({ first: this.state.first, limit: this.state.limit })

    }
    onPageChange = (current, pageSize) => {
        this.state.first = ((current - 1) * (pageSize)) + 1;
        this.state.limit = pageSize;
        this.basicDataFetcher();
        this.setState({ first: this.state.first, limit: this.state.limit })
    }

    getFundType = ($class) => {
        let $classarr = $class.split('.');
        let fundType = $classarr[$classarr.length - 1];
        return fundType
    }
    
    handleRequestNegotion = () => {
        this.setState({ open: false })
    }

    handleDecline = () => {

    }
    render() {
        const props = this.props;
        return (
            <div>

                {/* Card Rows */}

                <CardTable
                    menuActions={[{
                        Title: 'Request Negotiation',
                        actionEvent: this.handleRequestNegotion
                    },
                    {
                        Title: 'Decline',
                        actionEvent: this.handleDecline
                    }]}

                    headingData={[
                        'Investor',
                        'Amount',
                        'Currency',
                        'Term',
                        'Interest Rate',
                        'Action']}
                    data={this.state.TableData}
                    loader={this.state.isLoading}
                    actions={true}
                    isExtended={true}
                    filter={false}
                    onShowSizeChange={this.onShowSizeChange}
                    onPageChange={this.onPageChange}
                    chooseColor={this.chooseColor}
                    history={this.props.history}
                    hideHeader={true}
                    hidePagination={true}

                />

            </div>
        )
    }
}


function mapStateToProps(state, ownProps) {

    let TableData = [];
    let companyId = _get(state, 'BasicInfo.lookUpData.companyDetails.id', null);
    console.log("TableData - ", TableData);

    return {
        loanData: loanDataSelector(state),
        companyId,
        //fundId:_get(state,'staticReducers.fund.reqID')
    }

}

OfferContainer = connect(mapStateToProps)(withLoader(OfferContainer))

export default OfferContainer;