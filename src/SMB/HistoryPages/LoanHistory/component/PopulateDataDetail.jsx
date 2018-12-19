import React from 'react';
import _get from 'lodash/get';
import moment from 'moment';

const PopulateDataDetails = (props) => {
    let allData = _get(props, 'allData.fund', []);
    let parseData = {}
      // For Equity Request
      if(_get(allData, '$class') === 'com.aob.crelia.fund.Equity')
      parseData = {
          Money: `${_get(allData, 'money.amount', '-')}`,
          Currency: `${_get(allData, 'money.currency', '-')}`,
          //Term: `${_get(allData, 'term', '-')} yrs`,
          TimeFrame: `${moment(_get(allData, 'timeFrame', '-')).format('DD-MM-YYYY')}`,
          FundAllocation: _get(allData, 'fundAllocation', '-'),
          Range: `${_get(allData, 'lowerValue', '0')} - ${_get(allData, 'upperValue', '0')}${' '}(%)`,
          SAFE: `${_get(allData, 'isSafeOffering', '-')}`,
          SafeDiscount: `${_get(allData, 'safeDiscount', '-')}`,
          SafeMarketCap: `${_get(allData, 'safeMarketCap', '-')}`,
          NationAgreement: `${_get(allData, 'isNationAgreement', '-')}`,
          BoardMembership: `${_get(allData, 'isBoardMembership', '-')}`,
          Comments: _get(allData, 'comment', '-'),
      }
      else
      {
       parseData = {
        MoneyRange: `${_get(allData, 'moneyRange.minAmount')} - ${_get(allData, 'moneyRange.maxAmount')}`,
        Currency: `${_get(allData, 'moneyRange.currency')}`,
        Term: `${_get(allData, 'term')} yrs`,
        TimeFrame: `${moment(_get(allData, 'timeFrame')).format('DD-MM-YYYY')}`,
        FundAllocation: _get(allData, 'fundAllocation', ''),
        InterestRateType: `${_get(allData, 'interestRateType')}`,
        DesiredRate: `${_get(allData, 'interestRate')} %`,
    }
}
    let data = []
    Object.keys(parseData).map((key) => {
        let title = key.replace(/([A-Z])/g, ' $1')
        if (key != 'FundAllocation') {
            data.push(
                <div className="flex-column"
                    style={{
                        width: '25%',
                        padding: '10px',
                    }}
                >
                    <span className="extendedKey">{title} </span>
                    <span className="extendedValue">{parseData[key]}</span>
                </div>
            )
        }
        else if (key == 'FundAllocation') {
            let FundValues = []
            parseData[key].map((fundData, index) => {

                FundValues.push(
                    <span className="extendedValue-secondary">
                        {parseData.FundAllocation[index].purpose} - {parseData.FundAllocation[index].percentage} %
                    </span>

                )
            })
            data.push(
                <div className="flex-column"
                    style={{
                        width: '25%',
                        padding: '10px',
                    }}
                >
                    <span className="extendedKey">Fund Allocation</span>
                    <span className="extendedValue"> {FundValues}</span>
                </div>
            )
        }
    })
    return (
        <div className="flex-row"
            style={{
                flexWrap: 'wrap',
            }}
        >
            {data}
        </div>
    )
}

export default PopulateDataDetails 