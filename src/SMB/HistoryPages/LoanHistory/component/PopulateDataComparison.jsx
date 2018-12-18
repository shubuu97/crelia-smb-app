
import React  from 'react';
import _get  from 'lodash/get';
import moment from 'moment';
const PopulateComparisionCells = (props) => {
    let current = _get(props, 'current', {});
    let diffrence = _get(props, 'diffrence', {});
    let previous = _get(props, 'previous', {});
    let display = []

    let parseData = {
        status: _get(diffrence, 'status', false)  //if key found in diffrence then push object
            ?
            {
                changed: true,
                previous: _get(previous, 'status', '-'),
                current: _get(current, 'status', '-')
            } : _get(current, 'status', '-'),
        MoneyRange:
            _get(diffrence, 'moneyRange.minAmount', false)|| _get(diffrence, 'moneyRange.maxAmount', false)
                ?
                {
                    changed: true,
                    previous: `${_get(previous, 'moneyRange.minAmount')} - ${_get(previous, 'moneyRange.maxAmount')}`,
                    current: `${_get(current, 'moneyRange.minAmount')} - ${_get(current, 'moneyRange.maxAmount')}`
                }
                : `${_get(current, 'moneyRange.minAmount')} - ${_get(current, 'moneyRange.maxAmount')}`,
        Currency:

            _get(diffrence, 'moneyRange.currency', false)
                ?
                {
                    changed: true,
                    previous: _get(previous, 'moneyRange.currency', '-'),
                    current: _get(current, 'moneyRange.currency', '-')
                }
                : `${_get(current, 'moneyRange.currency')}`,
        Term:
            _get(diffrence, 'term', false)
                ?
                {
                    changed: true,
                    previous:`${_get(previous, 'term')} yrs`,
                    current: `${_get(current, 'term')} yrs`
                }
                : `${_get(current, 'term')} yrs`,
        TimeFrame: _get(diffrence, 'timeFrame', false)
            ?
            {
                changed: true,
                previous:  `${moment(_get(previous, 'timeFrame')).format('DD-MM-YYYY HH:mm')}`,
                current:  `${moment(_get(current, 'timeFrame')).format('DD-MM-YYYY HH:mm')}`
            }
            : `${moment(_get(current, 'timeFrame')).format('DD-MM-YYYY')}`,
   //todo array mapping need to be done 
        FundAllocation: _get(diffrence, 'fundAllocation', false)
            ?
            {
                changed: true,
                previous: 'Previous array',
                current: 'Current array'
            }
            : 'fund allocation array',
        InterestRateType: _get(diffrence, 'interestRateType', false)
            ?
            {
                changed: true,
                previous: _get(previous, 'interestRateType', '-'),
                current: _get(current, 'interestRateType', '-')
            }
            : `${_get(current, 'interestRateType')}`,
        DesiredRate: _get(diffrence, 'interestRate', false)
            ?
            {
                changed: true,
                previous: `${_get(previous, 'interestRate')} %`,
                current: `${_get(current, 'interestRate')} %`
            }
            : `${_get(current, 'interestRate')} %`,
    }
    
    Object.keys(parseData).map((key, index) => {
        if (_get(parseData[key], `changed`))
        {
            display.push(
                <div className="flex-column"
                key={index}
                    style={{
                        width: '25%',
                        padding: '10px',
                    }}
                >
                    <span className="extendedKey">{key} </span>
                    <div className="compare-view">
                        <div className="previous-data">
                            <div className="title"><span>Previous</span> </div>
                            <div className="data">{_get(parseData[key],'previous','')}</div>
                        </div>
                        <div className="current-data">
                            <div className="title"><span>Current</span></div>
                            <div className="data">{_get(parseData[key],'current','')}</div>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            display.push(
                <div className="flex-column"
                key={index}
                    style={{
                        width: '25%',
                        padding: '10px',
                    }}
                >
                    <span className="extendedKey">{key}</span>
                    <span className="extendedValue">{parseData[key]}</span>
    
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
            {display}
        </div>
    )
}
export default PopulateComparisionCells