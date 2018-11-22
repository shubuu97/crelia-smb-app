import React from 'react';
import loanProvider from "../../../Assets/images/loan-provider.svg"

const LoanProvider = (props) => {
    let loanProviderView = props.loanProvider.map((data, index) => {
        return (
            <div className="data-list">
                <span className="sub-head">{++index}</span>
                <span className="list-content"><span>Provider Name-</span> <span>{data.providerName}</span></span>
                <span className="list-content"><span>Amount-</span> <span>{data.amount}</span></span>
            </div>
        )
    })

    return (
        <div className="col-sm-6" >
        <div className="inner-wrap">
            <div className="onboarding-sub-title"><img src={loanProvider} height="" width="30" /> Loan Provider Details</div>
            <div>{loanProviderView}</div>
        </div></div>
    )
}

export default LoanProvider