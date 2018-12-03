import React, { Component } from 'react';
import _get from 'lodash/get';
import Button from '@material-ui/core/Button'

class PreviewForm extends Component {


    render() {
        let formValues = this.props.formValues

        return (
            <div>
             <h6>SUMMARY</h6>
             <div>
             <span>Amount-</span>
             {_get(formValues,'minimum')}-{_get(formValues,'maximum')}{_get(formValues,'currency')}
             </div>
             <div>
             <span>Desired Rate-</span>
             {_get(formValues,'desiredRate')}
             </div>
             <div>
             <span>Loan Purpose</span>    
            {_get(formValues,'workingCapitalPecentage')}<div>{_get(formValues,'workingCapitalPecentage')}</div>
             {_get(formValues,'capitalExpensePecentage')}
             {_get(formValues,'refinancingPecentage')}
             </div>
            
            <div>
            <span>Other Purpose-</span>{_get(formValues,'otherPurpose')}
            </div>
             {_get(formValues,'loanTerm')}
             <div>
             <span>Time Frame-</span>{_get(formValues,'timeFrame')}
             </div>
             <div>
             <Button onClick={this.props.submitLoanDetails} color='primary' variant='contained'>Submit Details</Button>
             </div>
             
            </div>
        )
    }
}




export default PreviewForm;