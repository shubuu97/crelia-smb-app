import React from "react";
import PropTypes from "prop-types";
import _get from 'lodash/get';
/* Material Imports */
import { withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
/* Redux Imports*/
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { APPLICATION_BFF_URL } from '../../../../Redux/urlConstants';
import { getData } from '../../../../Redux/getAction';
/* Global Imports*/
import GlobalTextField from '../../../../Global/Components/GlobalTextField'
import SelectField from '../../../../Global/Components/Select'
import DropzoneArea from '../../../../Global/dropzone/dropzoneArea';
import dropzoneHandler from '../../../../Global/dropzone/onDropDecorater';
/* Components*/
import DisplayTeam from './DisplayTeam'
import AddTeamForm from './AddTeamForm'
import UpdateTeamDialogue from './UpdateTeamDialogue'
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

    constructor(props) {
        super(props)
        this.state = {
            openModal: false,
            editTeam: {}
        }
    }

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
            let deciderKey = '';
            let constants = {}
            if (this.props.location.pathname == '/team') {
                deciderKey = 'ActiveTempEmployeesWithTempCompanyId';
                constants = {
                    init: 'getEmployeeList_init',
                    success: 'getEmployeeList_success',
                    error: 'getEmployeeList_error'
                }
            }
            else {
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

    editTeamMem = (data) => {
        let designation = ''
        let urlToHit = '';
        if (this.props.location.pathname == '/beneficiary') {
            urlToHit = '/api/SaveShareHolder';
            designation = 'Benificiary ShareHolder';
        }
        else {
            urlToHit = '/api/SaveEmployee';
            designation = data.designation

        }
        this.setState({
            openModal: true,
            editTeam: {
                firstName: data.firstName,
                lastName: data.lastName,
                phoneNumber: data.phoneNumber,
                email: data.email,
                url: data.url,
                photo: data.photo,
                designation: data.designation,
                id: data.id
            }
        })
    }

    closeModal = () => {
        this.setState({
            openModal: false
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <div className="row">
                    <ul className="staff-block">
                        <li className="col-sm-4 mb-20">
                            <AddTeamForm
                                type={this.props.location.pathname == '/team' ? 'Add Team' : 'Add Benificiary'}
                                employeeDataFetcher={this.employeeDataFetcher}
                                location={this.props.location}
                            />
                        </li>
                        {this.props.location.pathname == '/team' ? this.props.employees.map(option => (
                            <li className="col-sm-4 mb-20">
                                <DisplayTeam
                                    data={option}
                                    dispatch={this.props.dispatch}
                                    employeeDataFetcher={this.employeeDataFetcher}
                                    editTeamMem={this.editTeamMem}
                                    location={this.props.location} 
                                />
                            </li>
                        )) : this.props.shareHolders.map(option => (
                            <li className="col-sm-4 mb-20">
                                <DisplayTeam
                                    data={option}
                                    dispatch={this.props.dispatch}
                                    employeeDataFetcher={this.employeeDataFetcher}
                                    editTeamMem={this.editTeamMem}
                                    location={this.props.location}
                                />
                            </li>
                        ))}
                    </ul>
                </div>

                <UpdateTeamDialogue
                    initialValues={this.state.editTeam}
                    openModal={this.state.openModal}
                    closeModal={this.closeModal}
                    location={this.props.location}
                    employeeDataFetcher={this.employeeDataFetcher}
                />

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
    let shareHolders = _get(state, 'shareHolders.lookUpData', []);
    return {
        employees,
        id,
        shareHolders
    };
}

export default connect(mapStateToProps)(sidebar(withStyles(styles)(AddTeam)));
