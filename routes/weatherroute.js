const express = require('express')
const geocode = require('../api/geocode')
const weatherstack = require('../api/weatherstack')


const route = express.Router()


route.get('/weather', (req, res) => {

    // console.log(req.params)
    const address = req.query.location
    if (!address) {

        return res.send({ error: 'please provide an address' })
    }

    geocode(address, (error, data) => {
        if (error) {

            return res.send({ error })
        } else {

            weatherstack(data.longitude, data.latitude, (error, forcast) => {

                if (error) {
                    return res.send({
                        error
                    })
                } else {

                    return res.send({
                        forcast
                    })
                }
            })
        }

    })


})


module.exports = route