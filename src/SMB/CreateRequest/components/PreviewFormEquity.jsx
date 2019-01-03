import React, { Component } from 'react';
import _get from 'lodash/get';
import Button from '@material-ui/core/Button';
import LoaderButton from '../../../Global/Components/LoaderButton'
class PreviewFormEquity extends Component {


    render() {
        let formValues = this.props.formValues

        return (
            <div>
             <h4>Summary</h4>
            
             <div className="block-sub-title pt-10">Amount:</div>
             <div className="text-gray">
                <div>{_get(formValues,'amount')} {_get(formValues,'currency')}</div>   
             </div> 

               <div className="block-sub-title pt-10">Percent Range Offerd:</div>
             <div className="text-gray">
        {_get(formValues,'notSureRange')?<div>Not sure</div> :<div>{_get(formValues,'lowerValue')}-{_get(formValues,'upperValue')}%</div> }  
             </div>
             {!_get(formValues,'notSureRange')&&_get(formValues,'upperValue')>10?
             <React.Fragment>
             <div className="block-sub-title pt-10">Board Membership</div>
             <div className="text-gray">{_get(formValues,'isBoardMembership')}</div>
             </React.Fragment>:
             <React.Fragment>
                   <div className="block-sub-title pt-10">SAFE Offer:</div>
                   <div className="text-gray">{_get(formValues,'isSafeOffering')}</div>
                   {_get(formValues,'isSafeOffering')=='yes'?
                   <React.Fragment>
                       <div className="block-sub-title pt-10">SAFE Discount:</div>
                       <div className="text-gray">{_get(formValues,'safeDiscount')}</div>
                       <div className="block-sub-title pt-10">SAFE MarketCap:</div>
                       <div className="text-gray">{_get(formValues,'safeMarketCap')}</div>
                       <div className="block-sub-title pt-10">Nation Aggrement:</div>
                       <div className="text-gray">{_get(formValues,'isNationAgreement')}</div>
                  </React.Fragment>

                :null}
             </React.Fragment>
             }

            
            
             <div className="block-sub-title pt-30">Use of Funds:</div> 
             <div className="list-data text-gray">
                <div><span className="inner-btxt">Expansion:</span> {_get(formValues,'expansionPecentage')}</div>
                <div><span className="inner-btxt">Recapitalization:</span> {_get(formValues,'recapitalizationPecentage')}</div>
                <div><span className="inner-btxt">Other Purpose:</span> {_get(formValues,'otherPurpose')}</div>
             </div>

           <div className="block-sub-title pt-10">Active Till:</div>
             <div className="text-gray">
                <div> {_get(formValues,'timeFrame')}</div>   
             </div>
             
            </div>
        )
    }
}




export default PreviewFormEquity;