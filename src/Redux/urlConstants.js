let APPLICATION_BFF_URL
console.log("ENV ++", process.env);
if (process.env.NODE_ENV !== 'production') {
    APPLICATION_BFF_URL = "http://13.233.72.1:4005";

}
else {
  
    APPLICATION_BFF_URL = process.env.APPLICATION_BFF_URL;
    console.log('i came here',process.env)

}

export { APPLICATION_BFF_URL };
