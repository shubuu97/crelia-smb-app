import React, { Component } from 'react';
import _get from 'lodash/get';
/* Material Imports */
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
/* Redux Imports*/ 
import { postData } from '../../Redux/postAction';
import { connect } from 'react-redux';
import showMessage from '../../Redux/toastAction';
import { getData } from '../../Redux/getAction';
import {APPLICATION_BFF_URL} from '../../Redux/urlConstants';
import { Field, reduxForm } from 'redux-form';
/* Global Imports*/ 
import GlobalTextField from '../../Global/GlobalTextField';
import Select from '../../Global/Select';
import ToggleButtons from '../../Global/ToggleButton';
/* Components */ 
import SideBar from './SideBar';


class About extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this.props.dispatch(
            getData(`${APPLICATION_BFF_URL}/reference-service/industries`, 'IndustryList-data', {
                init: 'industry_init',
                success: 'industry_success',
                error: 'industry_error'
            })
        )
        this.props.dispatch(
            getData(`${APPLICATION_BFF_URL}/reference-service/legalEntities`, 'legalEntities-data', {
                init: 'legalEntities_init',
                success: 'legalEntities_success',
                error: 'legalEntities_error'
            })
        )

    }
    aboutSubmit = (values) => {
        this.props.dispatch(
            postData(`${APPLICATION_BFF_URL}/api/SMB`, values, 'login-data', {
                init: 'cpabout_init',
                success: 'cpabout_success',
                error: 'cpabout_error'
            })
        ).then((data) => {
            this.props.showMessage({ text: 'Saved succesfully', isSuccess: true });
            setTimeout(() => {
                this.props.dispatch(showMessage({}));
            }, 6000);
        })
            .catch((err) => {
                this.props.dispatch(showMessage({ text: err.msg, isSuccess: false }));
                setTimeout(() => {
                    this.props.dispatch(showMessage({}));
                }, 6000);
            })

    }
    render() {
        let { handleSubmit } = this.props
        return (
            <div>
                <form onSubmit={handleSubmit(this.aboutSubmit)}>
                    <div className="row">
                        <div className="col-sm-6">                           
                                <FormControl margin="normal" required fullWidth>
                                    <Field
                                        label="Company Name"
                                        placeholder="Company Name   "
                                        name="legalName"
                                        component={GlobalTextField}
                                        fullWidth={true}
                                        variant={'standard'}
                                    />
                                </FormControl>
                          
                                <FormControl margin="normal" required fullWidth>
                                    <Field
                                        label="Industry"
                                        name="industryType"
                                        component={Select}
                                        variantType='outlined'
                                        options={this.props.industryList}

                                    />
                                </FormControl>
                           
                                <FormControl margin="normal" required fullWidth>
                                    <Field
                                        variantType="outlined"
                                        label="Incorporation Type"
                                        name="legalEntityType"
                                        component={Select}
                                        options={this.props.legalEntityList}

                                    />
                                </FormControl>
                           
                                <FormControl margin="normal" required fullWidth>
                                    <Field
                                        type="date"
                                        label="Date Of Incorporation"
                                        defaultValue='2017-05-24'
                                        name="incorporationDate"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        component={GlobalTextField}
                                        fullWidth={true}


                                    />
                                </FormControl>
                            
                                <FormControl margin="normal" required fullWidth>
                                    <Field
                                        label="Registration Number"
                                        name="registrationNumber"
                                        component={GlobalTextField}
                                        variant={localStorage.getItem('TextFilledVaraint') || 'standard'}
                                        fullWidth={true}
                                    />
                                </FormControl>
                                <div className="numberemployee">
                                
                                <div className="numberOfEmployees-sub-title pt-20">Number Of Employees</div>
                                 
                                <FormControl margin="normal" required fullWidth>
                                    <Field                                       
                                        name="numberOfEmployees"
                                        component={ToggleButtons}
                                        toggleList={[
                                            { label: '1-10', alinValue: '1' },
                                            { label: '10-50', alinValue: '2' },
                                            { label: '50-100', alinValue: '3' },
                                            { label: '>100', alinValue: '4' }
                                        ]}
                                    />
                                </FormControl>   
                                </div>  
                        <div class="action-block">
                            <Button type="submit" color="primary" variant="contained">Next</Button>
                        </div>
                    </div>
                    </div>
                </form>

            </div>


        )
    }
}

About = reduxForm({
    form: 'About'
})(About);

function mapStateToProps(state) {
    let industryList = [];
    let legalEntities = [];
    _get(state.IndustryList, 'lookUpData', []).map(item => (
        industryList.push({ value: item.industry })
    ))
    _get(state.LegalEntities, 'lookUpData', []).map(item => (
        legalEntities.push({ value: item.type })
    ))
    return {
        industryList: industryList,
        legalEntityList: legalEntities
    };
}

export default connect(mapStateToProps)(SideBar(About));

