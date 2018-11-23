import React, { Component } from 'react';
import _get from 'lodash/get'
/* Material Imports*/
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import CircularProgress from '@material-ui/core/CircularProgress';
/* Global Imports*/
import GlobalTextField from '../../../../Global/Components/GlobalTextField';
/* Redux Imports*/
import { reduxForm, Field, FieldArray } from 'redux-form';


const LoanProviderComp = (props) => {
    const { fields } = props;
    if (fields.length == 0 || fields.length == undefined)
        fields.push()
    return (
        <div>
            <div>
                {fields.map((loanProvider, index) => (
                    <div key={index}>
                        <div className="row align-items-center pb-20">
                            <div className="col-sm-5">
                                <FormControl className="inner-control" margin="normal" required fullWidth>
                                    <Field
                                        name={`${loanProvider}.providerName`}
                                        component={GlobalTextField}
                                        label='Provider Name'
                                        variant="standard"
                                        fullWidth='fullWidth'
                                    />
                                </FormControl>
                            </div>
                            <div className="col-sm-5">
                                <FormControl className="inner-control" margin="normal" required fullWidth>
                                    <Field
                                        name={`${loanProvider}.amount`}
                                        component={GlobalTextField}
                                        label='Amount'
                                        variant="standard"
                                        fullWidth='fullWidth'
                                        type="number"
                                        startAdornment="$"
                                    />
                                </FormControl>
                            </div>
                            <div className="col-sm-2">
                                <FormControl margin="normal">
                                    <i title='Delete' class="material-icons delete-provider" color='secondary' onClick={() => fields.remove(index)}>
                                        delete_outline
                                    </i>
                                </FormControl>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="row align-items-center pb-20">
                <div className="col-sm-2 offset-sm-10">
                    <i class="material-icons add-more" onClick={() => fields.push()}>add_circle_outline</i>
                </div>
            </div>
        </div>
    )
}
class LoanProvider extends Component {

    constructor(props) {
        super(props);
    }

    handleSubmitLoanProvider = (values) => {
        let reqObj = {};
        reqObj.financialInfo = { ...values };
        this.props.handleNext(reqObj)
    }

    handleReview = () => {
        let hocSubmitFunc = this.props.handleSubmit(this.handleSubmitLoanProvider);
        hocSubmitFunc();
        this.props.handleSubmitAprroval()
    }

    render() {
        let { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleSubmitLoanProvider)} >
                <FieldArray name='loanProvider' component={LoanProviderComp} />
                <div class="common-action-block col-sm-12 pt-78">
                    <Button
                        type="submit"
                        fullWidth
                        disabled={localStorage.getItem('companyStatus') == 'PENDING_APPROVAL' ? true : false || this.props.isFetching}
                        variant="contained"
                        color="primary"
                        className="btnprimary"
                    >
                        {this.props.isFetchingSave ? <CircularProgress size={24} /> : 'Save Draft'}
                    </Button>
                    {
                        localStorage.getItem('companyStatus') == 'PENDING_APPROVAL' ? null :
                            <Button
                                fullWidth
                                onClick={this.handleReview}
                                variant='contained'
                                className="btnprimary  ml-35"
                                color='primary'>
                                Review
                        </Button>
                    }
                </div>
            </form>
        )
    }
}

LoanProvider = reduxForm({
    form: 'LoanProvider',
    enableReinitialize: true,
    keepDirtyOnReinitialize: true
}
)(LoanProvider);

export default LoanProvider