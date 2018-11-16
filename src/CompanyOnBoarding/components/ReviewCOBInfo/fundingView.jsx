import React from 'react';

const fundingView = (props) => {
    return (
        <div className=" pt-30">
            <span className="onboarding-sub-title d-block pb-15">Funding Details</span>
            <span className="list-content"><span>money Required</span> {props.moneyRequired}</span>
            <span className="list-content"><span>time Frame</span> {props.timeFrame}</span>
            <span className="s-level">
                <div className="fund-type-head">Uses of Money</div> 
                {props.fundAllocation.map((type)=>
                    <div className="list-content">
                        <span>{type.purpose}</span> {type.percentage+' '+'%'}
                    </div>
                )}
            </span>
            <span className="s-level">
                <div className="fund-type-head">Funding Type</div>
                {props.fundingType.map((type)=>
                <div className="list-content">
                    <span>{type.fundingType}</span> {type.percentage+' '+'%'}
                </div>
                )}
            </span>
        </div>
    )
}

export default fundingView