function RoutedDecider(status)
{
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