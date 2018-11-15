import React from 'react';
import _get from 'lodash/get';
import moment from 'moment'

const companyView=(props)=>
{
    return (
        <div>
        <div>Company Details</div>
        <div>{props.legalName}</div>
        <div>{props.legalEntityType}</div>
        <div>{props.taxId}</div>
        <div>{props.otherCompanyName}</div>
        <div>{moment(props.incorporationDate).format('DD-MM-YYYY')}</div>
        <div>{props.email}</div>
        <div>{_get(props,'address.line1')}</div>
        <div>{_get(props,'address.line2')}</div>
        <div>{_get(props,'address.zipCode')}</div>
        <div>{props.phoneNumber}</div>

        </div>
    )
}

export default companyView