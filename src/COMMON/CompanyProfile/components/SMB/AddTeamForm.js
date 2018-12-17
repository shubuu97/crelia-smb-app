import React from "react";
import PropTypes from "prop-types";
import { withState, recompose } from 'recompose';
import _get from 'lodash/get';
/* Material Imports*/
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
/* Redux Import*/
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { getData } from '../../../../Redux/getAction';
import { APPLICATION_BFF_URL } from '../../../../Redux/urlConstants';
import { postData } from '../../../../Redux/postAction';
import showMessage from '../../../../Redux/toastAction';
/* Global Imports*/
import GlobalTextField from '../../../../Global/Components/GlobalTextField'
import SelectField from '../../../../Global/Components/Select'
import DropzoneArea from '../../../../Global/dropzone/dropzoneArea';
import dropzoneHandler from '../../../../Global/dropzone/onDropDecorater';
import AddTeam from './AddTeam';

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
    }

    handleAddTeam = (values) => {
        let reqObj = {};
        let urlToHit='';
        let designation = ''
        
        if(this.props.location.pathname=='/beneficiary')
        {
            urlToHit = '/api/CreateShareHolder';
            designation='Benificiary ShareHolder';
        }
        else{
            urlToHit = '/api/CreateEmployee';
            designation=values.designation

        }
        let splittedClass = _get(this.props,'$class',).split('.');
        let companyType = splittedClass[splittedClass.length - 1];
        let  profilePictureLink=_get(this.props,'state.photolink')

        reqObj = {
            companyId: this.props.companyId,
            companyType,
            designation,
            profilePictureLink,
            id: Math.random(),
            ...values
        }
        console.log(values, 'values');

        this.props.dispatch(
            postData(`${APPLICATION_BFF_URL}${urlToHit}`, reqObj, 'addTeam-data', {
                init: 'addTeam_init',
                success: 'addTeam_success',
                error: 'addTeam_error'
            })
        ).then((data) => {
            // this.props.employeeDataFetcher();
            this.props.dispatch(showMessage({ text: 'Employee added succesfully', isSuccess: true }));
            setTimeout(() => {

                this.props.dispatch(showMessage({}));
                this.props.employeeDataFetcher();

            }, 1000);
        })
            .catch((err) => {
                console.log('Error in adding employee-', err)
                this.props.dispatch(showMessage({ text: err.msg, isSuccess: false }));
                setTimeout(() => {
                    this.props.dispatch(showMessage({}));
                }, 6000);
            })

    }

    render() {
        const { classes, handleSubmit } = this.props;
        const { expanded } = this.state;
        return (
            <div className="addmore" >
                <span className="title" onClick={this.handleChange(this.state.expanded)}>
                    <i class="material-icons"> person_add</i>
                    {this.props.type}
                </span>
                <ExpansionPanel className="boxshadownone" expanded={expanded === false}>

                    <form onSubmit={handleSubmit(this.handleAddTeam)}>
                        <ExpansionPanelDetails className={classes.details}>

                            <Grid direction="row"
                                justify="space-evenly"
                                alignItems="flex-start"
                                container
                                spacing={24}
                            >
                            {this.props.location.pathname=='/team'&&<Grid item xs={12}>
                                    <Field
                                        label="Select Position"
                                        placeholder=""
                                        name="designation"
                                        component={SelectField}
                                        variantType="outlined"
                                        options={this.props.empTypeList}
                                        fullWidth='fullWidth'
                                    />
                                </Grid>}
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
                                <Grid item xs={6}>
                                    <Field
                                        label="Phone Number"
                                        placeholder=""
                                        name="phoneNumber"
                                        component={GlobalTextField}
                                        variant="outlined"
                                        fullWidth='fullWidth'
                                    />
                                </Grid>
                                <Grid item xs={6}>
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
                                        name="url"
                                        component={GlobalTextField}
                                        variant="outlined"
                                        fullWidth='fullWidth'
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <DropzoneArea
                                        name='photo'
                                        fieldName='photo'
                                        progress={_get(this.props, 'state.photouploadProgress')}
                                        onDrop={this.props.onDrop}
                                        avialableFormat="Available File Formats: jpeg, png"
                                        accept={["image/jpg", "image/png", "image/jpeg"]}

                                        dropzone={_get(this.props, 'state.photo.name', '') || _get(this.props, 'state.photolink', '')}
                                    />
                                </Grid>
                            </Grid>


                        </ExpansionPanelDetails>
                        <Divider />
                        <ExpansionPanelActions>
                            <Button size="small" onClick={this.handleChange(false)}>Close</Button>
                            <Button type="submit" size="small" color="primary">
                                {this.props.isFetching ? <CircularProgress size={24} /> : 'Add'}
                            </Button>
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
        empTypeList.push({ value: item.value })
    ))
    let isFetching = _get(state, 'AddTeam.isFetching', false);
    return {
        empTypeList: empTypeList,
        isFetching: isFetching,
        companyId: _get(state, 'BasicInfo.lookUpData.companyDetails.id', null),
        $class: _get(state, 'BasicInfo.lookUpData.companyDetails.$class', null)

    };
}

export default connect(mapStateToProps)(withStyles(styles)(AddTeamForm));
