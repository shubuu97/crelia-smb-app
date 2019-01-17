import * as yup from 'yup';
import passwordValidator from 'password-validator';
import _get from 'lodash/get';

var schema = yup.object().shape({
    oldPassword: yup.string().required('Old password is required.'),
    newPassword: yup.mixed().test('doesnotmatch', 'New password must not equal to old password.', function (password) {
        return password !== this.parent.oldPassword
      }).required('newPassword is required.'),
    confirmPassword: yup.mixed().test('match', 'Confirm password must equal to new password.', function (password) {
    return password === this.parent.newPassword
  }).required('Confirm password is required.')
})

var passwordSchema = new passwordValidator();
passwordSchema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits()
.has().symbols()	
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Password', 'Password123']); // Blacklist these values

const asyncValidate = values => {
    console.log(values, 'values')
    return new Promise ((resolve, reject) => {
        schema.validate(values, {abortEarly: false})
            .then(() => {
                if(passwordSchema.validate(values.newPassword))
                resolve();
                else
                {
                    let reduxFormErrors = {};
                    if(_get(values,'newPassword.length',null)<8)
                    reduxFormErrors['password'] = "Length should be greater than 8"
                    else
                    {
                     reduxFormErrors['password'] = "Please choose a stronger password. Try a mix of capital,small,number and symbol"
                    }
                    reject(reduxFormErrors)
                }
            })
            .catch((errors) => {
                let reduxFormErrors = {}
                if(!passwordSchema.validate(_get(values,'newPassword','')))
                {
                    if(_get(values,'newPassword.length',null)<8)
                    reduxFormErrors['password'] = "Password must be 8 character long"
                    else
                    {
                     reduxFormErrors['password'] = "Please choose a stronger password. Try a mix of capital,small,number and symbol"
                    }
                }
                errors.inner.forEach(error => {
                    errors.inner.forEach(error => {
                        let errorMsg = error.message
                        reduxFormErrors[error.path] = errorMsg
                    })
                })
                reject(reduxFormErrors);
            })
    })
}

export default asyncValidate;