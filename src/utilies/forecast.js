const request = require('request');


const forecast = (lat,lang,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=4c019cfd8e17a6486239730a7b0d39ac&query='+lat+','+lang+'';

request({url,json:true},(error, {body})=>{
    if(error){
        callback('unable to connect to weather services',undefined)
       }
       else if(body.error){
        callback('unable to find location',undefined)
       }else{
        callback(undefined,'it is currently '+body.current.temperature +' degree out.It feels like '+body.current.feelslike +' degree out')
}
})
}


module.exports = forecast;