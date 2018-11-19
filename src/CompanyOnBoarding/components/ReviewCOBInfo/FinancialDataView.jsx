import React from 'react';

const FinancialDataView = (props) => {

    let financialDataView = props.financialData.map(data => {
        return (
            <div className="data-list">
                <span className="sub-head">Year-{data.year}</span>
                <span className="list-content"><span>Cash-</span> <span>{data.cash}</span></span>
                <span className="list-content"><span>EBITDA-</span> <span>{data.ebitda}</span></span>
                <span className="list-content"><span>Interest Expense-</span> <span>{data.interestExpense}</span></span>
                <span className="list-content"><span>Sales-</span> <span>{data.sales}</span></span>
                <span className="list-content"><span>Total Financial Debt-</span> <span>{data.totalFinalDebt}</span></span>
                <span className="list-content"><span>Total Share Holder Equity-</span> <span>{data.totalShareholderEquity}</span></span>
            </div>

        )
    })

    return (
        <div className="col-sm-3" >
            <div className="onboarding-sub-title" >Financial Data</div>
            <div>{financialDataView}</div>
        </div>
    )
}

export default FinancialDataView