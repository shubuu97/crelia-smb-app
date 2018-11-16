import React from 'react';
import _get from 'lodash/get';
import moment from 'moment'

const companyView=(props)=>
{
    return (
        <div>
         <div className="onboarding-sub-title d-block pb-15">Company Details</div>
        <div className="list-content"><span>legal Name</span> {props.legalName}</div>
        <div className="list-content"><span>Entity Type</span> {props.legalEntityType}</div>
        <div className="list-content"><span>tax Id</span> {props.taxId}</div>
        <div className="list-content"><span>Other Company Name</span> {props.otherCompanyName}</div>
        <div className="list-content"><span>Incorporation Date</span> {moment(props.incorporationDate).format('DD-MM-YYYY')}</div>
        <div className="list-content"><span>Email</span> {props.email}</div>
        <div className="list-content"><span>Address</span>
            <span className="address-detail">
            {_get(props,'address.line1')}<br/>
            {_get(props,'address.line2')}<br/>
            {_get(props,'address.zipCode')}  
            </span>      
        </div>        
        <div  className="list-content"><span>phone Number</span>{props.phoneNumber}</div>

        </div>
    )
}

export default companyView