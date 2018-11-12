function RoutedDecider(status)
{
debugger
if(status=='APPROVED')
{
return 'about'
}
if(status=='PENDING_APPROVAL')
{
    return 'onboard'
}
}

export default RoutedDecider