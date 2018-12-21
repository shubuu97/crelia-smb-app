
import React from 'react';
import _get from 'lodash/get';
import moment from 'moment';

const PopulateComparisionCells = (props) => {
    
    let current = _get(props, 'current', {});
    let diffrence = _get(props, 'diffrence', {});
    let previous = _get(props, 'previous', {});
    let display = [];

    let parseData = {};

    if (_get(current, '$class') === 'com.aob.crelia.fund.Loan' && _get(previous, '$class') === 'com.aob.crelia.fund.Loan')
        parseData = {
            status: _get(diffrence, 'status', false)  //if key found in diffrence then push object
                ?
                {
                    changed: true,
                    previous: _get(previous, 'status', '-'),
                    current: _get(current, 'status', '-')
                } : _get(current, 'status', '-'),
            MoneyRange:
                _get(diffrence, 'moneyRange.minAmount', false) || _get(diffrence, 'moneyRange.maxAmount', false)
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
                        previous: `${_get(previous, 'term')} yrs`,
                        current: `${_get(current, 'term')} yrs`
                    }
                    : `${_get(current, 'term')} yrs`,
            TimeFrame: _get(diffrence, 'timeFrame', false)
                ?
                {
                    changed: true,
                    previous: `${moment(_get(previous, 'timeFrame')).format('DD-MM-YYYY HH:mm')}`,
                    current: `${moment(_get(current, 'timeFrame')).format('DD-MM-YYYY HH:mm')}`
                }
                : `${moment(_get(current, 'timeFrame')).format('DD-MM-YYYY')}`,
            FundAllocation: _get(diffrence, 'fundAllocation', false)
                ?
                {
                    changed: true,
                    previous:
                        _get(previous, 'fundAllocation', []).map((fundData, index) => {
                            return (
                                <div>
                                    <div className="extendedValue-secondary">
                                        {previous.fundAllocation[index].purpose} - {previous.fundAllocation[index].percentage} %
                                    </div>
                                    <div className="extendedValue-secondary">
                                        {previous.fundAllocation[index].otherPurpose}
                                    </div>
                                </div>
                            )
                        }),
                    current: _get(current, 'fundAllocation', []).map((fundData, index) => {
                        return (
                            <div>
                                <div className="extendedValue-secondary">
                                    {current.fundAllocation[index].purpose} - {current.fundAllocation[index].percentage} %
                                </div>
                                <div className="extendedValue-secondary">
                                    {current.fundAllocation[index].otherPurpose}
                                </div>
                            </div>
                        )
                    }),
                }
                : _get(current, 'fundAllocation', []).map((fundData, index) => {
                    return (
                        <div>
                            <div className="extendedValue-secondary">
                                {current.fundAllocation[index].purpose} - {current.fundAllocation[index].percentage} %
                            </div>
                            <div className="extendedValue-secondary">
                                {current.fundAllocation[index].otherPurpose}
                            </div>
                        </div>
                    )
                }),
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

    if (_get(current, '$class') === 'com.aob.crelia.fund.Equity' && _get(previous, '$class') === 'com.aob.crelia.fund.Equity')
        parseData = {
            status: _get(diffrence, 'status', false)  //if key found in diffrence then push object
                ?
                {
                    changed: true,
                    previous: _get(previous, 'status', '-'),
                    current: _get(current, 'status', '-')
                } : _get(current, 'status', '-'),
            Money:
                _get(diffrence, 'money.amount', false)
                    ?
                    {
                        changed: true,
                        previous: `${_get(previous, 'money.amount')}`,
                        current: `${_get(current, 'money.amount')}`
                    }
                    : `${_get(current, 'money.amount')}`,
            Currency:
                _get(diffrence, 'money.currency', false)
                    ?
                    {
                        changed: true,
                        previous: _get(previous, 'money.currency', '-'),
                        current: _get(current, 'money.currency', '-')
                    }
                    : `${_get(current, 'money.currency')}`,
            // Term:
            //     _get(diffrence, 'term', false)
            //         ?
            //         {
            //             changed: true,
            //             previous: `${_get(previous, 'term')} yrs`,
            //             current: `${_get(current, 'term')} yrs`
            //         }
            //         : `${_get(current, 'term')} yrs`,
            TimeFrame: _get(diffrence, 'timeFrame', false)
                ?
                {
                    changed: true,
                    previous: `${moment(_get(previous, 'timeFrame')).format('DD-MM-YYYY HH:mm')}`,
                    current: `${moment(_get(current, 'timeFrame')).format('DD-MM-YYYY HH:mm')}`
                }
                : `${moment(_get(current, 'timeFrame')).format('DD-MM-YYYY')}`,

            FundAllocation: _get(diffrence, 'fundAllocation', false)
                ?
                {
                    changed: true,
                    previous:
                        _get(previous, 'fundAllocation', []).map((fundData, index) => {
                            return (
                                <div>
                                    <div className="extendedValue-secondary">
                                        {previous.fundAllocation[index].purpose} - {previous.fundAllocation[index].percentage} %
                                    </div>
                                    <div className="extendedValue-secondary">
                                        {previous.fundAllocation[index].otherPurpose}
                                    </div>
                                </div>
                            )
                        }),
                    current: _get(current, 'fundAllocation', []).map((fundData, index) => {
                        return (
                            <div>
                                <div className="extendedValue-secondary">
                                    {current.fundAllocation[index].purpose} - {current.fundAllocation[index].percentage} %
                                </div>
                                <div className="extendedValue-secondary">
                                    {current.fundAllocation[index].otherPurpose}
                                </div>
                            </div>
                        )
                    }),
                }
                : _get(current, 'fundAllocation', []).map((fundData, index) => {
                    return (
                        <div>
                            <div className="extendedValue-secondary">
                                {current.fundAllocation[index].purpose} - {current.fundAllocation[index].percentage} %
                            </div>
                            <div className="extendedValue-secondary">
                                {current.fundAllocation[index].otherPurpose}
                            </div>
                        </div>
                    )
                }),

            Range: _get(diffrence, 'lowerValue', false) || _get(diffrence, 'upperValue', false)
                ?
                {
                    changed: true,
                    previous: `${_get(previous, 'lowerValue', '-')} - ${_get(previous, 'upperValue', '-')}${' '}(%)`,
                    current: `${_get(current, 'lowerValue', '-')} - ${_get(current, 'upperValue', '-')}${' '}(%)`
                }
                : `${_get(current, 'lowerValue')}`,

            SAFE: _get(diffrence, 'isSafeOffering', false)
                ?
                {
                    changed: true,
                    previous: `${_get(previous, 'isSafeOffering')}`,
                    current: `${_get(current, 'isSafeOffering')}`
                }
                : `${_get(current, 'isSafeOffering')}`,

            SafeDiscount: _get(diffrence, 'safeDiscount', false)
                ?
                {
                    changed: true,
                    previous: `${_get(previous, 'safeDiscount')}`,
                    current: `${_get(current, 'safeDiscount')} `
                } : `${_get(current, 'safeDiscount')}`,

            SafeMarketCap: _get(diffrence, 'safeMarketCap', false)
                ?
                {
                    changed: true,
                    previous: _get(previous, 'safeMarketCap', '-'),
                    current: _get(current, 'safeMarketCap', '-'),
                } : _get(current, 'safeMarketCap', '-'),

            NationAgreement: _get(diffrence, 'isNationAgreement', false)
                ?
                {
                    changed: true,
                    previous: `${_get(previous, 'isNationAgreement')}`,
                    current: `${_get(current, 'isNationAgreement')} `
                } : `${_get(current, 'isNationAgreement')}`,


            BoardMembership: _get(diffrence, 'isBoardMembership', false)
                ?
                {
                    changed: true,
                    previous: `${_get(previous, 'isBoardMembership')}`,
                    current: `${_get(current, 'isBoardMembership')} `
                } : `${_get(current, 'isBoardMembership')}`,

            Comments: _get(diffrence, 'comment', false)
                ?
                {
                    changed: true,
                    previous: `${_get(previous, 'comment')}`,
                    current: `${_get(current, 'comment')} `
                } : `${_get(current, 'comment')}`,
        }

    Object.keys(parseData).map((key, index) => {
        if (_get(parseData[key], `changed`)) {
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
                            <div className="data">{_get(parseData[key], 'previous', '')}</div>
                        </div>
                        <div className="current-data">
                            <div className="title"><span>Current</span></div>
                            <div className="data">{_get(parseData[key], 'current', '')}</div>
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