import React from 'react';
// import fundIcon from "../../../../Assets/images/fund-icon.svg";

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import withLogic from '../recomposeUtility/withLogic';
import Switch from '../../../../../Global/Components/switchControl';
import modifyName from '../DataUtility/parseDataBeforeSubmit';

const GeneralView = (props) => {
    debugger;
    console.log(props.fields, "i am here");
    let companyDetails = props.companyDetails;
    return (
        <div className="data-list">
            <div className="inner-wrap">
                <span className="onboarding-sub-title pb-15">
                    {/* <img src={fundIcon} height="" width="50" />  */}
                    {props.header}</span>
                <Switch
                    name={props.header}
                    onChange={props.withSwitchState}
                />
                {
                    Object.keys(companyDetails).
                        filter(key => companyDetails[key])
                        .map((key, index) => {
                            let title = key.replace(/([A-Z])/g, ' $1');
                            return (
                                <div className="data-list">
                                    <div className="task-content">
                                        <div className="col-block left-block">{title}</div>
                                        <div className="col-block right-block">
                                            {/* {props.companyDetails[key]} */}

                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        color="primary"
                                                        checked={JSON.parse(props.fields[modifyName(key)] || false)}
                                                        onChange={props.handleChange(modifyName(key).toUpperCase())}
                                                        value={modifyName(key).toUpperCase()}
                                                    />
                                                }
                                            />
                                        </div>
                                    </div>

                                </div>
                            )
                        })
                }
            </div>

        </div>
    )
}

export default withLogic(GeneralView)