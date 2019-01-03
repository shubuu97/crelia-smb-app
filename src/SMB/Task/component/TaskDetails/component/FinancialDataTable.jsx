import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import withLogic from '../recomposeUtility/withLogic';
import Switch from '../../../../../Global/Components/switchControl';

const FinancialDataTable = (props) => {
    return (
        <div className="task-detail-general">
            <div className="">
                <span className="task-heading">
                Financial Details
                </span>
                <div className="flex-row task-switch">
                    <span>Requested Fields</span>
                    <div className="flex-row align-center switch-text">
                        <Switch
                            name={props.header}
                            onChange={props.withSwitchState}
                        />Select All
                    </div>
                </div>
                <div className="data-list">
                    <div className="task-content">
                        <div className="col-block right-block">
                            <FormControlLabel
                                control={
                                    <Checkbox
                                            color="primary"
                                            checked={props.key}
                                            onChange={props.handleChange('FINANCIALINFO_FINANCIALDATA')}
                                            value={'FINANCIALINFO_FINANCIALDATA'}
                                        />
                                }
                            />
                        </div>
                        <div className="col-block left-block">Financial Data</div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default withLogic(FinancialDataTable)