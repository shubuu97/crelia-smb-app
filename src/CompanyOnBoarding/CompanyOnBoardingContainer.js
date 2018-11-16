import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import _find from 'lodash/find'
/* Material Imports*/
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
/* Redux Imports */
import { connect } from 'react-redux';
import { postData } from '../Redux/postAction';
import showMessage from '../Redux/toastAction';
import { getData } from '../Redux/getAction';
import { APPLICATION_BFF_URL } from '../Redux/urlConstants'
/* Components*/
import FundingMain from './components/Funding/FundingMain';
import ContactContainer from './components/Contact/ContactContainer';
import FinanceInformationMain from './components/Financial/FinancialInformaionMain';
import Help from './components/Help';

var jwtDecode = require('jwt-decode');

function TabContainer({ children, dir }) {
    return (
        <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
            {children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
    dir: PropTypes.string.isRequired,
};

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: 500,
    },
});

class CompanyOnBoardingContainer extends React.Component {

    state = {
        value: 0,
    };

    constructor() {
        super();
        this.state = {
            value: 0,
        };
        this.handleNext = this.handleNext.bind(this);
    }

    componentDidMount() {
        this.basicDataFetcher();
    }

    basicDataFetcher = () => {
        if (localStorage.getItem('authToken')) {
            let decodeData = jwtDecode(localStorage.getItem('authToken'));
            
            let role = decodeData.role
    

            this.props.dispatch(
                getData(`${APPLICATION_BFF_URL}/api/${role}/${encodeURIComponent(decodeData.id)}`, 'fetchingbasicdata', {
                    init: 'basicdata_init',
                    success: 'basicdata_success',
                    error: 'basicdata_error'
                })
            )
        }
        else {
            // this.props.history.push('/')
        }
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = index => {
        this.setState({ value: index });
    };

    settings = {
        variant: 'outlined',
    };

    handleNext = (values) => {
        let id = this.props.id
        if(!this.props.id && this.props.tempId){
            id = this.props.tempId.split('#')[1]
        }

        let reqObj = {
            id:this.props.id,
            ...values
        }
        /* Post Form Data*/
        this.props.dispatch(
            postData(`${APPLICATION_BFF_URL}/api/saveSMB`, reqObj, 'cobsave', {
                init: 'cobsave_init',
                success: 'cobsave_success',
                error: 'cobsave_error'
            })
        ).then((data) => {

            this.props.dispatch(showMessage({ text: 'Update Succesfully', isSuccess: true }));
            this.basicDataFetcher();
            setTimeout(() => {
                let tabVal = this.state.value;
                if (tabVal < 2) {
                    tabVal++
                    this.setState({ value: tabVal });
                }
                this.props.dispatch(showMessage({}));
            }, 1000);

        })
            .catch((err) => {
                this.props.dispatch(showMessage({ text: err.msg, isSuccess: false }));
                setTimeout(() => {
                    this.props.dispatch(showMessage({}));
                }, 6000);
            })

        /* Switching between tabs*/

        // this.props.dispatch(
        //     getData('https://api.github.com/search/repositories?q=react', 'fjd', {
        //         init: 'cobabout_init',
        //         success: 'cobabout_success',
        //         error: 'cobabout_error'
        //     })
        // ).then(() => {
        //     console.log("done")
        // })
    };

    handleSubmitAprroval = () => {
       this.props.history.push('/ReviewCOB');
    }
    render() {
        const { classes, theme } = this.props;
        return (
            <div className="row onboard-container">
                <div className="col-sm-8">
                    <div className="card">
                        <AppBar position="static" color="default">
                            <Tabs
                                value={this.state.value}
                                onChange={this.handleChange}
                                indicatorColor="primary"
                                textColor="primary"
                                fullWidth
                            >
                                <Tab label="Funding" />
                                <Tab label="Company" />
                                <Tab label="Financials" />
                            </Tabs>
                        </AppBar>
                        <SwipeableViews
                            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                            index={this.state.value}
                            onChangeIndex={this.handleChangeIndex}
                        >
                            <TabContainer dir={theme.direction}>
                                <FundingMain
                                    isFetching={this.props.isFetchingSave}
                                    initialValues={this.props.initialValuesAbout}
                                    handleNext={this.handleNext} />
                            </TabContainer>
                            <TabContainer dir={theme.direction}>
                                <ContactContainer
                                    isFetching={this.props.isFetchingSave}
                                    handleNext={this.handleNext}
                                    initialValues={this.props.initialValuesContact} />
                            </TabContainer>
                            <TabContainer dir={theme.direction}>
                                <FinanceInformationMain
                                    isFetchingSave={this.props.isFetchingSave}
                                    isFetchingApprove={this.props.isFetchingApprove}
                                    handleSubmitAprroval={this.handleSubmitAprroval}
                                    handleNext={this.handleNext}
                                    initialValuesLoanProvider={this.props.initialValuesLoanProvider}
                                    initialValuesFinanceForm={this.props.initialValuesFinanceForm} />
                            </TabContainer>
                        </SwipeableViews>
                    </div>
                </div>
                <div className="col-sm-4 ">
                    <div className="lightgrayBG">
                        <Help activeStep={this.state.activeStep} />
                    </div>
                </div>
            </div>
        );
    }
}

CompanyOnBoardingContainer.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

function mapStateToProps(state) {

    //ONBOARDING FETCHING
    let isFetchingSave = _get(state, 'CobPost.isFetching');
    let isFetchingApprove = _get(state, 'CobApproval.isFetching');


    let username = _get(state, 'BasicInfo.lookUpData.username', null);
    let id = _get(state, 'BasicInfo.lookUpData.companyDetails.id', null);
    
    /* To be removed once fixed by Amrit */ 
    let tempId = _get(state, 'BasicInfo.lookUpData.tempCompany', "");
    /* --------------------------------- */ 

    let personalPhoneNumber = _get(state, 'BasicInfo.lookUpData.phoneNumber');
    let userEmail = _get(state, 'BasicInfo.lookUpData.email');
    let moneyRequired = _get(state, 'BasicInfo.lookUpData.companyDetails.onboardingInfo.moneyRequired');
    let timeFrame = _get(state, 'BasicInfo.lookUpData.companyDetails.onboardingInfo.timeFrame');
    let fundAllocation = _get(state, 'BasicInfo.lookUpData.companyDetails.onboardingInfo.fundAllocation');
    let fundingType = _get(state, 'BasicInfo.lookUpData.companyDetails.onboardingInfo.fundingType');

    let investment = 0;
    let workingCapital = 0;
    let refinancing = 0;
    let otherLoanDescription = '';
    if (Array.isArray(fundAllocation)) {
        let ExpansionObj = _find(fundAllocation, { purpose: 'Expansion' });
        investment = _get(ExpansionObj, 'percentage');
        let captialObj = _find(fundAllocation, { purpose: 'Working Capital' });
        workingCapital = _get(captialObj, 'percentage');
        let FinancingObj = _find(fundAllocation, { purpose: 'Re Financing' });
        refinancing = _get(FinancingObj, 'percentage');
        if(fundAllocation.length==1&&!_find(fundAllocation, { purpose: 'Expansion' })&&!_find(fundAllocation, { purpose: 'Working Capital' })&&!_find(fundAllocation, { purpose: 'Re Financing' }))
        {
        otherLoanDescription=fundAllocation[0].purpose;
        }
    }

    let loan = 0;
    let equity = 0;
    let other = 0;

    if (Array.isArray(fundingType)) {
        let loanObj = _find(fundingType, { fundingType: 'Loan' });
        loan = _get(loanObj, 'percentage');
        let equityObj = _find(fundingType, { fundingType: 'Equity' });
        equity = _get(equityObj, 'percentage');
        let otherObj = _find(fundingType, { fundingType: 'Other' });
        other = _get(otherObj, 'percentage');
    }

    let address = _get(state, 'BasicInfo.lookUpData.companyDetails.address');
    let taxId = _get(state, 'BasicInfo.lookUpData.companyDetails.taxId');
    let phoneNumber = _get(state, 'BasicInfo.lookUpData.companyDetails.phoneNumber');
    let legalEntityType = _get(state, 'BasicInfo.lookUpData.companyDetails.legalEntityType');
    let legalName = _get(state, 'BasicInfo.lookUpData.companyDetails.legalName');
    let otherCompanyName = _get(state, 'BasicInfo.lookUpData.companyDetails.onboardingInfo.otherCompanyName', '');
    let businessUnderName = otherCompanyName ? 'yes' : 'no'


    // Financial
    let financialData = _get(state, 'BasicInfo.lookUpData.companyDetails.financialInfo.financialData', []);
    let email = _get(state, 'BasicInfo.lookUpData.companyDetails.email', '')
    let manualFinancial = {};
    let incorporationDate = _get(state, 'BasicInfo.lookUpData.companyDetails.incorporationDate', '').split('T')[0].trim();
    for (let i = 0; i < financialData.length; i++) {
        let keys = Object.keys(financialData[i])
        for (let j = 1; j < keys.length; j++) {
            if (financialData[i].year == 2016) {
                manualFinancial[`${keys[j]}-2016`] = financialData[i][keys[j]]
            }
            else if (financialData[i].year == 2017) {
                manualFinancial[`${keys[j]}-2017`] = financialData[i][keys[j]]
            }
            else if (financialData[i].year == 2018) {
                manualFinancial[`${keys[j]}-2018`] = financialData[i][keys[j]]
            }
            else if (financialData[i].year == 2019) {
                manualFinancial[`${keys[j]}-2019`] = financialData[i][keys[j]]
            }
        }
    }

    let initialValuesContact = { address, taxId, phoneNumber, legalEntityType, legalName, businessUnderName, otherCompanyName, incorporationDate, email,fundAllocation,fundingType }

    let initialValuesAbout = { personalPhoneNumber, userEmail, moneyRequired, timeFrame, workingCapital, investment, refinancing,loan,equity,other,otherLoanDescription };

    let initialValuesFinanceForm = {
        manualFinancial,
        loanProvider: _get(state,'BasicInfo.lookUpData.companyDetails.financialInfo.loanProvider',[]),
        financialLinks:_get(state,'BasicInfo.lookUpData.companyDetails.financialInfo.financialLinks',[])
    };
    let initialValuesLoanProvider = _get(state,'BasicInfo.lookUpData.companyDetails.financialInfo',[])
    return { username, id, tempId, initialValuesAbout, initialValuesContact, initialValuesFinanceForm, isFetchingSave, isFetchingApprove,initialValuesLoanProvider }
}

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(CompanyOnBoardingContainer));