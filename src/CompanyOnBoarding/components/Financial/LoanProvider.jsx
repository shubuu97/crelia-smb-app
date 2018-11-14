import React,{Component} from 'react';
import {reduxForm,Field,FieldArray} from 'redux-form';
import Button from '@material-ui/core/Button';
import GlobalTextField from '../../../Global/GlobalTextField';
import FormControl from '@material-ui/core/FormControl';


const LoanProviderComp = (props)=>
{
  const {fields} = props;
  if(fields.length==0)
  fields.push()
return(   
<div>
<div> 
{fields.map((loanProvider, index) => (
    <div key={index}>
  <FormControl  margin="normal" required fullWidth>
      <Field
        name={`${loanProvider}.providerName`}
        component={GlobalTextField}
        label='Provider Name'
        variant="standard"
        fullWidth='fullWidth'
      />
      </FormControl>
      <FormControl  margin="normal" required fullWidth>
        <Field
        name={`${loanProvider}.amount`}
        component={GlobalTextField}
        label='Ammount'
        variant="standard"
        fullWidth='fullWidth'
      />
      </FormControl>
      <FormControl  margin="normal">    
 <Button variant='contained' color='secondary' onClick={()=>fields.remove(index)}>Remove</Button>
 </FormControl>
    </div>
  ))}

</div>
<FormControl  margin="normal">   
<Button variant='contained' color='primary' onClick={()=>fields.push()}>Add</Button>
</FormControl>

</div>
 )

    
    

}
 class LoanProvider extends Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return (
            <form>
            <FieldArray name='loanProvider' component={LoanProviderComp}/>
            </form>
        )
    }
}

LoanProvider = reduxForm({
form:'LoanProvider'}
)(LoanProvider);

export default LoanProvider