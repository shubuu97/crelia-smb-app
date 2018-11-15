import React from "react";
import PropTypes from "prop-types";
/* Material Imports */
import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
/* Redux Imports*/
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

/* Components*/
import TeamMemberCard from './DisplayTeam'
import AddTeamForm from './AddTeamForm'
import sidebar from './SideBar.js';
import _get from 'lodash/get';
import { APPLICATION_BFF_URL } from '../../Redux/urlConstants';

import { getData } from '../../Redux/getAction';

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
        this.props.dispatch(
            getData(`${APPLICATION_BFF_URL}/api/CreateEmployee`, 'getEmployeeList-data', {
                init: 'getEmployeeList_init',
                success: 'getEmployeeList_success',
                error: 'getEmployeeList_error'
            })
        )
    }

    render() {
        const { classes } = this.props;
        return (




            <div className={classes.root}>

                <div className="row">
                    <ul className="staff-block">
                        <li className="col-sm-4 mb-20"> <AddTeamForm /></li>
                        {this.props.employees.map(option => (
                            <li className="col-sm-4 mb-20"> <TeamMemberCard data={option} /></li>
                        ))}

                    </ul>
                </div>
                <Button type="submit"
                    color="primary"
                    variant="contained"
                    style={{ 'float': 'right' }}
                    onClick={() => this.props.history.push('/sme/beneficiary')}>
                    Save & Continue
                 </Button>
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

//export default sidebar(withStyles(styles)(AddTeam));

function mapStateToProps(state) {

    let employees = _get(state, 'EmployeeList.lookUpData', []);

    return {
        employees
    };
}

export default connect(mapStateToProps)(sidebar(withStyles(styles)(AddTeam)));
