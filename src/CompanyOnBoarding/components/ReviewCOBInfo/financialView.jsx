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
    return (
        <div>
        <div>financialView will come here</div>
        <div>{financialDataView}</div>
        </div>
    )
}

export default financialView