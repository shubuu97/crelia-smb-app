import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { Field, reduxForm } from 'redux-form';
import Grid from '@material-ui/core/Grid';
import GlobalTextField from '../../Global/GlobalTextField'
import SelectField from '../../Global/Select'
import Card from '@material-ui/core/Card';
import DropzoneArea from '../../Global/dropzoneArea';
import dropzoneHandler from '../../Global/onDropDecorater';
import { withState, recompose } from 'recompose'
import { connect } from 'react-redux';
import { getData } from '../../Redux/getAction'
import _get from 'lodash/get';
import {APPLICATION_BFF_URL} from '../../Redux/urlConstants'

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



class AddTeamForm extends React.Component {
    state = {
        expanded: true,
    };

    componentDidMount() {
        this.props.dispatch(
            getData(`${APPLICATION_BFF_URL}/reference-service/empType`, 'empTypeList-data', {
                init: 'empType_init',
                success: 'empType_success',
                error: 'empType_error'
            })
        )
    }

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: !panel,
        });
    };


    render() {
        const { classes } = this.props;
        const { expanded } = this.state;

        return (
            <div className="addmore"  onClick={this.handleChange(this.state.expanded)} >
             <span className="title"><i class="material-icons"> person_add</i> Add Team</span>
                <ExpansionPanel className="boxshadownone" expanded={expanded === false}>                    
                    <form onSubmit={this.props.handleSubmit}>
                        <ExpansionPanelDetails className={classes.details}>
                            <Grid direction="row"
                                justify="space-evenly"
                                alignItems="flex-start"
                                container
                                spacing={12}
                            >
                                <Grid item xs={12}>
                                    <Field
                                        label="Select Position"
                                        placeholder=""
                                        name="position"
                                        component={SelectField}
                                        variantType="outlined"
                                        options={this.props.empTypeList}
                                        fullWidth='fullWidth'

                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Field
                                        label="First Name"
                                        placeholder=""
                                        name="firstName"
                                        component={GlobalTextField}
                                        variant="outlined"
                                        fullWidth='fullWidth'
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Field
                                        label="Last Name"
                                        placeholder=""
                                        name="lastName"
                                        component={GlobalTextField}
                                        variant="outlined"
                                        fullWidth='fullWidth'
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        label="Email Address"
                                        placeholder=""
                                        name="email"
                                        type='email'
                                        component={GlobalTextField}
                                        variant="outlined"
                                        fullWidth='fullWidth'
                                    />

                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        label="Linkedin Profile"
                                        placeholder=""
                                        name="text"
                                        component={GlobalTextField}
                                        variant="outlined"
                                        fullWidth='fullWidth'
                                    />
                                </Grid>
                                <Grid item xs={12}><DropzoneArea
                                    name='photo'
                                    fieldName='photo'
                                    onDrop={this.props.onDrop}
                                /></Grid>
                            </Grid>


                        </ExpansionPanelDetails>
                        <Divider />
                        <ExpansionPanelActions>
                            <Button size="small" onClick={this.handleChange(false)}>Close</Button>
                            <Button type="submit" size="small" variant="contained" color="primary"> Save </Button>
                        </ExpansionPanelActions>
                    </form>

                </ExpansionPanel>
            </div>
        );
    }
}
AddTeamForm.propTypes = {
    classes: PropTypes.object.isRequired
};



AddTeamForm = reduxForm({
    form: 'AddTeamForm',
})(AddTeamForm)

const state = withState('state', 'setState', '')
AddTeamForm = state(dropzoneHandler(AddTeamForm));

function mapStateToProps(state) {
    let empTypeList = [];
    _get(state.EmpTypeList, 'lookUpData', []).map(item => (
        empTypeList.push({ value: item.type })
    ))
    return {
        empTypeList: empTypeList
    };
}

export default connect(mapStateToProps)(withStyles(styles)(AddTeamForm));
