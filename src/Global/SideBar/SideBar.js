import React, { Component } from 'react';
import _get from 'lodash/get';

class SideBar extends Component {

    ComponentToRender

    handleRoute = (path) => {
        if (this.props.location.pathname != path) {
            this.props.history.push(path);
        }
        _get(this.props, 'data').map(listData => {
            if(listData.path == path) {
                this.ComponentToRender = listData.component 
            }
        })
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
                            {_get(this.props, 'data').map(listItem => {
                                return <li className={_get(this.props, 'location.pathname', "") == `/${listItem.path}` ? `active` : ``} onClick={() => this.handleRoute(`${listItem.path}`)}>{listItem.label}</li>
                            })}
                            </ul>
                        </div>
                        <div className="col-sm-9" >
                            <div className="mtrb-12">
                                {this.ComponentToRender}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SideBar;
