
import React from 'react';
import _get from 'lodash/get';
import moment from 'moment';

const PopulateComparisionCells = (props) => {

    let current = _get(props, 'current', {});
    let diffrence = _get(props, 'diffrence', {});
    let previous = _get(props, 'previous', {});

    //Variable for rendering data to screen
    let display = {
        about: [],
        address: [],
        contacts: [],
        assets: []
    };

    //Designed data to display
    let parseData = {
        about: {
            CompanyName: _get(diffrence, 'legalName', false)
                ? {
                    changed: true,
                    previous: _get(previous, 'legalName', '-'),
                    current: _get(current, 'legalName', '-')
                }
                : _get(current, 'legalName', '-'),

            InvestorType: _get(diffrence, 'investorType', false)
                ? {
                    changed: true,
                    previous: _get(previous, 'investorType', '-'),
                    current: _get(current, 'investorType', '-')
                }
                : _get(current, 'investorType', '-'),

            RegistrationNumber: _get(diffrence, 'registrationNumber', false)
                ? {
                    changed: true,
                    previous: _get(previous, 'registrationNumber', '-'),
                    current: _get(current, 'registrationNumber', '-')
                }
                : _get(current, 'registrationNumber', '-'),

            IncorporationDate: _get(diffrence, 'incorporationDate', false)
                ? {
                    changed: true,
                    previous: `${moment(_get(previous, 'incorporationDate', '-')).format('DD-MM-YYYY')}`,
                    current: `${moment(_get(current, 'incorporationDate', '-')).format('DD-MM-YYYY')}`,
                }
                : `${moment(_get(current, 'incorporationDate', '-')).format('DD-MM-YYYY')}`,

            licenseNumber: _get(diffrence, 'licenseNumber', false)
                ? {
                    changed: true,
                    previous: _get(previous, 'licenseNumber', '-'),
                    current: _get(current, 'licenseNumber', '-')
                }
                : _get(current, 'legalName', '-'),
        },
        address: {
            'Street-1':
                _get(diffrence, 'address.line1', false)
                    ? {
                        changed: true,
                        previous: _get(previous, 'address.line1', '-'),
                        current: _get(current, 'address.line1', '-')
                    } : _get(current, 'address.legalName', '-'),

            'Street-2':
                _get(diffrence, 'address.line2', false)
                    ? {
                        changed: true,
                        previous: _get(previous, 'address.line2', '-'),
                        current: _get(current, 'address.line2', '-')
                    } : _get(current, 'address.line2', '-'),

            City:
                _get(diffrence, 'address.city', false)
                    ? {
                        changed: true,
                        previous: _get(previous, 'address.city', '-'),
                        current: _get(current, 'address.city', '-')
                    } : _get(current, 'address.city', '-'),

            ZipCode:
                _get(diffrence, 'address.zipCode', false)
                    ? {
                        changed: true,
                        previous: _get(previous, 'address.zipCode', '-'),
                        current: _get(current, 'address.zipCode', '-')
                    } : _get(current, 'address.zipCode', '-'),

            Country:
                _get(diffrence, 'address.country', false)
                    ? {
                        changed: true,
                        previous: _get(previous, 'address.country', '-'),
                        current: _get(current, 'address.country', '-')
                    } : _get(current, 'address.country', '-'),

            Region:
                _get(diffrence, 'address.region', false)
                    ? {
                        changed: true,
                        previous: _get(previous, 'address.region', '-'),
                        current: _get(current, 'address.region', '-')
                    } : _get(current, 'address.region', '-'),
        },
        contacts: {
            PhoneNumber:
                _get(diffrence, 'phoneNumber', false)
                    ? {
                        changed: true,
                        previous: _get(previous, 'phoneNumber', '-'),
                        current: _get(current, 'phoneNumber', '-')
                    } : _get(current, 'phoneNumber', '-'),

            Email:
                _get(diffrence, 'email', false)
                    ? {
                        changed: true,
                        previous: _get(previous, 'email', '-'),
                        current: _get(current, 'email', '-')
                    } : _get(current, 'email', '-'),

            Website:
                _get(diffrence, 'url', false)
                    ? {
                        changed: true,
                        previous: _get(previous, 'url', '-'),
                        current: _get(current, 'url', '-')
                    } : _get(current, 'url', '-'),
        },
        assets: {
            'Investible Liquid assets':
                _get(diffrence, 'investibleLiquidAssets', false)
                    ? {
                        changed: true,
                        previous: _get(previous, 'investibleLiquidAssets', '-'),
                        current: _get(current, 'investibleLiquidAssets', '-')
                    } : _get(current, 'investibleLiquidAssets', '-'),

            'assets Under Management':
                _get(diffrence, 'assetsUnderManagement', false)
                    ? {
                        changed: true,
                        previous: _get(previous, 'assetsUnderManagement', '-'),
                        current: _get(current, 'assetsUnderManagement', '-')
                    } : _get(current, 'assetsUnderManagement', '-'),
        }
    }

    Object.keys(parseData).map((header, index) => {
        Object.keys(parseData[header]).map((key, index) => {
            if (_get(parseData[header][key], `changed`)) {
                display[header].push(
                    <div className="flex-column details-block"
                        key={index}
                    >
                        <span className="extendedKey">{key} </span>
                        <div className="compare-view">
                            <div className="previous-data">
                                <div className="title"><span>Previous</span> </div>
                                <div className="data">{_get(parseData[header][key], 'previous', '')}</div>
                            </div>
                            <div className="current-data">
                                <div className="title"><span>Current</span></div>
                                <div className="data">{_get(parseData[header][key], 'current', '')}</div>
                            </div>
                        </div>
                    </div>
                )
            }
            else {
                display[header].push(
                    <div className="flex-column details-block"
                        key={index}
                    >
                        <span className="extendedKey">{key}</span>
                        <span className="extendedValue">{parseData[header][key]}</span>

                    </div>
                )
            }
        });
    });
    return (
        <div>
            {
                Object.keys(display).map((key, index) => {
                    let title = key.replace(/([A-Z])/g, '$1');
                    return (
                        <div id={index}>
                            {/* To make first char capital for title */}
                            <h5>{title.charAt(0).toUpperCase() + title.slice(1)}</h5>
                            <div className="flex-row block-details">
                                {display[key]}
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default PopulateComparisionCells