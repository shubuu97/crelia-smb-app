import React from 'react';
/* Assets Import */
import financialLink from "../../../../Assets/images/financial-link.svg"

const FinancialLinks = (props) => {
    
    let financialLinks = props.financialLinks.map(data => {
        if(data != "null")
        return (
            <div>
                <a href={data} className="financial-links">{data}</a>
            </div>

        )
    })

    return (
        <div className="col-sm-12" >
            <div className="inner-wrap">
                <div className="onboarding-sub-title "><img src={financialLink} height="" width="40" /> Financial Links</div>
                <div>{financialLinks}</div>
            </div>
        </div>
    )
}

export default FinancialLinks