import React, {Component} from 'react';
import {connect} from 'react-redux';

// Global Imports
import genericPostData from '../../../Global/dataFetch/genericPostData';
import LoaderButton from '../../../Global/Components/LoaderButton';
import SideBar from '../../../Global/SideBar/sideBar';

// Lodash Imports
import _get from 'lodash/get';

// Assets
import historyIcon from '../../../Assets/images/history-icon.png';

// Selector
import { formStatusAbout, formStatusContact, formStatusMarketingMaterial, formStatusLegal, formStatusTeam, formStatusBenificiary, formStatusFinancials } from '../Selector/selector';

// SMB Imports
import About from './SMB/About';
import Contacts from './SMB/Contacts';
import Team from './SMB/AddTeam';
import Marketing from './SMB/marketingMaterial';
import Legal from './SMB/legal';
import Financials from './SMB/financials';
import BenificiaryShareholders from './SMB/BeneficiaryShareholders';

class CompanyProfileContainer extends Component {

    sideBarData = [
        {path: "about", label: "About", component: About, extraClass: this.props.formStatusAbout.status},
        {path: "contacts", label: "Contacts", component: Contacts, extraClass: this.props.formStatusContact.status},
        {path: "team", label: "Team", component: Team, extraClass: this.props.formStatusTeam.status},
        {path: "marketing", label: "Marketing Materials", component: Marketing, extraClass: this.props.formStatusMarketingMaterial.status},
        {path: "legal", label: "Legal", component: Legal, extraClass: this.props.formStatusLegal.status},
        {path: "financials", label: "Financials", component: Financials, extraClass: this.props.formStatusFinancials.status},
        {path: "benificiaryShareholders", label: "Benificiary Shareholders", component: BenificiaryShareholders, extraClass: this.props.formStatusBenificiary.status},
        // {path: "onboardingView", label: "OnBoarding View", component: Employee, extraClass: false}
    ]

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
        })
    }

    render() {
        return (
            <div>
                <div className="title-btn ">
                    <h1 >
                        Company Profile
                    </h1>
                    <div className="flex-row align-center mb-10">
                        <a className="mr-20" onClick={() => this.props.history.push('/profile/history')}>
                            <img title="Show history" src={historyIcon} style={{width: '38px'}}/>
                        </a>
                        <LoaderButton
                            isFetching={this.props.isFetchingPostUpdateToMarketPlace}
                            onClick={this.postMarketPlace}
                            color="primary"
                            className=""
                            variant="contained">
                            Post to market place
                        </LoaderButton>
                    </div>
                </div>
                <SideBar 
                    routePath="company-profile" 
                    history={this.props.history} 
                    data={this.sideBarData} 
                />
            </div>
        )
    }
}

function mapStateToProps(state) {
    // let id = _get(state, 'BasicInfo.lookUpData.company.id');    
    let isFetchingPostUpdateToMarketPlace = _get(state,'CobPostMarketPlace.isFetching');

    return {
        isFetchingPostUpdateToMarketPlace, 
        // id,
        formStatusAbout: formStatusAbout(state),
        formStatusContact: formStatusContact(state),
        formStatusMarketingMaterial: formStatusMarketingMaterial(state),
        formStatusLegal: formStatusLegal(state),
        formStatusTeam: formStatusTeam(state),
        formStatusBenificiary: formStatusBenificiary(state),
        formStatusFinancials: formStatusFinancials(state)
    }
}

export default connect(mapStateToProps)(CompanyProfileContainer);