import React from 'react';
/* Assets Import */
//import financialLink from "../../../../Assets/images/financial-link.svg"

const FinancialLinks = (props) => {

    return (
        <div>
            <div className="data-list">
                <div className="inner-wrap">
                    <span className="onboarding-sub-title pb-15">
                        {/* <img src={fundIcon} height="" width="50" />  */}
                        {props.header}</span>
                    {
                        Object.keys(props.companyDetails).map((key, index) => {
                            let title = key.replace(/([A-Z])/g, ' $1');
                            return (
                                <div className="data-list">
                                    <span className="list-content">
                                        <span>{title}</span>
                                        <span>
                                            <a style={{ color: '#007bff' }}
                                                href={props.companyDetails[key]} target="_blank">View</a>
                                        </span>
                                    </span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default FinancialLinks