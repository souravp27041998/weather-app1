const request=require('request');

const geoCode=(address,callback)=>{
    const url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1Ijoic291cmF2cDI3MDQiLCJhIjoiY2t5enJzeDRyMGQ1aTJ1dDR6bXozdjd5YyJ9.gOZtdMyYDh7i0EBWRF5qVw&limit=1";
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('unable to connect to location services!');
        }else{
            const features=response.body.features;
            if(features.length>0){
                const place_name=features[0].place_name;
                const center=features[0].center;
                callback(undefined,{
                    lattitude:center[0],
                    longitude:center[1],
                    location:place_name
                });
            }else{
              callback('no data found for given location!');
            }
        }
    })
}

module.exports=geoCode;