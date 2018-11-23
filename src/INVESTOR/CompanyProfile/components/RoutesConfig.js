import General from './About';
import Contacts from './Contacts';
import Assets from './legal';
import Employee from './marketingMaterial';
import AddTeam from './AddTeam.js';
import BeneficiaryShareholder from './BeneficiaryShareholders';
import Financial from './financials';
import SideBar from './SideBar'
import onBoarding from './onBoardingView/ReviewCOBInfoContainer'

export default [
    {path:'/company-profile/general',Component:General},
    {path:'/company-profile/contact',Component:Contacts},
    {path:'/company-profile/assets',Component:Assets},
    {path:'/company-profile/employee',Component:Employee},
]