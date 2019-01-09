import React from "react";
import PropTypes from "prop-types";
import _get from 'lodash/get';
/* Material Imports */
import { withStyles } from "@material-ui/core/styles";
/* Redux Imports*/
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { APPLICATION_BFF_URL } from '../../../../Redux/urlConstants';
import { getData } from '../../../../Redux/getAction';
/* Components*/
import DisplayTeam from './DisplayTeam'
import AddTeamForm from './AddTeamForm'
import sidebar from '../SideBar.js';

var jwtDecode = require('jwt-decode');

const styles = theme => ({
    root: {
        width: "100%"
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120
    },
    heading: {
        fontSize: theme.typography.pxToRem(15)
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary
    },
    icon: {
        verticalAlign: "bottom",
        height: 20,
        width: 20
    },
    details: {
        alignItems: "center"
    },
    column: {
        flexBasis: "33.33%"
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: "none",
        "&:hover": {
            textDecoration: "underline"
        }
    }
});


class AddTeam extends React.Component {

    componentDidMount() {
        this.employeeDataFetcher()
    }

    employeeDataFetcher = () => {
        let decodeData = jwtDecode(localStorage.getItem('authToken'));
        this.props.dispatch(
            getData(`${APPLICATION_BFF_URL}/api/${localStorage.getItem('role')}/${encodeURIComponent(decodeData.id)}`, 'fetchingbasicdata', {
                init: 'basicdata_init',
                success: 'basicdata_success',
                error: 'basicdata_error'
            })
        ).then((data) => {
            let resource = encodeURIComponent('resource:' + data.companyDetails.$class + '#' + data.companyDetails.id)
            let deciderKey='';
            let constants = {}
            if(this.props.location.pathname == '/team')
            {
                deciderKey = 'ActiveTempEmployeesWithTempCompanyId';
                constants = {
                    init: 'getEmployeeList_init',
                    success: 'getEmployeeList_success',
                    error: 'getEmployeeList_error'
                }
            }
            else{
                deciderKey = 'ActiveTempShareHoldersWithTempCompanyId';
                constants = {
                    init: 'getshareHolderList_init',
                    success: 'getshareHolderList_success',
                    error: 'getshareHolderList_error'
                }
            }
            
            this.props.dispatch(
                getData(`${APPLICATION_BFF_URL}/api/queries/${deciderKey}?resourceId=${resource}`, 'getEmployeeList-data', constants)
            )
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <div className="row">
                    <ul className="staff-block">
                        <li className="col-sm-4 mb-20"> <AddTeamForm
                            type={this.props.location.pathname == '/team' ? 'Add Team' : 'Add Benificiary'}
                            employeeDataFetcher={this.employeeDataFetcher
                            }
                            location = {this.props.location}
                        /></li>
                        {this.props.location.pathname=='/team'?this.props.employees.map(option => (
                            <li className="col-sm-4 mb-20"> <DisplayTeam data={option} dispatch={this.props.dispatch} employeeDataFetcher={this.employeeDataFetcher}/></li>
                        )):this.props.shareHolders.map(option => (
                            <li className="col-sm-4 mb-20"> <DisplayTeam data={option} dispatch={this.props.dispatch} employeeDataFetcher={this.employeeDataFetcher}/></li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

AddTeam.propTypes = {
    classes: PropTypes.object.isRequired
};

AddTeam = reduxForm({
    form: 'AddTeamForm',
})(AddTeam)

function mapStateToProps(state) {
    let id = _get(state, 'BasicInfo.lookUpData.companyDetails.id');
    let employees = _get(state, 'EmployeeList.lookUpData', []);
    let shareHolders = _get(state,'shareHolders.lookUpData',[]);
    return {
        employees,
        id,
        shareHolders
    };
}

export default connect(mapStateToProps)(sidebar(withStyles(styles)(AddTeam)));
