/* SMB Imports*/
import About from './SMB/About';
import ContactsSMB from './SMB/Contacts';
import Legal from './SMB/legal';
import MarketingMaterial from './SMB/marketingMaterial';
import AddTeam from './SMB/AddTeam.js';
import BeneficiaryShareholder from './SMB/BeneficiaryShareholders';
import Financial from './SMB/financials';
import onBoarding from './SMB/onBoardingView/ReviewCOBInfoContainer'

/* Common */
import SideBar from './SideBar'

export default [
    { path: '/about', Component: About },
    { path: '/marketingMaterials', Component: MarketingMaterial },
    { path: '/legal', Component: Legal },
    { path: '/financials', Component: Financial },
    { path: '/team', Component: AddTeam },
    { path: '/contacts', Component: ContactsSMB },
    { path: '/beneficiary', Component: AddTeam },
    { path: '/onboardingview', Component: SideBar(onBoarding) }
]

