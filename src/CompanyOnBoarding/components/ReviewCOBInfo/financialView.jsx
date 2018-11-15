import React from 'react';
const financialView=(props)=>
{
   let financialDataView =  props.financialData.map(data=>
    {
    return (
        <div className="data-list">
            <span className="sub-head">Year-{data.year}</span>         
            <span className="list-content"><span>Cash-</span> {data.cash}</span>
            <span className="list-content"><span>EBITDA-</span> {data.ebitda}</span>
            <span className="list-content"><span>Interest Expense-</span> {data.interestExpense}</span>
            <span className="list-content"><span>Sales-</span> {data.sales}</span>
            <span className="list-content"><span>Total Financial Debt-</span> {data.totalFinalDebt}</span>
            <span className="list-content"><span>Total Share Holder Equity-</span> {data.totalShareholderEquity}</span>
          </div>

    )
    })
    let loanProviderView =  props.loanProvider.map(data=>
        {
        return (
            <div  className="data-list">
             <span className="sub-head">1</span>
              <span className="list-content"><span>Provider Name-</span> {data.providerName}</span>
              <span className="list-content"><span>Amount-</span> {data.amount}</span>
            </div>
    
        )
        })
        let financialLinks =  props.financialLinks.map(data=>
            {
            return (
                <div>
                  <a href={data} className="financial-links">{data}</a>
                </div>
        
            )
            })
    return (
        <div className="row">
            <div className="col-sm-4">       
                <div className="onboarding-sub-title" >financial Data</div>
                <div>{financialDataView}</div>
            </div>

            <div className="col-sm-4">       
                <div className="onboarding-sub-title" >Loan Provider Details</div>
                <div>{loanProviderView}</div>
            </div>

            <div className="col-sm-4">       
                <div className="onboarding-sub-title ">Finacial Links</div>
                <div>{financialLinks}</div>
            </div>
        </div>
    )
}

export default financialView