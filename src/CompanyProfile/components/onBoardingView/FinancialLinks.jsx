import React from 'react';

const FinancialLinks = (props) => {

    let financialLinks = props.financialLinks.map(data => {
        if (data != "null")
            return (
                <div>
                    <a href={data} className="financial-links">{data}</a>
                </div>

            )
    })

    return (
        <div className="col-sm-6" >
            <div className="onboarding-sub-title ">Finacial Links</div>
            <div>{financialLinks}</div>
        </div>
    )
}

export default FinancialLinks