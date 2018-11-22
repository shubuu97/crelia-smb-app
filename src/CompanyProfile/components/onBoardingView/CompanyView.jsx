import React from 'react';
import _get from 'lodash/get';
import moment from 'moment'
import officeIcon from "../../../Assets/images/office.svg"

const CompanyView = (props) => {
    return (
        <div className="col-sm-6" >
        <div className="inner-wrap">
            <div className="onboarding-sub-title d-block pb-15"><img src={officeIcon} height="" width="32" /> Company Details</div>
            <div className="list-content"><span>Legal Name</span> <span>{props.legalName}</span></div>
            <div className="list-content"><span>Entity Type</span> <span>{props.legalEntityType}</span></div>
            <div className="list-content"><span>Tax Id</span> <span>{props.taxId}</span></div>
            <div className="list-content"><span>Other Company Name</span> <span>{props.otherCompanyName}</span></div>
            <div className="list-content"><span>Incorporation Date</span> <span>{moment(props.incorporationDate).format('DD-MM-YYYY')}</span></div>
            <div className="list-content"><span>Email</span> <span>{props.email}</span></div>
            <div className="list-content"><span>Address</span>
                <span className="address-detail">
                    {_get(props, 'address.line1')}
                    {_get(props, 'address.line2')}
                    {_get(props, 'address.zipCode')}
                </span>
            </div>
            <div className="list-content"><span>phone Number</span> <span>{props.phoneNumber}</span></div>

        </div></div>
    )
}

export default CompanyView