import React from "react";
import PropTypes from "prop-types";
import _get from 'lodash/get';
import { withState } from 'recompose';
/* Material Imports */
import { withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
/* Redux Imports*/
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { APPLICATION_BFF_URL } from '../../../../Redux/urlConstants';
import { getData } from '../../../../Redux/getAction';
import { postData } from '../../../../Redux/postAction';
import showMessage from '../../../../Redux/toastAction';
/* Global Imports*/
import GlobalTextField from '../../../../Global/Components/GlobalTextField'
import SelectField from '../../../../Global/Components/Select'
import DropzoneArea from '../../../../Global/dropzone/dropzoneArea';
import dropzoneHandler from '../../../../Global/dropzone/onDropDecorater';
/* Components*/
import DisplayTeam from './DisplayTeam'
import AddTeamForm from './AddTeamForm'

var jwtDecode = require('jwt-decode');


class UpdateTeamDialogue extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            openModal: false,
            isFetching: false
        }
    }

    componentDidMount() {
        this.props.dispatch(
            getData(`${APPLICATION_BFF_URL}/reference-service/empType`, 'empTypeList-data', {
                init: 'empType_init',
                success: 'empType_success',
                error: 'empType_error'
            })
        )
    }

    handleUpdateTeam = (values) => {
        let reqObj = {};
        let urlToHit = '';
        let designation = ''

        if (this.props.location.pathname == '/beneficiary') {
            urlToHit = '/api/SaveShareHolder';
            designation = 'Benificiary ShareHolder';
        }
        else {
            urlToHit = '/api/SaveEmployee';
            designation = values.designation
        }


        let splittedClass = _get(this.props, '$class').split('.');
        let companyType = splittedClass[splittedClass.length - 1];
        let profilePictureLink = _get(this.props, 'state.photolink')

        reqObj = {
            companyId: this.props.companyId,
            companyType,
            designation,
            profilePictureLink,
            ...values
        }
        console.log(values, '- mak');
        this.setState({isFetching: true})
        this.props.dispatch(
            postData(`${APPLICATION_BFF_URL}${urlToHit}`, reqObj, 'addTeam-data', {
                init: 'addTeam_init',
                success: 'addTeam_success',
                error: 'addTeam_error'
            })
        ).then((data) => {
            this.props.dispatch(showMessage({ text: 'Employee updated succesfully', isSuccess: true }));
            setTimeout(() => {
                this.props.dispatch(showMessage({}));
            }, 1000);
            this.setState({isFetching: false})
            this.props.closeModal();
            this.props.employeeDataFetcher();
            this.props.reset();
            this.props.vanishImage('photo')
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
        console.log(this.props, 'this props dialogue')
        const { classes, handleSubmit } = this.props;
        return (
            <Dialog
                open={this.props.openModal}
                onClose={this.props.closeModal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <form onSubmit={handleSubmit(this.handleUpdateTeam)}>
                    <DialogTitle id="alert-dialog-title">
                        Edit Member
                    </DialogTitle>
                    <DialogContent>
                        <Grid
                            direction="row"
                            justify="space-evenly"
                            alignItems="flex-start"
                            container
                            spacing={24}
                        >
                            {this.props.location.pathname == '/team' && <Grid item xs={12}>
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
                    </DialogContent>
                    <DialogActions>
                        <Button size="small" onClick={this.props.closeModal}>Close</Button>
                        <Button type="submit" size="small" color="primary">
                            {this.state.isFetching ? <CircularProgress size={24} /> : 'Update'}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        );
    }
}

UpdateTeamDialogue.propTypes = {
    classes: PropTypes.object.isRequired
};

UpdateTeamDialogue = reduxForm({
    form: 'UpdateTeamForm',
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
})(UpdateTeamDialogue)

const state = withState('state', 'setState', '')
UpdateTeamDialogue = state(dropzoneHandler(UpdateTeamDialogue));

function mapStateToProps(state) {
    let companyId = _get(state, 'BasicInfo.lookUpData.companyDetails.id');
    let shareHolders = _get(state, 'shareHolders.lookUpData', []);
    let empTypeList = [];
    _get(state.EmpTypeList, 'lookUpData', []).map(item => (
        empTypeList.push({ value: item.value })
    ))
    return {
        empTypeList,
        companyId,
        shareHolders,
        $class: _get(state, 'BasicInfo.lookUpData.companyDetails.$class', null)
    };
}

export default connect(mapStateToProps)(UpdateTeamDialogue);
