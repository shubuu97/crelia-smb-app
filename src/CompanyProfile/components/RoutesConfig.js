import About from './About';
import Contacts from './Contacts';
import Legal from './legal';
import MarketingMaterial from './marketingMaterial';
import AddTeam from './AddTeam.js';
import BeneficiaryShareholder from './BeneficiaryShareholders';
import Financial from './financials';

export default [
    {path:'/About',Component:About},
    {path:'/marketingMaterials',Component:MarketingMaterial},
    {path:'/legal',Component:Legal},
    {path:'/financials',Component:Financial},
    {path:'/team',Component:AddTeam},
    {path:'/contacts',Component:Contacts},
    {path:'/beneficiary',Component:BeneficiaryShareholder}



]