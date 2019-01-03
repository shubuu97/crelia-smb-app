import React from 'react';
import _get from 'lodash/get';
/* Component Imports */
import FinancialData from './components/FinancialData';
import LoanProvider from './components/LoanProvider';
import GeneralView from './components/GeneralView';
/* Parse Data Imports */
import parseDefaultData from './dataUtility/parseDefaultData';
import parseApiData from './dataUtility/parseApiData';

const PopulateDataDetails = (props) => {

    let dataObject = _get(props, 'dataObject', []);
    //logic to categorize dataObject;
    let allData = {};
    dataObject.map(key => {
        let obj = {};
        allData[key] = key;
    });
    let parseData

    if (props.defaultTask) {
        parseData = parseDefaultData;
    }
    else {
        parseData = parseApiData(allData);
    }
    let data = {
        companyDetails: [],
        address: [],
        loanProvider: [],
        legal: [],
        financials: [],
        marketingMaterials: [],
        financialData: []
    };
    console.log(parseData, "parseData")
    Object.keys(parseData).map((header, index) => {

        switch (header) {
            case 'companyDetails': {
                debugger
                let everyUndfined = Object.keys(parseData['companyDetails']).every((key) => parseData['companyDetails'][key] == undefined);
                if (everyUndfined) {
                    delete data.companyDetails
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

                !everyUndfined && data[header].push(
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

                !everyUndfined && data[header].push(
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
                !everyUndfined && data[header].push(
                    <GeneralView
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
                !everyUndfined && data[header].push(
                    <GeneralView
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
                !everyUndfined && data[header].push(

                    <GeneralView
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
                            <div className="col-sm-4 pb-30">
                                <div>
                                    <div className="inner-wrap">
                                        <div>{data[key]}</div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default PopulateDataDetails 