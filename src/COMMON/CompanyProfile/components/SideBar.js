import React, { Component } from 'react';
import _get from 'lodash/get';
/* Global Imports*/
import LoaderButton from '../../../Global/Components/LoaderButton';
import genericPostData from '../../../Global/dataFetch/genericPostData';
/* Redux Imports */
import { compose } from 'redux';
import { connect } from 'react-redux';
import { formStatusAbout,formStatusContact,formStatusMarketingMaterial,formStatusLegal } from '../Selector/selector';
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
                                    <li className={_get(this.props, 'location.pathname', "") == "/about" ? `active ${_get(this, 'props.formStatusAbout.status')} ` : `${_get(this, 'props.formStatusAbout.status')} `} onClick={() => this.handleRoute('about')}>About </li>
                                    <li className={_get(this.props, 'location.pathname', "") == "/contacts" ? `active ${_get(this, 'props.formStatusContact.status')}` : `${_get(this, 'props.formStatusContact.status')}`} onClick={() => this.handleRoute('contacts')}>Contacts</li>
                                    <li className={_get(this.props, 'location.pathname', "") == "/team" ? `active ${_get(this, 'props.formStatusAbout.status')} ` : `${_get(this, 'props.formStatusAbout.status')} `} onClick={() => this.handleRoute('team')}>Team</li>
                                    <li className={_get(this.props, 'location.pathname', "") == "/marketingMaterials" ? `active ${_get(this, 'props.formStatusMarketingMaterial.status')} ` : `${_get(this, 'props.formStatusMarketingMaterial.status')} `} onClick={() => this.handleRoute('marketingMaterials')}>Marketing Materials</li>
                                    <li className={_get(this.props, 'location.pathname', "") == "/legal" ? `active ${_get(this, 'props.formStatusLegal.status')} ` : `${_get(this, 'props.formStatusLegal.status')} `} onClick={() => this.handleRoute('legal')}>Legal</li>
                                    <li className={_get(this.props, 'location.pathname', "") == "/financials" ? `active ${_get(this, 'props.formStatusAbout.status')} ` : `${_get(this, 'props.formStatusAbout.status')} `} onClick={() => this.handleRoute('financials')}>Financials</li>
                                    <li className={_get(this.props, 'location.pathname', "") == "/beneficiary" ? `active ${_get(this, 'props.formStatusAbout.status')} ` : `${_get(this, 'props.formStatusAbout.status')} `} onClick={() => this.handleRoute('beneficiary')}>Benificiary Shareholders</li>
                                    <li className={_get(this.props, 'location.pathname', "") == "/onboardingview" ? `active ${_get(this, 'props.formStatusAbout.status')} ` : `${_get(this, 'props.formStatusAbout.status')} `} onClick={() => this.handleRoute('onboardingview')}>OnBoarding View</li>
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
    let isFetchingPostUpdateToMarketPlace = _get(state, 'CobPostMarketPlace.isFetching');
    return { isFetchingPostUpdateToMarketPlace,
         formStatusAbout: formStatusAbout(state),
         formStatusContact:formStatusContact(state),
         formStatusMarketingMaterial:formStatusMarketingMaterial(state),
         formStatusLegal:formStatusLegal(state)
        };
}
export default compose(
    connect(mapStateToProps, null),
    SideBar
)
