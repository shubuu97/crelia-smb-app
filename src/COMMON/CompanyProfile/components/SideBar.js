import React, { Component } from 'react';
import _get from 'lodash/get';
/* Global Imports*/
import LoaderButton from '../../../Global/Components/LoaderButton';
import genericPostData from '../../../Global/dataFetch/genericPostData';
/* Redux Imports */
import { compose } from 'redux';
import { connect } from 'react-redux';
import { formStatusAbout } from '../Selector/selector';
function SideBar(WrappedComponent) {
    return class SideBar extends Component {

        constructor(props) {
            super(props)
        }

        handleRoute = (type) => {
            console.log(this.props, "props is here");
            if (this.props.location.pathname != `/company-profile/${type}`)
                this.props.history.push(`/${type}`);
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
            })
        }
        formStatus = (status) => {
            console.log(status, "status")
        }

        render() {
            console.log("render");
            let active = _get(this.props, 'location.pathname', "") == "/company-profile/general" ? true : false

            return (
                <div className="about-section">
                    <div className="title-btn ">
                        <h1>Company Profile</h1>
                        <LoaderButton
                            isFetching={this.props.isFetchingPostUpdateToMarketPlace}
                            onClick={this.postMarketPlace}
                            color="primary"
                            className="mb-10"
                            variant="contained">Post to market place</LoaderButton>
                    </div>
                    <div className="col-sm-12 card" >
                        <div className="row">
                            <div className="col-sm-3" >
                                <ul className="about-tab">
                                    <li className={_get(this.props, 'location.pathname', "") == "/about" ? `active ${_get(this, 'props.formStatusAbout.status')} ` : null} onClick={() => this.handleRoute('about')}>About </li>
                                    <li className={_get(this.props, 'location.pathname', "") == "/contacts" ? 'active' : null} onClick={() => this.handleRoute('contacts')}>Contacts</li>
                                    <li className={_get(this.props, 'location.pathname', "") == "/team" ? 'active' : null} onClick={() => this.handleRoute('team')}>Team</li>
                                    <li className={_get(this.props, 'location.pathname', "") == "/marketingMaterials" ? 'active' : null} onClick={() => this.handleRoute('marketingMaterials')}>Marketing Materials</li>
                                    <li className={_get(this.props, 'location.pathname', "") == "/legal" ? 'active' : null} onClick={() => this.handleRoute('legal')}>Legal</li>
                                    <li className={_get(this.props, 'location.pathname', "") == "/financials" ? 'active' : null} onClick={() => this.handleRoute('financials')}>Financials</li>
                                    <li className={_get(this.props, 'location.pathname', "") == "/beneficiary" ? 'active' : null} onClick={() => this.handleRoute('beneficiary')}>Benificiary Shareholders</li>
                                    <li className={_get(this.props, 'location.pathname', "") == "/onboardingview" ? 'active' : null} onClick={() => this.handleRoute('onboardingview')}>OnBoarding View</li>
                                </ul>
                            </div>
                            <div className="col-sm-9" >
                                <div className="mtrb-12">
                                    <WrappedComponent formStatus={this.formStatus} {...this.props} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

function mapStateToProps(state) {
    //getting all the data for about
    // let formStatusAbout = '';
    let isFetchingPostUpdateToMarketPlace = _get(state, 'CobPostMarketPlace.isFetching');
    // let legalEntityType = _get(state, 'BasicInfo.lookUpData.companyDetails.legalEntityType', null);
    // let legalName = _get(state, 'BasicInfo.lookUpData.companyDetails.legalName');
    // let incorporationDate = _get(state, 'BasicInfo.lookUpData.companyDetails.incorporationDate', '').split('T')[0].trim();
    // let registrationNumber = _get(state, 'BasicInfo.lookUpData.companyDetails.registrationNumber');
    // let numberOfEmployees = _get(state, 'BasicInfo.lookUpData.companyDetails.numberOfEmployees');
    // let industryType = _get(state, 'BasicInfo.lookUpData.companyDetails.industryType');


    // "line1" "line2" "zipCode" "city" "region" "country" "phoneNumber" "email"

    //Login to show status for formStatus in About section
    // if (legalEntityType && legalName && incorporationDate && registrationNumber && industryType) {
    //     formStatusAbout = 'green'
    // }
    // else if (legalEntityType || legalName || incorporationDate || registrationNumber || numberOfEmployees || industryType) {
    //     formStatusAbout = 'yellow'
    // }
    // else {
    //     formStatusAbout = 'red'
    // }

    return { isFetchingPostUpdateToMarketPlace, formStatusAbout: formStatusAbout(state) }
}
export default compose(
    connect(mapStateToProps, null),
    SideBar
)
