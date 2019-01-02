import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import withLogic from '../recomposeUtility/withLogic';

const  LoanProvider = (props)=>
{
    // let loanProviderView = props.loanProvider.map((data, index) => {
    //     return (
    //         <div>
    //             <span className="sub-head">{++index}</span>
    //             <span className="list-content"><span>Provider Name-</span> <span>{data.providerName}</span></span>
    //             <span className="list-content"><span>Amount-</span> <span>{data.amount}</span></span>
    //         </div>
    //     )
    // })
    return (
        <div className="data-list">
            <div className="inner-wrap">
                <div className="onboarding-sub-title" >
                    {/* <img src={loanProvider} height="" width="30" /> */}
                    Provider Details</div>
                {/* <div>{loanProviderView}</div> */}
                <FormControlLabel
                control={
                    <Checkbox
                        color="primary"
                        checked={props.key}
                        onChange={props.handleChange('FINANCIALINFO_LOANPROVIDER_PROVIDERNAME')}
                        value={'FINANCIALINFO_LOANPROVIDER_PROVIDERNAME'}
                    />
                }
            />
            </div>
           
        </div>
    )
}


export default withLogic(LoanProvider)