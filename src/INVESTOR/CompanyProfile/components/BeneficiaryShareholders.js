import React from "react";
import { withState, recompose } from 'recompose'
import PropTypes from "prop-types";
/* Material Imports*/
import { withStyles } from "@material-ui/core/styles";
import FormControl from '@material-ui/core/FormControl';
/* Redux Imports*/
import { Field, reduxForm, fiel } from 'redux-form';
/* Global Imports*/
import GlobalTextField from '../../../Global/Components/GlobalTextField'
import DropzoneArea from '../../../Global/dropzone/dropzoneArea';
import dropzoneHandler from '../../../Global/dropzone/onDropDecorater';
/* Components Imports*/
import sidebar from './SideBar.js'

const styles = theme => ({
    root: {
        width: "100%"
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120
    },
});

class BeneficiaryShareholder extends React.Component {
    
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <form >
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="row">
                                <div className="col-sm-6">
                                    <FormControl margin="normal" required fullWidth>
                                        <Field
                                            label="First Name"
                                            placeholder=""
                                            name="firstName"
                                            component={GlobalTextField}
                                            variant="outlined"
                                            fullWidth='fullWidth'
                                        /></FormControl>
                                </div>
                                <div className="col-sm-6">
                                    <FormControl margin="normal" required fullWidth>
                                        <Field
                                            label="Last Name"
                                            placeholder=""
                                            name="lastName"
                                            component={GlobalTextField}
                                            variant="outlined"
                                            fullWidth='fullWidth'
                                        /></FormControl>
                                </div>
                                <div className="col-sm-6">
                                    <FormControl margin="normal" required fullWidth>
                                        <Field
                                            label="Email Address"
                                            placeholder=""
                                            name="email"
                                            type='email'
                                            component={GlobalTextField}
                                            variant="outlined"
                                            fullWidth='fullWidth'
                                        />
                                    </FormControl>
                                </div>
                                <div className="col-sm-6">
                                    <FormControl margin="normal" required fullWidth>
                                        <Field
                                            label="Linkedin Profile"
                                            placeholder=""
                                            name="text"
                                            component={GlobalTextField}
                                            variant="outlined"
                                            fullWidth='fullWidth'
                                        /></FormControl>
                                </div>
                                <div className="col-sm-12 pt-20">
                                    <DropzoneArea
                                        name='photo'
                                        fieldName='photo'
                                        onDrop={this.props.onDrop}
                                    /></div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

        );
    }
}

BeneficiaryShareholder.propTypes = {
    classes: PropTypes.object.isRequired
};

BeneficiaryShareholder = reduxForm({
    form: 'BeneficiaryShareholderForm',
})(BeneficiaryShareholder)

const state = withState('state', 'setState', '')
BeneficiaryShareholder = state(dropzoneHandler(BeneficiaryShareholder));

export default sidebar(withStyles(styles)(BeneficiaryShareholder));