import React from 'react';
import _get from 'lodash/get';
import moment from 'moment';
import FinancialData from './FinancialDataTable';
import LoanProvider from './loanProviderView';
import FundingView from './FundingView';
import GeneralView from './GeneralView';
import FinancialLinks from './FinancialLinks';
import Team from './Team';

const PopulateDataDetails = (props) => {

    // This needs to be dynamic(allData.DYNAMIC-KEY)
    let allData = _get(props, 'allData.company', []);

    //Map the data to display in view
    let parseData = {
        companyDetails: {
            CompanyName: _get(allData, 'legalName', '-'),
            IndustryType: `${_get(allData, 'industryType', '-')}`,
            LegalEntityType: `${_get(allData, 'legalEntityType', '-')}`,
            IncorporationDate: `${moment(_get(allData, 'incorporationDate', '-')).format('DD-MM-YYYY')}`,
            taxId: `${_get(allData, 'taxId', '-')}`,
            RegistrationNumber: `${_get(allData, 'registrationNumber', '-')}`,
            licenseNumber: _get(allData, 'licenseNumber', '-'),
            numberOfEmployees: `${_get(allData, 'numberOfEmployees', '-')}`,
        },
        address: {
            'Street-1': _get(allData, 'address.line1', '-'),
            'Street-2': _get(allData, 'address.line2', '-'),
            City: _get(allData, 'address.city', '-'),
            ZipCode: _get(allData, 'address.zipCode', '-'),
            Country: _get(allData, 'address.country', '-'),
            Region: _get(allData, 'address.region', '-'),
            PhoneNumber: _get(allData, 'phoneNumber', '-'),
            Email: _get(allData, 'email', '-'),
        },
        fundingDetails: {
            moneyRequired: _get(allData, 'onboardingInfo.moneyRequired', '-'),
            timeFrame: _get(allData, 'onboardingInfo.timeFrame', '-'),
            fundAllocation: _get(allData, 'onboardingInfo.fundAllocation', []),
            fundingType: _get(allData, 'onboardingInfo.fundingType', []),
        },
        loanProvider: _get(allData, 'financialInfo.loanProvider', []),
        legal: {
            'RegistrationCertificateLink': _get(allData, 'registrationCertificateLink', '-'),
            'OrganizationalChartLink': _get(allData, 'organizationalChartLink', '-'),
            'TaxCertificateLink': _get(allData, 'taxCertificateLink', '-'),
        },
        financials: {
            BalanceSheet: _get(allData, 'financialInfo.balanceSheet', []),
            BusinessPlan: _get(allData, 'financialInfo.businessPlan', []),
            CashFlow: _get(allData, 'financialInfo.cashFlow', []),
        },
        financialData: _get(allData, 'financialInfo.financialData', []),
        team: {
            $class: _get(allData, '$class', ''),
            id: _get(allData, 'id', ''),
        },
        benificiaryShareholders: {
            $class: _get(allData, '$class', ''),
            id: _get(allData, 'id', ''),
        },
        marketingMaterials: {
            PresentationLink: _get(allData, 'presentationLink', '-'),
            OrganizationLink: _get(allData, 'url', '-'),
            VideoLink: _get(allData, 'url', '-'),
        },
    }

    return (
        <div>
            <div className="row">
                <div className="col-sm-4">
                    <GeneralView
                        companyDetails={parseData.companyDetails}
                        header="Company Details"
                    />
                </div>
                <div className="col-sm-4">
                    <GeneralView
                        companyDetails={parseData.address}
                        header="Company Details"
                    />
                </div>
                <div className="col-sm-4">
                    <FundingView
                        fundingDetails={parseData.fundingDetails}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-sm-4">
                    <LoanProvider
                        loanProvider={parseData.loanProvider}
                    />
                </div>
                <div className="col-sm-4">
                    <FinancialLinks
                        companyDetails={parseData.legal}
                        header='Legal Links'
                    />
                </div>
                <div className="col-sm-4">
                    <FinancialLinks
                        companyDetails={parseData.financials}
                        header='Financial Links'
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-sm-4">
                    <FinancialLinks
                        companyDetails={parseData.marketingMaterials}
                        header='Marketing Materials Links'
                    />
                </div>
            </div>
            <div>
                <Team
                    team={parseData.team}
                    viewOf="Employees"
                    header='Employees'
                /></div>
            <div>
                <Team
                    team={parseData.benificiaryShareholders}
                    viewOf="ShareHolders"
                    header="Benificiary Shareholders"
                />
            </div>
            <div className="col-sm-12">
                <div className="inner-wrap">
                    <div>
                        <FinancialData
                            financialData={parseData.financialData}
                        />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default PopulateDataDetails 