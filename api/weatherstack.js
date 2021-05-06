const request = require('request')
const moment = require('moment')

const weatherstack = (long, lat, callback) => {

    const url = `http://api.weatherstack.com/current?access_key=6c63199c8392b7f463b2f133302023b9&query=${lat},${long}&units=f`

    request({ url, json: true }, (error, response) => {

        if (error) {
            callback('unable to access weatherstack api', undefined)

        } else if (response.body.error) {
            callback('please provide a valid location', undefined)
        } else {
            const temperature = response.body.current.temperature + ' farenheit'
            const localTime = moment(response.body.location.localtime).format("dddd, MMMM Do YYYY h:mm a").split(' ').slice(4).join(' ')
            const date = moment(response.body.location.localtime).format("dddd, MMMM Do YYYY h:mm a").split(' ').slice(0, 4).join(' ')
            const country = response.body.location.country
            const region = response.body.location.region;
            const overcast = response.body.current.weather_descriptions[0]
            callback(undefined, {
                overcast
                ,
                temperature,
                localTime,
                country,
                region,

                date
            })
        }
    })

}





// weatherstack(-118.243683, 34.052235, (error, data) => {

//     console.log(data)
// })


module.exports = weatherstack