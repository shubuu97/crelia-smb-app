import React from 'react';

const fundingView = (props) => {
    return (
        <div>
            <div>Funding Details</div>
            <div>{props.moneyRequired}</div>
            <div>{props.timeFrame}</div>
            <div>{props.fundAllocation.map((type)=><div><span>{type.purpose}</span>
            -<span>{type.percentage+' '+'Percentage'}</span>
            </div>)}</div>
            <div>{props.fundingType.map((type)=><div><span>{type.fundingType}</span>
            -<span>{type.percentage+' '+'Percentage'}</span>
            </div>)}</div>
        </div>
    )
}

export default fundingView