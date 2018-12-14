import { createSelector } from 'reselect';
import { getBasicInfoData } from './common';
import get from 'lodash/get';

const basicInfoData = state => get(getBasicInfoData(state), 'lookUpData.companyDetails');
const mapAddressInfo = state =>
{
return get(getBasicInfoData(state), 'lookUpData.companyDetails.address')
}

const mapBasicInfo = data =>
{
    console.log(data,'%^&')
return ({
    status: get(data, 'legalEntityType') && get(data, 'legalName') && get(data, 'incorporationDate') && get(data, 'registrationNumber') && get(data, 'industryType') ? 'filled' :
        get(data, 'legalEntityType') || get(data, 'legalName') || get(data, 'incorporationDate') || get(data, 'registrationNumber') || get(data, 'numberOfEmployees') || get(data, 'industryType') ? 'p-filled' : 'u-filled'
})
}

const showStatusAddress = (basicInfoData, address) => 
{
console.log(basicInfoData, address,"1234")
return({
    status: get(address, 'city') && get(address, 'country') &&
        get(address, 'line1') && get(address, 'line2') &&
        get(address, 'region') && get(address,'zipCode') &&get(basicInfoData,'email')
        &&(basicInfoData,'phoneNumber')
        ? 'filled' :
        get(address, 'city') || get(address, 'country') ||
        get(address, 'line1') || get(address, 'line2') ||
        get(address, 'region') || get(address,'zipCode') ||get(basicInfoData,'email',null)
        ||(basicInfoData,'phoneNumber',null) ?
            'p-filled' : 'u-filled'

})
}

const showStatusMarketingMaterial = (data)=>
{
 return (
     {
        status: get(data, 'videoLink') && get(data, 'presentationLink') && get(data, 'url')? 'filled' :
        get(data, 'videoLink') || get(data, 'presentationLink') || get(data, 'url') ? 'p-filled' : 'u-filled' 
     }
 )   
}

const showStatusLegal = (data)=>
{
    return (
        {
            status: get(data, 'registrationCertificateLink') && get(data, 'taxCertificateLink') && get(data, 'organizationalChartLink')? 'filled' :
            get(data, 'registrationCertificateLink') || get(data, 'taxCertificateLink') || get(data, 'organizationalChartLink') ? 'p-filled' : 'u-filled' 
        }
    )
}

const checklengthOfList = (list)=>
{
return {status: list.length>0?'filled':'u-filled'}
}

const formStatusAbout = createSelector(
    basicInfoData,
    mapBasicInfo
)
const formStatusContact = createSelector(
    basicInfoData,
    mapAddressInfo,
    showStatusAddress
)
const formStatusMarketingMaterial = createSelector(
    basicInfoData,
    showStatusMarketingMaterial
);

const formStatusLegal = createSelector(
    basicInfoData,
    showStatusLegal
)

const formStatusTeam = createSelector(
state=>get(state,'EmployeeList.lookUpData'),
checklengthOfList

)

//todo this need to be done completley
const formStatusFinancials = createSelector(
state=>get(state,'BasicInfo.lookUpData')
)
const formStatusBenificiary = createSelector(
state=>get(state,'shareHolders.lookUpData'),
checklengthOfList
)


export {
    formStatusAbout,
    formStatusContact,
    formStatusMarketingMaterial,
    formStatusLegal,
    formStatusTeam,
    formStatusFinancials,
    formStatusBenificiary
}






