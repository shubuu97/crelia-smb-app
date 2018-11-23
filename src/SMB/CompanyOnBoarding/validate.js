var yup = require('yup');


let schema = yup.object().shape(
{
    email:yup.string().required('Email is requied field').email('Should be a email'),
}
)

const asycValidate = (values)=>
{
return new Promise((resolve,reject)=>
{
    schema.validate(values,{abortEarly:false}).then(()=>
{
    resolve();
})
.catch(error=>
{
    console.log(error,"error is here");
    let reduxFormError= {};
    reduxFormError.email='this will be always errored'
    return error;
})
})
}

export default asycValidate