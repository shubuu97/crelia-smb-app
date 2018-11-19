import UpdateSMBFun from './commonReducer';
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
import CobPostFun from './commonReducer';
import CobPostMarketPlaceFun from './commonReducer';
import UpdateSMBUserFun from './commonReducer';
import AddTeamFun from './commonReducer';
import  getEmployeeListFun from './commonReducer';
let CobPost=CobPostFun('cobsave');
let CobPostMarketPlace=CobPostMarketPlaceFun('cob-post-marketplace');
let UpdateSMB = UpdateSMBFun('UpdateSMB');
let UpdateSMBUser = UpdateSMBUserFun('UpdateSMBUser');
let AddTeam = AddTeamFun('addTeam');
let EmployeeList = getEmployeeListFun('getEmployeeList');





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
    SetPassword,
    CobPost,
    CobPostMarketPlace,
    UpdateSMB,
    UpdateSMBUser,
    AddTeam,
    EmployeeList
})

export default rootRducer;