import React, {Component} from 'react';
import FormControl from '@material-ui/core/FormControl';
import { Field } from 'redux-form';
import GlobalTextField from '../../../../Global/Components/GlobalTextField';

class ChangePassword extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-sm-12">
                    <FormControl margin="normal" required fullWidth>
                        <Field
                            label="Old Password"
                            placeholder=""
                            name="oldPassword"
                            component={GlobalTextField}
                            variant="standard"
                            id="oldPassword"
                            fullWidth='fullWidth'
                            type="Password"
                        />
                    </FormControl>
                </div>
                <div className="col-sm-12">
                    <FormControl margin="normal" required fullWidth>
                        <Field
                            label="New Password"
                            placeholder=""
                            name="newPassword"
                            component={GlobalTextField}
                            variant="standard"
                            id="newPassword"
                            fullWidth='fullWidth'
                            type="Password"
                        />
                    </FormControl>
                </div>
                <div className="col-sm-12">
                    <FormControl margin="normal" required fullWidth>
                        <Field
                            label="Confirm Password"
                            placeholder=""
                            name="confirmPassword"
                            component={GlobalTextField}
                            variant="standard"
                            id="confirmPassword"
                            fullWidth='fullWidth'
                            type="Password"
                        />
                    </FormControl>
                </div>
            </div>
        )
    }
}

export default ChangePassword;