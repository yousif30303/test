const request = require('request');

const geocode = (address,callback)=>{
    const url1 = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address +'.json?access_token=pk.eyJ1IjoieW91c2lmMzAzMDMiLCJhIjoiY2tvcmFpMWJ0MGNsZDJ2b2gxam9nYTFwcCJ9.8aLBmk3jDffz39suvj3f_w&limit=1'
    request({url:url1,json:true},(error, {body})=>{
        if(error){
         callback('unable to connect to weather services',undefined)
         
        }else if(body.features.length===0){
            callback('unable to find location',undefined)
        }else{
          const data = {
         latitude : body.features[0].center[1] ,
         longitude  : body.features[0].center[0],
         location: body.features[0].place_name}
        callback(undefined,data)
    }  
    })
}

module.exports = geocode;