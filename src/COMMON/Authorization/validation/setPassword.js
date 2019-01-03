import passwordValidator from 'password-validator';
import  * as yup from 'yup';
import _get from 'lodash/get';
var schema = yup.object().shape({
    firstName:yup.string().required('required'),
    lastName:yup.string().required('required'),
    phoneNumber :yup.string().required('required'),  
    password: yup.string().required(),
    confirmNewPassword: yup.mixed().test('match', 'Passwords do not match', function (password) {
        return password === this.parent.password
      }).required('Password confirm is required'),
  });

  var passwordSchema = new passwordValidator();
 
// Add properties to it
passwordSchema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits()
.has().symbols()	
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values
const asyncValidate = values => {


    return new Promise((resolve, reject) => {


        //Validate our form values against our schema! Also dont abort the validate early.
        schema.validate(values, {abortEarly: false})
            .then(() => {
                //form is valid happy days!
                if(passwordSchema.validate(values.password))
                resolve();
                else
                {
                    let reduxFormErrors = {};
                    if(_get(values,'password.length',null)<8)
                    reduxFormErrors['password'] = "Length should be greater than 8"
                    else
                    {
                     reduxFormErrors['password'] = "Please choose a stronger password. Try a mix of capital,small,number and symbol"
                    }
                    reject(reduxFormErrors)
                }
            })
            .catch((errors) => {

                //form is not valid, yup has given us errors back. Lets transform them into something redux can understand.

                let reduxFormErrors = {};
                console.log(values,"values is here")
                if(!passwordSchema.validate(_get(values,'password','')))
                {
                    if(_get(values,'password.length',null)<8)
                    reduxFormErrors['password'] = "Password must be 8 character long"
                    else
                    {
                     reduxFormErrors['password'] = "Please choose a stronger password. Try a mix of capital,small,number and symbol"
                    }
                  }
                errors.inner.forEach(error => {
                    errors.inner.forEach(error => {
                        let messageArr = error.message.split('.');
                        let errorMsg = messageArr[messageArr.length -1]
                        let result = errorMsg.replace( /([A-Z])/g, " $1" );
                        let finalResult = result.charAt(0).toUpperCase() + result.slice(1);
                        reduxFormErrors[error.path] = finalResult;
                        })
                })
                console.log(reduxFormErrors,"reduxFormErrors");
                //redux form will now understand the errors that yup has thrown
                reject(reduxFormErrors);

            })
    });

};

export default asyncValidate;