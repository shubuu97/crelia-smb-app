import React from 'react';
import _get from 'lodash/get';
import { APPLICATION_BFF_URL } from '../../../../Redux/urlConstants';
import { getData } from '../../../../Redux/getAction';
import { connect } from 'react-redux';

class Team extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
        }
    }

    componentDidMount() {
        if (_get(this.props, 'team')) {
            let resource = encodeURIComponent('resource:' + _get(this.props, 'team.$class') + '#' + _get(this.props, 'team.id'));

            if (this.props.viewOf == 'Employees') {
                this.getApiCall(`api/queries/ActiveTempEmployeesWithTempCompanyId?resourceId=${resource}`, 'smbEmployeeTeam').then(data => {
                    this.setState({ list: data });
                });
            }
            else {
                this.getApiCall(`api/queries/ActiveTempShareHoldersWithTempCompanyId?resourceId=${resource}`, 'smbShareHolders').then(data => {
                    this.setState({ list: data });
                });;
            }
        }
    }

    getApiCall = (url, identifier) => {
        return this.props.dispatch(getData(`${APPLICATION_BFF_URL}/${url}`, identifier, {
            init: `${identifier}_init`,
            success: `${identifier}_success`,
            error: `${identifier}_error`
        }))
    }

    render() {
        return (
            <div className="data-list">
                <div className="inner-wrap">
                    <div className="onboarding-sub-title" >
                        {/* <img src={loanProvider} height="" width="30" /> */}
                        {_get(this.props, 'header')}
                    </div>
                    <div className="row">
                        {
                            _get(this.state, 'list', []).map((item, index) => {
                                return (

                                    <div className='col-sm-4'>
                                        <span className="sub-head">#{++index}</span>
                                        <span className="list-content">
                                            <span>Name-</span>
                                            <span>{_get(item, 'firstName') + ' ' + _get(item, 'lastName')}</span>
                                        </span>
                                        <span className="list-content">
                                            <span>Designation-</span>
                                            <span>{_get(item, 'designation')}</span>
                                        </span>
                                        <span className="list-content">
                                            <span>Phone Number-</span>
                                            <span>{_get(item, 'phoneNumber')}</span>
                                        </span>
                                        <span className="list-content">
                                            <span>Email-</span>
                                            <span>{_get(item, 'email')}</span>
                                        </span>
                                        <span className="list-content">
                                            <span>Profile URL-</span>
                                            <span>{_get(item, 'url')}</span>
                                        </span>
                                    </div>

                                )
                            })

                        }
                    </div>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    let employees = _get(state, 'smbEmployeeTeam.lookUpData', []);
    let shareHolders = _get(state, 'smbShareHolders.lookUpData', []);
    return {
        employees,
        shareHolders,
    };
}

export default connect(mapStateToProps)(Team);
