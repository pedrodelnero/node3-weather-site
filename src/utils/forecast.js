const request = require('request')

const forecast = (lat, long, callback) => {
    const url = `https://api.darksky.net/forecast/e398d703b57879ee90f2b318eb183154/${lat},${long}`;

    request ({ url, json: true }, (error, { body }) => {
        if (error) {
            callback(`Unable to connect to location services`, undefined)
        } else if (body.error) {
            callback(`Unable to find location. Try another search`, undefined)
        } else {
            callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. The high today is ${body.daily.data[0].temperatureHigh} with a low of ${body.daily.data[0].temperatureLow}. There is a ${body.currently.precipProbability}% chance of rain`)
        }
    });
};



module.exports = forecast;