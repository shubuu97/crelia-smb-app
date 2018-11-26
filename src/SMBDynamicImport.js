
const Registration = (props)=>(
    <DynamicImport load={()=>import('./COMMON/Authorization/components/Registration/Register')}>
   {
     (Component)=>Component===null
     ?<h1>Loading</h1>
     :<Component {...props}/>
   }
    </DynamicImport>
  )
function SMBDynamicImport()
{
[
{CompanyOnBoardingContainer:'./SMB/CompanyOnBoarding/CompanyOnBoardingContainer'},
{ReviewCOBInfoContainer:'./SMB/CompanyOnBoarding/components/ReviewCOBInfo/ReviewCOBInfoContainer.jsx'},
{OnBoradingAckowledge:'./SMB/Acknowledge/OnBoradingAckowledge'},
{MyAccountContainer:'./SMB/MyAccount/MyAccountContainer'},
{RoutesConfig:'./SMB/CompanyProfile/components/RoutesConfig'}
]

}
