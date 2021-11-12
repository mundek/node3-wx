const request = require('request')

const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=a83ce0a8af8aebd67d2e5d574769473c&query=${lat},${long}&units=f`

    request({ url, json: true }, (error, { body }) => {
        // console.table(body);
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            const currWX = body.current;
            callback(undefined, `Current conditions: ${currWX.weather_descriptions[0]}. As of ${currWX.observation_time} UTC it is ${currWX.temperature} degrees F (feels like ${currWX.feelslike}) in ${body.location.name} (${lat}, ${long}).`)
        }
    })
}

module.exports = forecast