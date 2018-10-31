let APPLICATION_BFF_URL
console.log("ENV ++", process.env);
if(process.env.NODE_ENV !== 'production')

{
    APPLICATION_BFF_URL = "http://13.233.72.1:4005";
    
}
else
{
APPLICATION_BFF_URL = "http://13.233.72.1:4005";
}

export {APPLICATION_BFF_URL};
