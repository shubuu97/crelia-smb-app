import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import { Field, reduxForm } from 'redux-form';
import Grid from '@material-ui/core/Grid';

import TeamMemberCard from './DisplayTeam'
import AddTeamForm from './AddTeamForm'
import sidebar from './SideBar.js'


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

    render() {
        const { classes } = this.props;
        return (

<div className="row">
    <ul className="staff-block">
    <li className="col-sm-4 mb-20"> <AddTeamForm /></li>
    <li className="col-sm-4 mb-20"> <TeamMemberCard /></li>
    <li className="col-sm-4 mb-20"> <TeamMemberCard /></li>
    <li className="col-sm-4 mb-20"> <TeamMemberCard /></li>
    <li className="col-sm-4 mb-20"> <TeamMemberCard /></li>
    <li className="col-sm-4 mb-20"> <TeamMemberCard /></li>
    <li className="col-sm-4 mb-20"> <TeamMemberCard /></li>
    <li className="col-sm-4 mb-20"> <TeamMemberCard /></li>
    </ul>
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

export default sidebar(withStyles(styles)(AddTeam));