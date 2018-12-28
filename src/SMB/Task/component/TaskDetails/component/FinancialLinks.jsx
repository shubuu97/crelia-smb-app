import React from 'react';
/* Assets Import */
//import financialLink from "../../../../Assets/images/financial-link.svg";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import withLogic from '../recomposeUtility/withLogic';


const FinancialLinks = (props) => {

    return (
        <div>
            <div className="data-list">
                <div className="inner-wrap">
                    <span className="onboarding-sub-title pb-15">
                        {/* <img src={fundIcon} height="" width="50" />  */}
                        {props.header}</span>
                    {
                        Object.keys(props.companyDetails)
                        .filter(key=>props.companyDetails[key])
                        .map((key, index) => {
                            let title = key.replace(/([A-Z])/g, ' $1');
                            return (
                                <div className="data-list">
                                    <div className="list-content">
                                        <div className="col-block left-block">{title}</div>
                                        {/* <div> Click <a style={{ color: '#007bff' }} href={props.companyDetails[key]} target="_blank">Here</a> to Open Link</div> */}
                                        <div className="col-block right-block">
                                        <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={props.key}
                                                        onChange={props.handleChange(key)}
                                                        value={key}
                                                    />
                                                }
                                                label="Give Access"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default withLogic(FinancialLinks);
//state handleres are here
