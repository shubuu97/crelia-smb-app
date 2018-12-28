import React from 'react';
// import fundIcon from "../../../../Assets/images/fund-icon.svg";

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import withLogic from '../recomposeUtility/withLogic';

const GeneralView=(props)=>
{
    console.log(props,"i am here");
        return (
            <div className="data-list">
                <div className="inner-wrap">
                    <span className="onboarding-sub-title pb-15">
                        {/* <img src={fundIcon} height="" width="50" />  */}
                        {props.header}</span>

                    {/* <div>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={true} 
                                />
                            }
                            label="All Access"
                        />

                    </div> */}
                    {
                        Object.keys(props.companyDetails).
                        filter(key=>props.companyDetails[key])
                          .map((key, index) => {
                            let title = key.replace(/([A-Z])/g, ' $1');
                            return (
                                <div className="data-list">
                                    <div className="list-content">
                                        <div className="col-block left-block">{title}</div>
                                        <div className="col-block right-block">
                                            {/* {props.companyDetails[key]} */}
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
        )
    }

export default withLogic(GeneralView)