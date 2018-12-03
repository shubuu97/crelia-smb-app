import React from 'react';

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
        <div className="col-sm-4" >
         <div className="inner-wrap">
            <div className="onboarding-sub-title" >Team Details</div>
            <div>{loanProviderView}</div>
        </div>
        </div>
    )
}

export default LoanProvider