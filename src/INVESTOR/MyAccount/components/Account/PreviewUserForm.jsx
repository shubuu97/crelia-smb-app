import React from 'react';
/* Material Imports*/
import Button from '@material-ui/core/Button';

const PreviewUserForm = ({ firstName, lastName, email, phoneNumber, companyName, positionCompany, valid, anyTouched }) => {

  return (
    <div classsName="form-output" style={{ width: '40%' }}>
      <h5>User Data</h5>
      <hr />
      <div> {firstName}</div>
      <div>{lastName}</div>
      <div>{phoneNumber}</div>
      <div>{email}</div>
      <h5>Company Data</h5>
      <hr />
      <div>{companyName}</div>
      <div>{positionCompany}</div>
      {anyTouched && valid ? <Button type="submit" color="primary" variant="contained">Submit</Button> : null}
    </div>
  )
}


export default PreviewUserForm;