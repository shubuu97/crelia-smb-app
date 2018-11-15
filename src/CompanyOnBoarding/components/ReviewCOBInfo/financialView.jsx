import React from 'react';
const financialView=(props)=>
{
   let financialDataView =  props.financialData.map(data=>
    {
    return (
        <div>
          <span>Year-{data.year}</span>
          <span>Cash-{data.cash}</span>
          <span>EBITDA-{data.ebitda}</span>
          <span>Interest Expense-{data.interestExpense}</span>
          <span>Sales-{data.sales}</span>
          <span>Total Financial Debt-{data.totalFinalDebt}</span>
          <span>Total Share Holder Equity-{data.totalShareholderEquity}</span>
        </div>

    )
    })
    let loanProviderView =  props.loanProvider.map(data=>
        {
        return (
            <div>
              <span>Provider Name-{data.providerName}</span>
              <span>Amount-{data.amount}</span>
            </div>
    
        )
        })
        let financialLinks =  props.financialLinks.map(data=>
            {
            return (
                <div>
                  <a>{data}</a>
                </div>
        
            )
            })
    return (
        <div>
        <div>financial Data</div>
        <div>{financialDataView}</div>
        <div>Loan Provider Details</div>
        <div>{loanProviderView}</div>
        <div>Finacial Links</div>
        <div>{financialLinks}</div>
        </div>
    )
}

export default financialView