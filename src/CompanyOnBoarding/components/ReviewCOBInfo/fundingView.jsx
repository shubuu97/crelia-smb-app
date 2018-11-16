import React from 'react';

const fundingView = (props) => {
    return (
        <div className=" pt-30">
            <span className="onboarding-sub-title d-block pb-15">Funding Details</span>
            <span className="list-content"><span>Money Required</span> <span>{props.moneyRequired}</span></span>
            <span className="list-content"><span>Time Frame</span> <span>{props.timeFrame}</span></span>
            <span className="s-level">
                <div className="fund-type-head">Uses of Money</div> 
                {props.fundAllocation.map((type)=>
                    <div className="list-content">
                        <span>{type.purpose}</span> <span>{type.percentage+' '+'%'}</span>
                    </div>
                )}
            </span>
            <span className="s-level">
                <div className="fund-type-head">funding Type</div>
                {props.fundingType.map((type)=>
                <div className="list-content">
                    <span>{type.fundingType}</span> <span>{type.percentage+' '+'%'}</span>
                </div>
                )}
            </span>
        </div>
    )
}

export default fundingView