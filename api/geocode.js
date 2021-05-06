const request = require('request')


const geocode = (address, callback) => {

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibWJheWVzYW1ibmRpYXllIiwiYSI6ImNrZDVjaTI1ZDA2dHYyc3F2ZWtoaW03YzMifQ.40S5htdpvpoBO8FsVlgyLg`
    request({ url, json: true }, (error, response) => {

        if (error) {
            callback('unable to access mapbox api', undefined)
        } else if (response.body.features.length === 0) {

            callback('please provide a valid location identifier', undefined)
        } else {
            const longitude = response.body.features[0].center[0]
            const latitude = response.body.features[0].center[1]
            callback(undefined, {

                longitude,
                latitude
            })
        }
    })
}


// geocode('Los Angeles', (error, data) => {

//     console.log(data)
// })


module.exports = geocode