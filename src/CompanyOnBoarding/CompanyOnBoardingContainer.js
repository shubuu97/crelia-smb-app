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
/* Components*/
import CompanyOnBoarding from './components/About/AboutMain';
import ContactContainer from './components/Contact/ContactContainer';
import FinanceInformationMain from './components/Financial/FinancialInformaionMain';
import Help from './components/Help';
import showMessage from '../Redux/toastAction';
import { getData } from '../Redux/getAction'



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

    basicDataFetcher = () => {

        if (localStorage.getItem('authToken')) {
            let decodeData = jwtDecode(localStorage.getItem('authToken'));
            let role = decodeData.role
            if (decodeData.role == 'TempSMBUser') {
                role = 'SMBUser';
                localStorage.setItem('role', role)
            }
            if (decodeData.role == 'TempInvestorUser') {
                role = 'InvestorUser';
                localStorage.setItem('role', role)
            }
            this.props.dispatch(
                getData(`http://13.233.38.55:4005/api/${role}/${encodeURIComponent(decodeData.id)}`, 'fetchingbasicdata', {
                    init: 'basicdata_init',
                    success: 'basicdata_success',
                    error: 'basicdata_error'
                })
            )
        }
        else {
            this.props.history.push('/')
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
        let reqObj = {
            ...values, id: this.props.id
        }
        /* Post Form Data*/
        this.props.dispatch(
            postData('http://13.233.38.55:4005/api/saveSMB', reqObj, 'cob-data', {
                init: '',
                success: '',
                error: ''
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

    componentDidMount() {
        this.basicDataFetcher();
    }
    handleSubmitAprroval = () => {
        let reqObj = { id: this.props.id }
        this.props.dispatch(
            postData('http://13.233.38.55:4005/api/SendSMBForApproval', reqObj, 'cob-approval', {
                init: 'approval_init',
                success: 'approval_success',
                error: 'approval_error'
            })
        ).then((data) => {
            this.props.dispatch(showMessage({ text: 'Update Succesfully', isSuccess: true }));
            this.basicDataFetcher();
            setTimeout(() => {
                this.props.dispatch(showMessage({}));
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
                                <Tab label="About" />
                                <Tab label="Company" />
                                <Tab label="Finance" />
                            </Tabs>
                        </AppBar>
                        <SwipeableViews
                            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                            index={this.state.value}
                            onChangeIndex={this.handleChangeIndex}
                        >
                            <TabContainer dir={theme.direction}>
                                <CompanyOnBoarding initialValues={this.props.initialValuesAbout} handleNext={this.handleNext} />
                            </TabContainer>
                            <TabContainer dir={theme.direction}>
                                <ContactContainer handleNext={this.handleNext} initialValues={this.props.initialValuesContact} />
                            </TabContainer>
                            <TabContainer dir={theme.direction}>
                                <FinanceInformationMain
                                    handleSubmitAprroval={this.handleSubmitAprroval}
                                    handleNext={this.handleNext}
                                    initialValues={this.props.initialValuesFinance} />
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
    let username = _get(state, 'BasicInfo.lookUpData.username', null);
    let id = _get(state, 'BasicInfo.lookUpData.companyDetails.id');
    let personalPhoneNumber = _get(state, 'BasicInfo.lookUpData.phoneNumber');
    let userEmail = _get(state, 'BasicInfo.lookUpData.email');
    let moneyRequired = _get(state, 'BasicInfo.lookUpData.companyDetails.onboardingInfo.moneyRequired');
    let timeFrame = _get(state, 'BasicInfo.lookUpData.companyDetails.onboardingInfo.timeFrame');
    let loanAllocation = _get(state, 'BasicInfo.lookUpData.companyDetails.onboardingInfo.loanAllocation');
    let expansion = 0;
    let workingCapital = 0;
    let refinancing = 0;
    if (Array.isArray(loanAllocation)) {
        let ExpansionObj = _find(loanAllocation, { loanPurpose: 'Expansion' });
        expansion = _get(ExpansionObj, 'percentage');
        let captialObj = _find(loanAllocation, { loanPurpose: 'Working Capital' });
        workingCapital = _get(captialObj, 'percentage');
        let FinancingObj = _find(loanAllocation, { loanPurpose: 'Re Financing' });
        refinancing = _get(FinancingObj, 'percentage');
    }

    let address = _get(state, 'BasicInfo.lookUpData.companyDetails.address');
    let taxId = _get(state, 'BasicInfo.lookUpData.companyDetails.taxId');
    let phoneNumber = _get(state, 'BasicInfo.lookUpData.companyDetails.phoneNumber');
    let legalEntityType = _get(state, 'BasicInfo.lookUpData.companyDetails.legalEntityType');
    let legalName = _get(state, 'BasicInfo.lookUpData.companyDetails.legalName');
    let isOtherShortTermLoan = _get(state, 'BasicInfo.lookUpData.companyDetails.onboardingInfo.isOtherShortTermLoan');
    isOtherShortTermLoan = isOtherShortTermLoan ? 'yes' : 'no'
    let otherCompanyName = _get(state, 'BasicInfo.lookUpData.companyDetails.onboardingInfo.otherCompanyName');
    otherCompanyName = otherCompanyName ? 'yes' : 'no'

    // Financial
    let financialData = _get(state, 'BasicInfo.lookUpData.companyDetails.financialInfo.financialData', []);
    let email = _get(state, 'BasicInfo.lookUpData.companyDetails.email', '')
    let financeVars = {};
    let incorporationDate = _get(state, 'BasicInfo.lookUpData.companyDetails.incorporationDate', '').split('T')[0].trim();
    for (let i = 0; i < financialData.length; i++) {
        let keys = Object.keys(financialData[i])
        for (let j = 1; j < keys.length; j++) {
            if (financialData[i].year == 2016) {
                financeVars[`${keys[j]}-2016`] = financialData[i][keys[j]]
            }
            else if (financialData[i].year == 2017) {
                financeVars[`${keys[j]}-2017`] = financialData[i][keys[j]]
            }
            else if (financialData[i].year == 2018) {
                financeVars[`${keys[j]}-2018`] = financialData[i][keys[j]]
            }
        }
    }

    let initialValuesContact = { address, taxId, phoneNumber, legalEntityType, legalName, isOtherShortTermLoan, otherCompanyName, incorporationDate, email }

    let initialValuesAbout = { personalPhoneNumber, userEmail, moneyRequired, timeFrame, workingCapital, expansion, refinancing };

    let initialValuesFinance = {
        ...financeVars
    }

    return { username, id, initialValuesAbout, initialValuesContact, initialValuesFinance }
}

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(CompanyOnBoardingContainer));