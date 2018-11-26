import UpdateSMBFun from './commonReducer';
import {combineReducers} from 'redux';
import {reducer as formReducer}  from 'redux-form';
/* INVESTOR Reducers*/ 
import LoginData from '../COMMON/Authorization/Reducer/login';
import ShowToast from './toastReducer';
import SignUpData from '../COMMON/Authorization/Reducer/signup';
import CountryList from '../COMMON/CompanyProfile/Reducers/Country';
import IndustryList from '../COMMON/CompanyProfile/Reducers/Industry';
import LegalEntities from '../COMMON/CompanyProfile/Reducers/LegalEntity';
import EmpTypeList from '../COMMON/CompanyProfile/Reducers/EmployeeType';
import BasicInfo from '../COMMON/Authorization/Reducer/basicData';
import SetPassword from '../COMMON/Authorization/Reducer/setPassword';
/* SMB Reducers*/

/* COMMON Reducers*/ 
import parseDataFun from './commonReducer'
import CobPostFun from './commonReducer';
import CobPostMarketPlaceFun from './commonReducer';
import UpdateSMBUserFun from './commonReducer';
import AddTeamFun from './commonReducer';
import getEmployeeListFun from './commonReducer';
import shareHoldersFun from './commonReducer';


let CobPost=CobPostFun('cobsave');
let CobPostMarketPlace=CobPostMarketPlaceFun('cob-post-marketplace');
let UpdateSMB = UpdateSMBFun('UpdateSMB');
let UpdateSMBUser = UpdateSMBUserFun('UpdateSMBUser');
let AddTeam = AddTeamFun('addTeam');
let EmployeeList = getEmployeeListFun('getEmployeeList');
let ParseData = parseDataFun('Parse_Data');
let shareHolders = shareHoldersFun('getshareHolderList')

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
    EmployeeList,
    ParseData,
    shareHolders
})

export default rootRducer;