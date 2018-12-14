import { createSelector } from 'reselect';
import _get from 'lodash/get';
import moment from 'moment';




let loanDataSelector = createSelector(
    state => _get(state, "LoanRequest.lookUpData.rows", []),
    loanData => loanData
)

const tableDataSelector = createSelector(
    state => _get(state, "LoanRequest.lookUpData.rows", []),
    loanData => loanData.map((data, index) => {
        let time = _get(data, 'term', '-')
        if (time != '-') {
            time = time + " year"

        };
        let $class = _get(data, '$class');
        let $classarr = $class.split('.');
        let fundType = $classarr[$classarr.length - 1];
        let obj = {
            status: {
                dataBadge: _get(data, 'offerCount', ''),
                content: data.status,
                status: data.status,
            },
            fundType,
            Amount: {
                content: `${_get(data, 'moneyRange.minAmount')} - ${_get(data, 'moneyRange.maxAmount')}`,
                subData: fundType == 'Equity' ? `${_get(data, 'lowerValue', '')}-${_get(data, 'upperValue', '')}` : `${_get(data, 'interestRate', '')}% per annum`
            },
            Currency: `${_get(data, 'moneyRange.currency')}`,
            Time: {
                content: time,
                //Todo ask sohan about this (per annum per month)
                subData: _get(data, 'timeFrame') ? `active till-${moment(_get(data, 'timeFrame')).format('DD-MM-YYYY')}` : ''
            },
            purpose: [_get(data, 'fundAllocation[0].purpose', ''), _get(data, 'fundAllocation[1].purpose', ''), _get(data, 'fundAllocation[2].purpose', '')],
        }

        if (fundType == 'Equity') {
            obj.Amount = _get(data, 'money.amount');
            obj.Currency = _get(data, 'money.currency');

        }
        return obj
    })

)

const filterDataSelector = createSelector(
    state => _get(state, 'filterMetaData.lookUpData'),
    (filterMetaData) => {
        debugger;
        let filterData = [];
        filterData.push(
            {
                type:'checkbox',
                keyname:'status',
                name: 'Status',
                values: _get(filterMetaData,'fundStatus',[])
            },
            {
                type:'checkbox',
                keyname:'$class',
                name: 'Fund Type',
                values: _get(filterMetaData,'fundType',[])
            },
            {
                type:'textbox',
                keyname:'amount',
                name: 'Amount',
                values:[]
            },
            {
                type:'checkbox',
                keyname:'currency',
                name: 'Currency',
                values:_get(filterMetaData,'allowedCurrencies',[])
            },
            {
                type:'checkbox',
                keyname:'term',
                name: 'Term',
                values:_get(filterMetaData,'timeFrame',[])
            },
            {
                type:'textbox',
                keyname:'purpose',
                name: 'Purpose Of Loan',
                values:[]
            }

        );
        return filterData;
    }
)


export { tableDataSelector, loanDataSelector,filterDataSelector   }