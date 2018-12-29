import React from 'react';
import _get from 'lodash/get';
import moment from 'moment';
import FinancialData from './FinancialDataTable';
import LoanProvider from './loanProviderView';
import GeneralView from './GeneralView';
import FinancialLinks from './FinancialLinks';
import { isNullOrUndefined } from 'util';

const PopulateDataDetails = (props) => {

    let dataObject = _get(props, 'dataObject', []);
    //logic to categorize dataObject;
    let allData = {};
    dataObject.map(key => {
        let obj = {};
        allData[key] = key;
    });



    let parseData = {
        companyDetails: {
            CompanyName: _get(allData, 'LEGALNAME'),
            IndustryType: _get(allData, 'INDUSTRYTYPE'),
            LegalEntityType: _get(allData, 'LEGALENTITYTYPE'),
            IncorporationDate: _get(allData, 'INCORPORATIONDATE'),
            taxId: _get(allData, 'TAXID'),
            RegistrationNumber: _get(allData, 'REGISTRATIONNUMBER'),
            licenseNumber: _get(allData, 'LICENSENUMBER'),
            numberOfEmployees: _get(allData, 'NUMBEROFEMPLOYEES'),
        },
        address: {
            'Street-1': _get(allData, 'ADDRESS_LINE1'),
            'Street-2': _get(allData, 'ADDRESS_LINE2'),
            City: _get(allData, 'ADDRESS_CITY'),
            ZipCode: _get(allData, 'ADDRESS_ZIPCODE'),
            Country: _get(allData, 'ADDRESS_COUNTRY'),
            Region: _get(allData, 'ADDRESS_REGION'),
            PhoneNumber: _get(allData, 'PHONENUMBER'),
            Email: _get(allData, 'EMAIL'),
        },
        loanProvider: _get(allData, 'financialInfo.loanProvider', []),
        legal: {
            'RegistrationCertificateLink': _get(allData, 'REGISTRATIONCERTIFICATELINK'),
            'OrganizationalChartLink': _get(allData, 'ORGANIZATIONALCHARTLINK'),
            'TaxCertificateLink': _get(allData, 'TAXCERTIFICATELINK'),
        },
        financials: {
            BalanceSheet: _get(allData, 'FINANCIALINFO_BALANCESHEET'),
            IncomeStatement:_get(allData,'FINANCIALINFO_INCOMESTATEMENT'),
            Forecast:_get(allData,'FINANCIALINFO_FORECAST'),
            BusinessPlan: _get(allData, 'FINANCIALINFO_BUSINESSPLAN'),
            CashFlow: _get(allData, 'FINANCIALINFO_CASHFLOW'),
        },
        financialData: _get(allData, 'financialInfo.financialData', []),
        team: {},
        benificiaryShareholders: {},
        marketingMaterials: {
            PresentationLink: _get(allData, 'PRESENTATIONLINK'),
            OrganizationLink: _get(allData, 'URL'),
            VideoLink: _get(allData, 'VIDEOLINK'),
        },
    }

    let data = {
        companyDetails: [],
        address: [],
        loanProvider: [],
        legal: [],
        financials: [],
        marketingMaterials: [],
        financialData: [],
        team: [],
        benificiaryShareholders: [],
    };
    console.log(parseData, "parseData")
    Object.keys(parseData).map((header, index) => {

        switch (header) {
            case 'companyDetails': {
                let everyUndfined = Object.keys(parseData['companyDetails']).every((key) => parseData['companyDetails'][key] == undefined);
                if (everyUndfined) {
                    delete data.address
                }
                !everyUndfined && data[header].push(
                    <GeneralView
                        fields={props.fields}
                        FieldAccessReqTask={props.FieldAccessReqTask}
                        companyDetails={parseData[header]}
                        header="Company Details"
                    />
                )
                break;
            }
            case 'address': {

                let everyUndfined = Object.keys(parseData['address']).every((key) => parseData['address'][key] == undefined)
                if (everyUndfined) {
                    delete data.address
                }
                !everyUndfined && data[header].push(
                    <GeneralView
                        fields={props.fields}
                        FieldAccessReqTask={props.FieldAccessReqTask}
                        companyDetails={parseData[header]}
                        header="Address Details"
                    />
                )
                break;
            }
            case 'loanProvider': {
                let everyUndfined = Object.keys(parseData['loanProvider']).every((key) => parseData['loanProvider'][key] == undefined)
                if (everyUndfined) {
                    delete data.loanProvider
                }

                !everyUndfined&&data[header].push(
                    <LoanProvider
                        fields={props.fields}
                        FieldAccessReqTask={props.FieldAccessReqTask}
                        companyDetails={parseData[header]}
                        loanProvider={parseData[header]}
                    />
                )
                break;
            }
            case 'financialData': {
                let everyUndfined = Object.keys(parseData['financialData']).every((key) => parseData['financialData'][key] == undefined)
                if (everyUndfined) {
                    delete data.financialData
                }

                !everyUndfined&&data[header].push(
                    <FinancialData
                        fields={props.fields}
                        FieldAccessReqTask={props.FieldAccessReqTask}
                        companyDetails={parseData[header]}
                        financialData={parseData[header]}
                    />
                );
                break;
            }
            case 'financials': {
                let everyUndfined = Object.keys(parseData['financials']).every((key) => parseData['financials'][key] == undefined)
                if (everyUndfined) {
                    delete data.financials
                }
                !everyUndfined&&data[header].push(
                    <FinancialLinks
                        fields={props.fields}
                        FieldAccessReqTask={props.FieldAccessReqTask}
                        companyDetails={parseData[header]}
                        companyDetails={parseData[header]}
                        header='Financial Links'
                    />
                );
                break;
            }
            case 'legal': {
                let everyUndfined = Object.keys(parseData['legal']).every((key) => parseData['legal'][key] == undefined)
                if (everyUndfined) {
                    delete data.legal
                }
                !everyUndfined&&data[header].push(
                    <FinancialLinks
                        fields={props.fields}
                        FieldAccessReqTask={props.FieldAccessReqTask}
                        companyDetails={parseData[header]}
                        companyDetails={parseData[header]}
                        header='Legal Links'
                    />
                );
                break;
            }
            case 'marketingMaterials': {
                let everyUndfined = Object.keys(parseData['marketingMaterials']).every((key) => parseData['marketingMaterials'][key] == undefined)
                if (everyUndfined) {
                    delete data.marketingMaterials
                }
                !everyUndfined&&data[header].push(

                    <FinancialLinks
                        fields={props.fields}
                        FieldAccessReqTask={props.FieldAccessReqTask}
                        companyDetails={parseData[header]}
                        header='Marketing Materials Links'
                    />
                );
                break;
            }
            default: {

            }
        }
    });
    console.log(data, "boldonazara")

    return (
        <div>
            <div className="row">
                {
                    Object.keys(data).map((key, index) => {
                        let title = key.replace(/([A-Z])/g, '$1');
                        return (
                            <div className="col-sm-4">
                                {
                                    key !== 'financialData' &&
                                    <div >
                                        <div className="inner-wrap">
                                            <div>{data[key]}</div>
                                        </div>
                                    </div>
                                }

                            </div>
                        )
                    })
                }
            </div>
            <div className="col-sm-12">
                <div className="inner-wrap">
                    <div>{data.financialData}</div>
                </div>
            </div>

        </div>
    )
}

export default PopulateDataDetails 