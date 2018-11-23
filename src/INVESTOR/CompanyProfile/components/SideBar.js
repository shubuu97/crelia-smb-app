import React, { Component } from 'react';
import _get from 'lodash/get';
/* Global Imports*/
import LoaderButton from '../../../Global/Components/LoaderButton';
import genericPostData from '../../../Global/dataFetch/genericPostData';
/* Redux Imports */
import { compose } from 'redux';
import { connect } from 'react-redux';

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

        render() {
            console.log("render");
            let active = _get(this.props, 'location.pathname', "") == "/company-profile/general" ? true : false

            return (
                <div className="about-section">
                    <div style={{
                        'display': 'flex',
                        alignItems: 'flex - end',
                        justifyContent: 'space-between',
                        flexDirection: 'row'
                    }}>
                        <h1>Company Profile</h1>
                        <LoaderButton
                            isFetching={this.props.isFetchingPostUpdateToMarketPlace}
                            onClick={this.postMarketPlace}
                            color="primary"
                            variant="contained">Post to market place</LoaderButton>
                    </div>
                    <div className="col-sm-12 card" >
                        <div className="row">
                            <div className="col-sm-3" >
                                <ul className="about-tab">
                                    <li className={_get(this.props, 'location.pathname', "") == "/company-profile/general" ? 'active' : null} onClick={() => this.handleRoute('about')}>About</li>
                                    <li className={_get(this.props, 'location.pathname', "") == "/company-profile/contacts" ? 'active' : null} onClick={() => this.handleRoute('contacts')}>Contacts</li>
                                    <li className={_get(this.props, 'location.pathname', "") == "/company-profile/team" ? 'active' : null} onClick={() => this.handleRoute('team')}>Team</li>
                                    <li className={_get(this.props, 'location.pathname', "") == "/company-profile/assets" ? 'active' : null} onClick={() => this.handleRoute('legal')}>Legal</li>
                                </ul>
                            </div>
                            <div className="col-sm-9" >
                                <div className="mtrb-12">
                                    <WrappedComponent {...this.props} />
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
    let isFetchingPostUpdateToMarketPlace = _get(state, 'CobPostMarketPlace.isFetching')
    return { isFetchingPostUpdateToMarketPlace }
}
export default compose(
    connect(mapStateToProps, null),
    SideBar
)
