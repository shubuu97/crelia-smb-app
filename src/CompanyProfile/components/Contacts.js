import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import GlobalTextField from '../../Global/GlobalTextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '../../Global/Select';
import Button from '@material-ui/core/Button';
import sidebar from './SideBar';
import { connect } from 'react-redux';
import { getData } from '../../Redux/getAction';
import _get from 'lodash/get';

class Contacts extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this.props.dispatch(
            getData('http://13.233.38.55:4005/reference-service/allowedCountries', 'CountryList-data', {
                init: 'country_init',
                success: 'country_success',
                error: 'country_error'
            })
        )
    }
    render() {
        console.log(localStorage.getItem('TextFilledVaraint'), "hii")
        return (
            <div className="row">
                        <div className="col-sm-6">
                <FormControl margin="normal" required fullWidth>
                <Field
                    name="Street"
                    component={GlobalTextField}
                    label="Street"
                    variant={localStorage.getItem('TextFilledVaraint') || 'standard'}
                />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                <Field
                    name="Street2"
                    component={GlobalTextField}
                    label="Street,Line 2"
                    variant={localStorage.getItem('TextFilledVaraint') || 'standard'}
                />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                <Field
                    name="zip"
                    component={GlobalTextField}
                    label="Zip Code"
                    variant={localStorage.getItem('TextFilledVaraint') || 'standard'}
                />
                 </FormControl>
                <FormControl margin="normal" required fullWidth>
                <Field
                    name="city"
                    component={GlobalTextField}
                    label="City"
                    variant={localStorage.getItem('TextFilledVaraint') || 'standard'}
                />
                  </FormControl>
                <FormControl margin="normal" required fullWidth>
                <Field
                    name="region"
                    component={GlobalTextField}
                    label="Region"
                    variant={localStorage.getItem('TextFilledVaraint') || 'standard'}
                />
                  </FormControl>
                <FormControl margin="normal" required fullWidth>
                {/* <Field
                    name="country"
                    component={GlobalTextField}
                    label="Country"
                    variant={localStorage.getItem('TextFilledVaraint') || 'standard'}
                /> */}
                <Field
                    label="Country"
                    name="country"
                    component={Select}
                    variantType='outlined'
                    options={this.props.countryList}
                // fullWidth="true"
                />
                  </FormControl>
                <h4 className="pt-20">Contacts</h4>
                <FormControl margin="normal" required fullWidth>                
                <Field
                    name="phoneNumber"
                    component={GlobalTextField}
                    label="Phone Number"
                    variant={localStorage.getItem('TextFilledVaraint') || 'standard'}
                />
                  </FormControl>
                <FormControl margin="normal" required fullWidth>
                <Field
                    name="corporateEmail"
                    component={GlobalTextField}
                    label="Corporate Email"
                    variant={localStorage.getItem('TextFilledVaraint') || 'standard'}
                />
                </FormControl>


                <div class="action-block">
                <Button color="primary" variant="contained">Next</Button>
                </div>
            </div>
            </div>
        )
    }
}

Contacts = reduxForm({
    form: 'Contact'
})(Contacts)

function mapStateToProps(state) {
    let countryList = [];
    _get(state.CountryList, 'lookUpData', []).map(item => (
        countryList.push({ value: item.name })
    ))

    return { countryList };
}

export default connect(mapStateToProps)(sidebar(Contacts));


