import React from 'react';
import _get from 'lodash/get';

// import fundIcon from "../../../../Assets/images/fund-icon.svg"

const FundingView = (props) => {
    return (
        <div className=" data-list">
            <div className="inner-wrap">
                <span className="onboarding-sub-title pb-15">
                    {/* <img src={fundIcon} height="" width="50" />  */}
                    Funding Details</span>
                <span className="list-content">
                    <span>Money Required</span>
                    <span>{_get(props, 'fundingDetails.moneyRequired')}</span>
                </span>
                <span className="list-content">
                    <span>Time Frame</span>
                    <span>{_get(props, 'fundingDetails.timeFrame')}</span>
                </span>
                <span className="s-level">
                    <div className="fund-type-head">Uses of Money</div>
                    {
                        _get(props, 'fundingDetails.fundAllocation').map((type) =>
                            <div className="list-content">
                                <span>{_get(type, 'purpose')}</span>
                                <span>{_get(type, 'percentage') + ' ' + '%'}</span>
                            </div>
                        )
                    }
                </span>
                <span className="s-level">
                    <div className="fund-type-head">Funding Type</div>
                    {
                        _get(props, 'fundingDetails.fundingType', []).map((type) =>
                            <div className="list-content">
                                <span>{_get(type, 'fundingType')}</span>
                                <span>{_get(type, 'percentage') + ' ' + '%'}</span>
                            </div>
                        )
                    }
                </span>
            </div>
        </div>
    )
}

export default FundingView