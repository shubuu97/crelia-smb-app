import React from 'react';
import _get from 'lodash/get';

const LoanProvider = (props) => {
    let loanProviderView = _get(props, 'loanProvider', []).map((data, index) => {
        return (
            <div>
                <span className="sub-head">#{++index}</span>
                <span className="list-content">
                    <span>Provider Name-</span>
                    <span>{_get(data, 'providerName')}</span>
                </span>
                <span className="list-content">
                    <span>Amount-</span>
                    <span>{_get(data, 'amount')}</span>
                </span>
            </div>
        )
    })

    return (
        <div className="data-list">
            <div className="inner-wrap">
                <div className="onboarding-sub-title" >
                    {/* <img src={loanProvider} height="" width="30" /> */}
                    Provider Details</div>
                <div>{loanProviderView}</div>
            </div>
        </div>
    )
}

export default LoanProvider