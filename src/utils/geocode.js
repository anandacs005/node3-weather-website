const request = require('request')
const geocode = (address, callback) => {
    const geoCodeUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiYW5hbmRhY3MwMDUiLCJhIjoiY2szNThveWpqMDU3bjNjcjF2cmViZGpkZiJ9.tKNPOFaymU4L3huNbLLw5A&limit=1&language=kn"    
    request({ url: geoCodeUrl, json: true }, (error, {body}) => {
        if (error) {
            callback("Unable to connect to geocode service!")
        }
        else if (body.features.length == 0) {
            callback('unable to find location')
        }
        else {
            const data = {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            }            
            callback(undefined, data)
        }
    })
}

module.exports = geocode