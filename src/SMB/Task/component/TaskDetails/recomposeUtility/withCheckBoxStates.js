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
    allFields[name] = event.target.checked;
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
        allFields['FINANCIALINFO_FINANCIALDATA_TOTALSHAREHOLDEREQUITY'] = event.target.checked
    }
    props.FieldAccessReqTask(allFields);
    return { [name]: event.target.checked };
};

const withCheckBoxStates = withHandlers({ handleChange });

export default withCheckBoxStates;