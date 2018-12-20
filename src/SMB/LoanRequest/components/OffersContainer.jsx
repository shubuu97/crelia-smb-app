import React, { Component } from 'react';
import _get from 'lodash/get';
/* Global Imports */
import withLoader from '../../../Global/Components/withLoader';
import genericPostData from '../../../Global/dataFetch/genericPostData'
import CardTable from '../../../Global/CardTable/CardTable';
/* Redux Imports */
import { connect } from 'react-redux';
import { getData } from '../../../Redux/getAction';
import { APPLICATION_BFF_URL } from '../../../Redux/urlConstants'
import { commonActionCreater } from '../../../Redux/commonAction'
/* Components */
import { loanDataSelector } from '../selectors/loanDataSelector';
import formatMoney from '../../../Global/Components/normalizingMoneyField';


class OfferContainer extends React.PureComponent {

    constructor() {
        super();
        this.state = {
            TableData: [],
            first: 1,
            limit: 10,
            isLoading: false,
            headingData: [],
            offerData: null
        }
    }
    getFundType = ($class) => {
        let $classarr = $class.split('.');
        let fundType = $classarr[$classarr.length - 1];
        return fundType
    }
    componentDidMount() {
        this.basicDataFetcher();
        this.setState({ isLoading: false });
        let fundType = this.getFundType(_get(this.props, `loanData[${this.props.rowId}].$class`));


        if (fundType == "Loan") {
            this.setState({
                headingData: ['Investor',
                    'Amount',
                    'Currency',
                    'Term',
                    'Interest Rate',
                    'Action']
            })
        }
        else {
            this.setState({
                headingData: ['Investor',
                    'Amount',
                    'Currency',
                    'Board Membership',
                    'Range',
                    'Action']
            })
        }
    }

    basicDataFetcher = () => {

        let fundId = _get(this.props, `loanData[${this.props.rowId}].id`)
        this.setState({ isLoading: true })
        this.props.dispatch(
            getData(`${APPLICATION_BFF_URL}/api/offersByFund/${fundId}`, 'fetchingLoanRequestData', {
                init: 'OfferData_init',
                success: 'OfferData_success',
                error: 'OfferData_error'
            })

        ).then((data) => {

            this.setState({ offerData: data })
            let TableData = []

            data.rows.map((data, index) => {
                let time = _get(data, 'term', '-')
                if (time != '-') {
                    time = time + " year"

                }
                let fundType = this.getFundType(_get(data, '$class'))
                let obj = {};
                if (fundType == 'LoanOffer') {

                    obj = {
                        name: _get(data, 'investor.legalName', '-'),
                        Amount: `${formatMoney(_get(data, 'moneyRange.minAmount', ''))} - ${formatMoney(_get(data, 'moneyRange.maxAmount', ''))}`,
                        Currency: `${_get(data, 'moneyRange.currency', '-')}`,
                        term: time,
                        interestRate: _get(data, 'interestRate') ? `${_get(data, 'interestRate', '')}%` : '-',
                        transactionId: {
                            type: 'hidden',
                            data: _get(data, 'transactionIds')
                        }
                    }
                }
                //todo which field need to be shown in the table
                else if (fundType == 'EquityOffer') {
                    obj.name = _get(data, 'investor.legalName', '-');
                    obj.Amount = formatMoney(_get(data, `money.amount`));
                    obj.Currency = _get(data, 'money.currency');
                    obj.isBoardMembership = data.isBoardMembership ? 'Yes' : 'No';
                    obj.Range = `${_get(data, 'lowerValue')}-${_get(data, 'upperValue')}`
                }
                TableData.push(obj);
            })
            this.setState({ TableData })

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

    //todo handle negotiation to be discussed
    handleRequestNegotion = () => {
        this.setState({ open: false });
    }

    handleDecline = (data, index) => {
        console.log(data, index, this.state, "here");
        let id = _get(this.state, `offerData.rows[${index}].id`);
        let offerType = this.getFundType(_get(this.state, `offerData.rows[${index}].$class`));
        let comment = "some dummy comment";
        let reqObj = { id, offerType, comment };
        this.setState({ isLoading: true })
        genericPostData({
            dispatch: this.props.dispatch,
            url: '/api/DeclineOffer',
            reqObj,
            constants: {
                init: 'DeclineOffer_init',
                success: 'DeclineOffer_success',
                error: 'DeclineOffer_error'
            },
            successText: 'Offer Declined successFully',
            successCb: () => this.setState({ isLoading: false }),
            errorCb: () => this.setState({ isLoading: false })
        })
    }

    redirectToHistory = (data, index) => {
        debugger
        this.props.dispatch(commonActionCreater({
            fund_transactionIds: _get(data, `transactionId.data`)
        }, 'SAVE_fund_transactionIds'));
        window.location = "/#/LoanOfferHistory" // ! Ask Yogi to check the redirect
    }

    render() {
        const props = this.props;
        return (
            <div>

                {/* Card Rows */}

                <CardTable
                    menuActions={
                        [
                            { Title: 'Request Negotiation', actionEvent: this.handleRequestNegotion },
                            { Title: 'Decline', actionEvent: this.handleDecline },
                            { Title: 'Show History', actionEvent: this.redirectToHistory },
                        ]
                    }

                    headingData={this.state.headingData}
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

    let companyId = _get(state, 'BasicInfo.lookUpData.companyDetails.id', null);

    return {
        loanData: loanDataSelector(state),
        companyId,
        //fundId:_get(state,'staticReducers.fund.reqID')
    }

}

OfferContainer = connect(mapStateToProps)(withLoader(OfferContainer))

export default OfferContainer;