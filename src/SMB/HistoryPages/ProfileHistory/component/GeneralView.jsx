import React from 'react';
// import fundIcon from "../../../../Assets/images/fund-icon.svg"

const GeneralView = (props) => {
    return (
        <div className="data-list">
            <div className="inner-wrap">

                <span className="onboarding-sub-title pb-15">
                    {/* <img src={fundIcon} height="" width="50" />  */}
                    {props.header}</span>
                {
                    Object.keys(props.companyDetails).map((key, index) => {
                        let title = key.replace(/([A-Z])/g, ' $1');
                        return (
                            <div className="data-list">
                                <span className="list-content">
                                    <span>{title}</span>
                                    <span>{props.companyDetails[key]}</span>
                                </span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default GeneralView