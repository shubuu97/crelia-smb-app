import About from './About';
import Contacts from './Contacts';
import Legal from './legal';
import MarketingMaterial from './marketingMaterial';
import AddTeam from './AddTeam.js';
import BeneficiaryShareholder from './BeneficiaryShareholders';
import Financial from './financials';
import SideBar from './SideBar'
import onBoarding from './onBoardingView/ReviewCOBInfoContainer'

export default [
    {path:'/About',Component:About},
    {path:'/marketingMaterials',Component:MarketingMaterial},
    {path:'/legal',Component:Legal},
    {path:'/financials',Component:Financial},
    {path:'/team',Component:AddTeam},
    {path:'/contacts',Component:Contacts},
    {path:'/beneficiary',Component:AddTeam},
    {path:'/onboardingview',Component:SideBar(onBoarding)}

    

]