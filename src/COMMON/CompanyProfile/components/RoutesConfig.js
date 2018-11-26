/* SMB Imports*/
import About from './SMB/About';
import ContactsSMB from './SMB/Contacts';
import Legal from './SMB/legal';
import MarketingMaterial from './SMB/marketingMaterial';
import AddTeam from './SMB/AddTeam.js';
import BeneficiaryShareholder from './SMB/BeneficiaryShareholders';
import Financial from './SMB/financials';
import onBoarding from './SMB/onBoardingView/ReviewCOBInfoContainer'

/* Investor Imports*/
import General from './INVESTOR/General';
import ContactsINVESTOR from './INVESTOR/Contacts';
import Assets from './INVESTOR/Assets';
import Employee from './INVESTOR/Employee';

/* Common */
import SideBar from './SideBar'

let Routes = []

if (localStorage.getItem("role") == 'InvestorUser') {
    Routes = [
        { path: '/company-profile/general', Component: General },
        { path: '/company-profile/contact', Component: ContactsINVESTOR },
        { path: '/company-profile/assets', Component: Assets },
        { path: '/company-profile/employee', Component: Employee },
    ]
}

else {
    Routes = [
        { path: '/About', Component: About },
        { path: '/marketingMaterials', Component: MarketingMaterial },
        { path: '/legal', Component: Legal },
        { path: '/financials', Component: Financial },
        { path: '/team', Component: AddTeam },
        { path: '/contacts', Component: ContactsSMB },
        { path: '/beneficiary', Component: AddTeam },
        { path: '/onboardingview', Component: SideBar(onBoarding) }
    ]
}

export default Routes

