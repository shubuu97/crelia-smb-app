import React, { Component } from 'react';
import { connect } from 'react-redux';
import { APPLICATION_BFF_URL } from '../../../Redux/urlConstants';
import { getData } from '../../../Redux/getAction';
import { postData } from '../../../Redux/postAction'
import _get from 'lodash/get';
import FundingView from './fundingView';
import CompanyView from './comapny';
import FinancialView from './financialView';
import Button from '@material-ui/core/Button';
import showMessage from '../../../Redux/toastAction';
import CircularProgress from '@material-ui/core/CircularProgress';


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
        let reqObj = { id: this.props.id }
        this.props.dispatch(
            postData(`${APPLICATION_BFF_URL}/api/PostSMB`, reqObj, 'cob-post-marketplace_init', {
                init: 'cob-post-marketplace_init',
                success: 'cob-post-marketplace_success',
                error: 'cob-post-marketplace_error'
            })
        ).then((data) => {
            this.props.dispatch(showMessage({ text: 'Update Succesfully', isSuccess: true }));
            // this.basicDataFetcher();

            setTimeout(() => {
                this.props.dispatch(showMessage({}));
                this.props.history.push('/OnBoardingAcknowlege')
            }, 1000);

        })
            .catch((err) => {
                this.props.dispatch(showMessage({ text: err.msg, isSuccess: false }));
                setTimeout(() => {
                    this.props.dispatch(showMessage({}));
                }, 6000);
            })
    }
    render() {
        return (
            <div>

                <div className="funding-details">
                    <h1>Funding Details</h1>
                    <div className="col-sm-12 card" >
                        <div className="row pad-20">
                            <div className="col-sm-3" >
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

                            <div className="col-sm-9" >
                                <FinancialView
                                    financialData={_get(this.props, 'companyDetails.financialInfo.financialData', [])}
                                    loanProvider={_get(this.props, 'companyDetails.financialInfo.loanProvider', [])}
                                    financialLinks={_get(this.props, 'companyDetails.financialInfo.financialLinks', [])}

                                />
                            </div>

                        </div>
                        <div className="common-action-block pb-15">
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