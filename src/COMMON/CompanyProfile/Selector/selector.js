import { createSelector } from 'reselect';
import { getBasicInfoData } from './common';
import get from 'lodash/get';

const basicInfoData = state => get(getBasicInfoData(state), 'lookUpData.companyDetails');
const mapAddressInfo = data => get(data,'address')


const mapBasicInfo = data => ({
    status: get(data, 'legalEntityType') && get(data, 'legalName') && get(data, 'incorporationDate') && get(data, 'registrationNumber') && get(data, 'industryType') ? 'green' :
        get(data, 'legalEntityType') || get(data, 'legalName') || get(data, 'incorporationDate') || get(data, 'registrationNumber') || get(data, 'numberOfEmployees') || get(data, 'industryType') ? 'yellow' : 'red'
})

const showStatusAddress = data => ({
    status:get(data, 'legalEntityType') && get(data, 'legalName') && get(data, 'incorporationDate') && get(data, 'registrationNumber') && get(data, 'industryType') ? 'green' :
    get(data, 'legalEntityType') || get(data, 'legalName') || get(data, 'incorporationDate') || get(data, 'registrationNumber') || get(data, 'numberOfEmployees') || get(data, 'industryType') ? 'yellow' : 'red'

})
 



const formStatusAbout = createSelector(
    basicInfoData,
    mapBasicInfo
)
const formStatusContact = createSelector(
    basicInfoData,
    mapAddressInfo,
    showStatusAddress
)



export {
    formStatusAbout,
    formStatusContact
}