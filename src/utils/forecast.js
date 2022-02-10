const request=require('request');

const forecast=(latitude,longitude,callback)=>{
    const url="http://api.weatherstack.com/current?access_key=8d7bdb4be06d2eae5e14a1f95cc9e0bb&query="+latitude+","+longitude;
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('unable to connect to weather service!');
        }else if(response.body.error){
            callback('unable to find weather data for specified location');        
        }else{
            const temperature=response.body.current.temperature;
            const feelslike=response.body.current.feelslike;
            callback(undefined,`current temparature : ${temperature} and it feels like : ${feelslike}`);
        }
    })
}

module.exports=forecast;