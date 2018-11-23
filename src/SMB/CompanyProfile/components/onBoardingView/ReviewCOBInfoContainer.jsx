import React, { Component } from 'react';
import _get from 'lodash/get';
/* Redux Imports*/
import { connect } from 'react-redux';
import { APPLICATION_BFF_URL } from '../../../../Redux/urlConstants';
import { getData } from '../../../../Redux/getAction';
/* Material Imports */
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
/* Global Imports*/
import genericPostData from '../../../../Global/dataFetch/genericPostData'
/* Components Import*/
import CompanyView from './CompanyView';
import FundingView from './FundingView';
import FinancialDataTable from './FinancialDataTable';
import LoanProvider from './LoanProvider';
import FinancialLinks from './FinancialLinks';


var jwtDecode = require('jwt-decode');

class ReviewCOBInfoContainer extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        let decodeData = jwtDecode(localStorage.getItem('authToken'));
        let role = decodeData.role;

        this.props.dispatch(
            getData(`${APPLICATION_BFF_URL}/api/${role}/${encodeURIComponent(decodeData.id)}`, 'fetchingbasicdata', {
                init: 'basicdata_init',
                success: 'basicdata_success',
                error: 'basicdata_error'
            })
        )
    }
    postMarketPlace = () => {
        let reqObj = { id: this.props.id };
        genericPostData({
            dispatch: this.props.dispatch,
            reqObj: { ...reqObj },
            url: '/api/PostSMB',
            constants: {
                init: 'cob-post-marketplace_init',
                success: 'cob-post-marketplace_success',
                error: 'cob-post-marketplace_error'
            },
            identifier: 'cob-post-marketplace_init',
            successText: 'Upload Success',
            successTimeOutCb: () => this.props.history.push('/OnBoardingAcknowlege')

        })
    }

    render() {
        return (
            <div>
                <div className="funding-details">
                    <h1>Funding Details</h1>
                    <div>
                        <div className="row">
                            <CompanyView
                                legalName={_get(this.props, 'companyDetails.legalName')}
                                legalEntityType={_get(this.props, 'companyDetails.legalEntityType')}
                                taxId={_get(this.props, 'companyDetails.taxId')}
                                otherCompanyName={_get(this.props, 'companyDetails.onboardingInfo.otherCompanyName')}
                                incorporationDate={_get(this.props, 'companyDetails.incorporationDate')}
                                address={_get(this.props, 'companyDetails.address')}
                                phoneNumber={_get(this.props, 'companyDetails.phoneNumber')}
                                email={_get(this.props, 'companyDetails.email')}
                            />
                            <FundingView
                                moneyRequired={_get(this.props, 'companyDetails.onboardingInfo.moneyRequired')}
                                timeFrame={_get(this.props, 'companyDetails.onboardingInfo.timeFrame')}
                                fundAllocation={_get(this.props, 'companyDetails.onboardingInfo.fundAllocation', [])}
                                fundingType={_get(this.props, 'companyDetails.onboardingInfo.fundingType', [])}
                            />
                        </div>
                        <div className="row pt-20">
                            <LoanProvider
                                loanProvider={_get(this.props, 'companyDetails.financialInfo.loanProvider', [])}
                            />
                            <FinancialLinks
                                financialLinks={_get(this.props, 'companyDetails.financialInfo.financialLinks', [])}
                            />
                        </div>
                        <div className="row  pt-20">
                            <FinancialDataTable
                                financialData={_get(this.props, 'companyDetails.financialInfo.financialData', [])}
                            />
                        </div>
                        <div className="common-action-block pb-15">
                            <Button disabled={this.props.isFetchingPostMarketPlace} onClick={this.postMarketPlace} variant='contained' color='primary'>
                                {this.props.isFetchingPostMarketPlace ? <CircularProgress size={24} /> : 'POST TO THE MARKET PLACE'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    let id = _get(state, 'BasicInfo.lookUpData.companyDetails.id', null);

    let companyDetails = _get(state, 'BasicInfo.lookUpData.companyDetails');
    let isFetchingPostMarketPlace = _get(state, 'CobPostMarketPlace.isFetching')
    return { companyDetails, isFetchingPostMarketPlace, id }
}


export default connect(mapStateToProps)(ReviewCOBInfoContainer)