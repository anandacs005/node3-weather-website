//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)
const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/15ea2b76b262453b8c592d0e16eed88c/' + latitude + ',' + longitude + '?lang=kn'

    request({ url: url, json: true }, (error, {body}) => {
        if (error) {
            callback("Unable to connect to weather service!")
        }
        else if (body.error) {
            callback('unable to find location')
        }
        else {
            // const data = JSON.parse(response.body)
            // console.log(data.currently)
            //console.log(response.body.currently)
            //console.log(body.daily.data[0])
            callback(body.daily.data[0].summary + " It is currently " + body.currently.temperature + " degrees out. The high today is " + body.daily.data[0].temperatureHigh  + " and with a low of "+ body.daily.data[0].temperatureLow + " Thers is " + body.currently.precipProbability + "% chance of rain")

            
        }
    })
}

module.exports = forecast
