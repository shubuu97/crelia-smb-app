var yup = require('yup');


let schema = yup.object().shape(
    {
        firstName: yup.string().required('First Name is required'),
        lastName: yup.string().required('Last Name is required'),
        contactNumber: yup.string().required('Contact Number is required'),
        email: yup.string().required('Email is requied field').email('Should be a email'),
    }
)

const asycValidate = (values) => {
    return new Promise((resolve, reject) => {
        schema.validate(values, { abortEarly: false }).then(() => {
            resolve();
        })
            .catch(errors => {
                console.log(errors, "error is here");
                let reduxFormErrors = {};
                errors.inner.forEach(error => {
                    errors.inner.forEach(error => {
                        let messageArr = error.message.split('.');
                        let errorMsg = messageArr[messageArr.length - 1]
                        let result = errorMsg.replace(/([A-Z])/g, " $1");
                        let finalResult = result.charAt(0).toUpperCase() + result.slice(1);
                        reduxFormErrors[error.path] = finalResult;
                    })
                })

                //redux form will now understand the errors that yup has thrown
                reject(reduxFormErrors);

            })
    })
}

export default asycValidate