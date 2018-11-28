import React, { Component } from 'react';
import { Field, reduxForm,getFormValues } from 'redux-form';
import GlobalTextField from '../../Global/Components/GlobalTextField';
import formatMoney from '../../Global/Components/normalizingMoneyField';
import FormControl from '@material-ui/core/FormControl';
import Select from '../../Global/Components/Select';
import GlobalCheckBox from '../../Global/Components/GlobalCheckBox';
import {connect} from 'react-redux';
import PreviewForm from './components/PreviewForm'

class CreateRequestContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            workingCapital: false
        }
    }

    handleCheck = (name, b) => {
        this.setState({ [name]: b })
    }
    render() {

        console.log(this.props,'qqqqq')
        return (
            <div className="row">
             <div className='col-sm-8'>
                <FormControl margin="normal" required fullWidth>
                    <Field
                        label='Minimum'
                        name='minimum'
                        component={GlobalTextField}
                        fullWidth={true}
                        normalize={formatMoney}
                    />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                    <Field
                        label='Maximum'
                        name='maximum'
                        component={GlobalTextField}
                        fullWidth={true}
                        normalize={formatMoney}
                    />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                    <Field
                        label="Currency"
                        name="currency"
                        component={Select}
                        variantType='outlined'
                        options={this.props.industryList}
                    />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                    <Field
                        label='Desired Rate'
                        name='desiredRate'
                        component={GlobalTextField}
                        fullWidth={true}
                        normalize={formatMoney}
                        endAdornment="%"
                    />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                    <Field
                        label='Working Capital'
                        name='workingCapital'
                        color='primary'
                        component={GlobalCheckBox}
                        onChange={(e, value) => this.handleCheck('workingCapital', value)}
                    />
                    {this.state.workingCapital ?
                        <Field
                            label='Part of loan(%)'
                            name='workingCapitalPecentage'
                            component={GlobalTextField}
                            fullWidth={true}
                            normalize={formatMoney}
                            endAdornment="%"
                        /> : null
                    }
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                    <Field
                        label='Capital Expense'
                        name='capitalExpense'
                        color='primary'
                        component={GlobalCheckBox}
                        onChange={(e, value) => this.handleCheck('capitalExpense', value)}
                    />
                    {this.state.capitalExpense ?
                        <Field
                            label='Part of loan(%)'
                            name='capitalExpensePecentage'
                            component={GlobalTextField}
                            fullWidth={true}
                            normalize={formatMoney}
                            endAdornment="%"
                        /> : null
                    }
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                    <Field
                        label='Refinancing'
                        name='refinancing'
                        color='primary'
                        component={GlobalCheckBox}
                        onChange={(e, value) => this.handleCheck('refinancing', value)}
                    />
                    {this.state.refinancing ?
                        <Field
                            label='Part of loan(%)'
                            name='refinancingPecentage'
                            component={GlobalTextField}
                            fullWidth={true}
                            normalize={formatMoney}
                            endAdornment="%"
                        /> : null
                    }
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                    <Field
                        label='Other purpose..'
                        name='otherPurpose'
                        component={GlobalTextField}
                        fullWidth={true}
                    />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                    <Field
                        label="Loan Term"
                        name="loanTerm"
                        component={Select}
                        variantType='outlined'
                        options={this.props.industryList}
                    />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                    <Field
                        label='Time Frame'
                        name='timeFrame'
                        component={GlobalTextField}
                        type='date'
                        fullWidth={true}
                    />
                </FormControl>
                </div>
                <div className='col-sm-4'>
                  <PreviewForm formValues={this.props.formValues}/>
                </div>
            </div>
        )
    }
}

CreateRequestContainer = reduxForm({
    form: 'createLoanRequest'
})(CreateRequestContainer);

function mapStateToProps(state)
{
    return {formValues: getFormValues('createLoanRequest')(state),
}

}



export default connect(mapStateToProps)(CreateRequestContainer)
;