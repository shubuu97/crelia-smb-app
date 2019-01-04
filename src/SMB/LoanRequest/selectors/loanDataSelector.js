import { createSelector } from 'reselect';
import _get from 'lodash/get';
import moment from 'moment';
import formatMoney from '../../../Global/Components/normalizingMoneyField';



let allowedStatus = (status) => {
    let arr = []
    switch(status) {
        case 'DRAFT' :
        arr = ['PENDING', 'SUSPENDED', 'CLOSED', 'EDIT']
        break;
        case 'PENDING':
        arr = ['DECLINED', 'ACTIVE', 'SUSPENDED', 'CLOSED', 'EDIT']
        break;
        case 'ACTIVE' :
        arr = ['SUSPENDED', 'CLOSED', 'OFFERED', 'EDIT']
        break;
        case 'DECLINED':
        arr = ['CLOSED', 'EDIT']
        break;
        case 'SUSPENDED' :
        arr = ['PENDING', 'ACTIVE', 'CLOSED', 'EDIT']
        break;
        case 'CLOSED':
        arr = ['x']
        break;
        case 'OFFERED' :
        arr =  ['CLOSED', 'GRANTED']
        break;
        case 'GRANTED':
        arr = ['x']
        break;
        default :
        arr = ['x']
        break;
    }
    arr.push('SHOW_HISTORY')
    return arr
}




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
                content: data.status,
                status: data.status,
            },
            id:_get(data,'id'),
            fundType:{
                dataBadge: _get(data, 'offerCount', ''),
                content:fundType
            },
            Amount: {
                content: `${formatMoney(_get(data, 'moneyRange.minAmount'))} - ${formatMoney(_get(data, 'moneyRange.maxAmount'))}`,
                subData: fundType == 'Equity' ? `${_get(data, 'lowerValue', '')}-${_get(data, 'upperValue', '')}` : `${_get(data, 'interestRate', '')}% per annum`
            },
            Currency: `${_get(data, 'moneyRange.currency')}`,
            Time: {
                content: time,
                //Todo ask sohan about this (per annum per month)
                subData: _get(data, 'timeFrame') ? `active till-${moment(_get(data, 'timeFrame')).format('DD-MM-YYYY')}` : ''
            },
            purpose: [_get(data, 'fundAllocation[0].purpose', ''), _get(data, 'fundAllocation[1].purpose', ''), _get(data, 'fundAllocation[2].purpose', '')],
            allowedActions: allowedStatus(data.status),
        }

        if (fundType == 'Equity') {
            obj.Amount = formatMoney(_get(data, 'money.amount'));
            obj.Currency = _get(data, 'money.currency');

        }
        return obj
    })

)

const filterDataSelector = createSelector(
    state => _get(state, 'filterMetaData.lookUpData'),
    (filterMetaData) => {
        
        let filterData = [];
        filterData.push(
            {
                type:'checkbox',
                keyname:'status',
                name: 'Status',
                values: _get(filterMetaData,'fundStatus',[])
            },
            {
                type:'textbox',
                keyname:'id',
                name: 'Id',
                values:[]
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
                name: 'Purpose of Loan',
                values:[]
            }

        );
        return filterData;
    }
)


export { tableDataSelector, loanDataSelector,filterDataSelector   }