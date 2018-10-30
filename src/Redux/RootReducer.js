import {combineReducers} from 'redux';
import {reducer as formReducer}  from 'redux-form';
import LoginData from '../Authorization/Reducer/login';
import ShowToast from './toastReducer';
import SignUpData from '../Authorization/Reducer/signup';
import CountryList from '../CompanyProfile/Reducers/Country';
import IndustryList from '../CompanyProfile/Reducers/Industry';
import LegalEntities from '../CompanyProfile/Reducers/LegalEntity';
import EmpTypeList from '../CompanyProfile/Reducers/EmployeeType';
import BasicInfo from '../Authorization/Reducer/basicData';
import SetPassword from '../Authorization/Reducer/setPassword';



let rootRducer = combineReducers({
    form:formReducer,
    LoginData,
    ShowToast,
    SignUpData,
    CountryList,
    IndustryList,
    LegalEntities,
    EmpTypeList,
    BasicInfo,
    SetPassword
})

export default rootRducer;