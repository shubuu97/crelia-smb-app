import { withHandlers } from "recompose";


const modifyName = (name) => {
    switch (name) {
        case 'CompanyName':
            return 'LEGALNAME'
            break;
        case 'BalanceSheet':
            return 'FINANCIALINFO_BALANCESHEET'
            break;
        case 'IncomeStatement':
            return 'FINANCIALINFO_INCOMESTATEMENT'
            break;
        case 'Forecast':
            return 'FINANCIALINFO_FORECAST'
            break;
        case 'BusinessPlan':
            return 'FINANCIALINFO_BUSINESSPLAN'
            break;
        case 'CashFlow':
            return 'FINANCIALINFO_CASHFLOW'
            break;
        case 'OrganizationLink':
            return 'URL'
            break;
        case 'Street-1':
            return 'ADDRESS_LINE1'
            break;
        case 'Street-2':
            return 'ADDRESS_LINE2'
            break;
        case 'City':
            return 'ADDRESS_CITY'
            break;
        case 'ZipCode':
            return 'ADDRESS_ZIPCODE'
            break;
        case 'Country':
            return 'ADDRESS_COUNTRY'
            break;
        case 'Region':
            return 'ADDRESS_REGION'
            break;
        case 'PhoneNumber':
            return 'PHONENUMBER'
            break;
        case 'Email':
            return 'EMAIL'
            break;
        default:
            return name
            break;
    }
}

const handleChange = props => name => event => {
    debugger;
    let allFields = { ...props.fields };
    //Logic to change the names according to sending to ui
    name = modifyName(name)
    allFields[name] = JSON.parse(event.target.checked);
    if (name == 'FINANCIALINFO_LOANPROVIDER_PROVIDERNAME') {
        allFields['FINANCIALINFO_LOANPROVIDER_PROVIDERNAME'] = event.target.checked;
        allFields['FINANCIALINFO_LOANPROVIDER_AMOUNT'] = event.target.checked;
    };
    if (name == 'FINANCIALINFO_FINANCIALDATA') {
        delete allFields.FINANCIALINFO_FINANCIALDATA;
        allFields['FINANCIALINFO_FINANCIALDATA_YEAR'] = event.target.checked;
        allFields['FINANCIALINFO_FINANCIALDATA_SALES'] = event.target.checked
        allFields['FINANCIALINFO_FINANCIALDATA_EBITDA'] = event.target.checked;
        allFields['FINANCIALINFO_FINANCIALDATA_INTERESTEXPENSE'] = event.target.checked;
        allFields['FINANCIALINFO_FINANCIALDATA_CASH'] = event.target.checked;
        allFields['FINANCIALINFO_FINANCIALDATA_TOTALFINALDEBT'] = event.target.checked;
        allFields['FINANCIALINFO_FINANCIALDATA_TOTALSHAREHOLDEREQUITY'] = event.target.checked;
    }
    props.FieldAccessReqTask(allFields);
    return { [name]: event.target.checked };
};
const withSwitchState = props => (name, value) => {
    debugger;
    let allFields = { ...props.fields };
    //Logic to change the names according to sending to ui
    if (name == 'Company Details') {
        allFields['LEGALNAME'] = props.companyDetails.CompanyName?value:null
        allFields['IncorporationDate'] = props.companyDetails.IncorporationDate?value:null
        allFields['IndustryType'] = props.companyDetails.IndustryType?value:null
        allFields['LegalEntityType'] = props.companyDetails.LegalEntityType?value:null
        allFields['RegistrationNumber'] = props.companyDetails.RegistrationNumber?value:null
        allFields['taxId'] = props.companyDetails.taxId?value:null
        allFields['licenseNumber'] = props.companyDetails.licenseNumber?value:null
        allFields['numberOfEmployees'] = props.companyDetails.numberOfEmployees?value:null;
    }
    else if (name == 'Address Details') {
        debugger;
        allFields['ADDRESS_LINE1'] =props.companyDetails['Street-1']?value:null
        allFields['ADDRESS_LINE2'] =props.companyDetails['Street-2']?value:null
        allFields['ADDRESS_CITY'] =props.companyDetails.City?value:null
        allFields['ADDRESS_ZIPCODE'] =props.companyDetails.ZipCode?value:null
        allFields['ADDRESS_COUNTRY'] =props.companyDetails.Country?value:null
        allFields['ADDRESS_REGION'] =props.companyDetails.Region?value:null
        allFields['PHONENUMBER'] = props.companyDetails.PhoneNumber?value:null
        allFields['EMAIL'] =props.companyDetails.Email?value:null
    }
    else if (name == 'Financial Links') {
        allFields['FINANCIALINFO_BALANCESHEET'] = props.companyDetails['BalanceSheet']?value:null
        allFields['FINANCIALINFO_INCOMESTATEMENT'] = props.companyDetails['IncomeStatement']?value:null
        allFields['FINANCIALINFO_FORECAST'] =props.companyDetails['Forecast']?value:null
        allFields['FINANCIALINFO_BUSINESSPLAN'] =props.companyDetails['BusinessPlan']?value:null
        allFields['FINANCIALINFO_CASHFLOW'] =props.companyDetails['CashFlow']?value:null
    }
    else if (name == 'Marketing Materials Links') {
        allFields['PRESENTATIONLINK'] =  props.companyDetails['PresentationLink']?value:null
        allFields['URL'] =  props.companyDetails['OrganizationLink']?value:null
        allFields['VIDEOLINK'] =  props.companyDetails['VideoLink']?value:null
    }
    else if (name == 'Legal Links') {
        allFields['REGISTRATIONCERTIFICATELINK'] =props.companyDetails.RegistrationCertificateLink?value:null
        allFields['ORGANIZATIONALCHARTLINK'] =props.companyDetails.OrganizationalChartLink?value:null
        allFields['TAXCERTIFICATELINK'] =props.companyDetails.TaxCertificateLink?value:null
    }
    else if (name == 'Provider Details') {
        allFields['FINANCIALINFO_LOANPROVIDER_PROVIDERNAME'] = value;
        allFields['FINANCIALINFO_LOANPROVIDER_AMOUNT'] = value;
    }
    else if ('Financial Data') {
        allFields['FINANCIALINFO_FINANCIALDATA_YEAR'] = value;
        allFields['FINANCIALINFO_FINANCIALDATA_SALES'] = value
        allFields['FINANCIALINFO_FINANCIALDATA_EBITDA'] = value;
        allFields['FINANCIALINFO_FINANCIALDATA_INTERESTEXPENSE'] = value;
        allFields['FINANCIALINFO_FINANCIALDATA_CASH'] = value;
        allFields['FINANCIALINFO_FINANCIALDATA_TOTALFINALDEBT'] = value;
        allFields['FINANCIALINFO_FINANCIALDATA_TOTALSHAREHOLDEREQUITY'] = value
    }
    console.log(allFields)
    props.FieldAccessReqTask(allFields);
    return { [name]: false };
};

const withCheckBoxStates = withHandlers({ handleChange, withSwitchState });

export default withCheckBoxStates;