import React from 'react';
// import fundIcon from "../../../../Assets/images/fund-icon.svg";

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import withLogic from '../recomposeUtility/withLogic';
import Switch from '../../../../../Global/Components/switchControl';
import modifyName from '../DataUtility/parseDataBeforeSubmit';

const GeneralView = (props) => {
    let companyDetails = props.companyDetails;
    return (
        <div className="task-detail-general">
            <div className="">
                <span className="task-heading">
                    {props.header}
                </span>
                <div className="flex-row task-switch">
                    <span>Requested Fields</span>
                    <div className="flex-row align-center">
                        <Switch
                            name={props.header}
                            onChange={props.withSwitchState}
                        />Select All
                    </div>
                </div>

                {
                    Object.keys(companyDetails).
                        filter(key => companyDetails[key])
                        .map((key, index) => {
                            let title = key.replace(/([A-Z])/g, ' $1');
                            return (
                                <div className="data-list">
                                    <div className="task-content">
                                        <div className="col-block right-block">
                                            {/* {props.companyDetails[key]} */}

                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        color="primary"
                                                        checked={JSON.parse(props.fields[modifyName(key).toUpperCase()] || false)}
                                                        onChange={props.handleChange(modifyName(key).toUpperCase())}
                                                        value={modifyName(key).toUpperCase()}
                                                    />
                                                }
                                            />
                                        </div>
                                        <div className="col-block left-block">{title}</div>
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