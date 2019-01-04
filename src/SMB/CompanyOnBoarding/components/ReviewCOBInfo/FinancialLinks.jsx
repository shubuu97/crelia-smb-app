import React from 'react';
/* Assets Import */
import financialLink from "../../../../Assets/images/financial-link.svg"

const FinancialLinks = (props) => {
    
    let balanceSheet = props.balanceSheet.map(data => {
        if(data != "null")
        return (
            <div>
                <a href={data} className="financial-links">{data}</a>
            </div>

        )
    })
    let businessPlan = props.businessPlan.map(data => {
        if(data != "null")
        return (
            <div>
                <a href={data} className="financial-links">{data}</a>
            </div>

        )
    })
    let cashFlow = props.cashFlow.map(data => {
        if(data != "null")
        return (
            <div>
                <a href={data} className="financial-links">{data}</a>
            </div>

        )
    })

    return (
        <div className="col-sm-12 " >
            <div className="inner-wrap">
                <div className="onboarding-sub-title "><img src={financialLink} height="" width="40" /> Financial Links</div>
                <div className="row">
                 <div className = "col-sm-4">
                 <div><label>Balance Sheet</label>{balanceSheet}</div>
                 </div>
                 <div className = "col-sm-4">
                 <div><label>Business Plan</label>{businessPlan}</div>
                 </div>
                 <div className = "col-sm-4">
                 <div><label>Cash Flow</label>{cashFlow}</div>
                 </div>
                
               
                
                </div>
            </div>
        </div>
    )
}

export default FinancialLinks