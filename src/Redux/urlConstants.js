let APPLICATION_BFF_URL
console.log("ENV ++", process.env);
if (process.env.NODE_ENV !== 'production') {
    APPLICATION_BFF_URL = "https://devcreliasmb.allonblock.com";

}
else {
  
    APPLICATION_BFF_URL = process.env.APPLICATION_BFF_URL;
    console.log('i came here',process.env)

}

export { APPLICATION_BFF_URL };
