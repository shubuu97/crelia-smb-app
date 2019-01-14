import * as yup from 'yup';

var schema = yup.object().shape({
    oldPassword: yup.string().required('Old password is required.'),
    newPassword: yup.mixed().test('doesnotmatch', 'New password must not equal to old password.', function (password) {
        return password !== this.parent.oldPassword
      }).required('newPassword is required.'),
    confirmPassword: yup.mixed().test('match', 'Confirm password must equal to new password.', function (password) {
    return password === this.parent.newPassword
  }).required('Confirm password is required.')
})

const asyncValidate = values => {
    return new Promise ((resolve, reject) => {
        schema.validate(values, {abortEarly: false})
            .then(() => {
                resolve();
            })
            .catch((errors) => {
                let reduxFormErrors = {}
                errors.inner.forEach(error => {
                    let errorMsg = error.message
                    reduxFormErrors[error.path] = errorMsg
                })
                reject(reduxFormErrors);
            })
    })
}

export default asyncValidate;