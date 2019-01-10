import React, { Component } from 'react';
import _get from 'lodash/get';
/* Global Imports*/
/* Redux Imports */
import { compose } from 'redux';
import { connect } from 'react-redux';

function SideBar(WrappedComponent) {
    return class SideBar extends Component {

        constructor(props) {
            super(props);
            this.state = {
                listItemData: []
            }
        }

        handleRoute = (type) => {
            console.log(this.props, "props is here");
            if (this.props.location.pathname != `/${type}`)
                this.props.history.push(`/${type}`);
        }

        listItemData = (data) => {
            console.log(data, 'listitemdata')
            this.setState({listItemData: data})
        }

        render() {

            return (
                <div className="about-section">
                    <div className="title-btn ">
                        <h1>Settings</h1>
                    </div>
                    <div className="col-sm-12 card" >
                        <div className="row">
                            <div className="col-sm-3" >
                                <ul className="about-tab">
                                    {_get(this.state,'listItemData', []).map(listItem => {
                                        return <li className={_get(this.props, 'location.pathname', "") == `/${listItem.path}` ? `active` : ``} onClick={() => this.handleRoute(`${listItem.path}`)}>{listItem.name}</li>
                                    })}
                                </ul>
                            </div>
                            <div className="col-sm-9" >
                                <div className="mtrb-12">
                                    <WrappedComponent 
                                        {...this.props}
                                        listItem={this.listItemData}
                                    />
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
}

export default compose(
    connect(mapStateToProps, null),
    SideBar
)


{/* <li className={_get(this.props, 'location.pathname', "") == "/settings" ? `active` : ``} onClick={() => this.handleRoute('settings')}>Privacy</li>
<li className={_get(this.props, 'location.pathname', "") == "/notifications" ? `active` : ``} onClick={() => this.handleRoute('notifications')}>Notifications</li>
<li className={_get(this.props, 'location.pathname', "") == "/myProfile" ? `active` : ``} onClick={() => this.handleRoute('myProfile')}>My Profile</li>
<li className={_get(this.props, 'location.pathname', "") == "/changePassword" ? `active` : ``} onClick={() => this.handleRoute('changePassword')}>Change Password</li> */}