const express = require('express')
const hbs = require('hbs')
const path = require('path')
const weatherroute = require('./routes/weatherroute')
const contactroute = require('./routes/contactroute')
const rootpage = require('./routes/mainpage')
const moneyroute = require('./routes/money')
const moment = require('moment')
const request = require('request')
const fs = require('fs')

const app = express()

const port = process.env.PORT || 3000

app.set('view engine', 'hbs')

const publicPath = path.join(__dirname, './public') // allows me to access file in the public dir
const viewsPath = path.join(__dirname, './templates/views')
const partialsPath = path.join(__dirname, './templates/partials')
app.set('views', viewsPath)
app.use(express.static(publicPath))


hbs.registerPartials(partialsPath)

app.use(weatherroute)
app.use(contactroute)
app.use(rootpage)


app.use(moneyroute)

// ===================================================




const data = fs.readFileSync('./api/data.json')
const currency = fs.readFileSync('./api/currency.json')
const currencyBuffer = currency.toString()
const currencyParse = JSON.parse(currencyBuffer)
const dataBuffer = data.toString()
const dataParsed = JSON.parse(dataBuffer)
// console.log(dataParsed)

// console.log(dataParsed)
const giveMeCountry = (country) => {

    const threeCode = Object.entries(dataParsed).filter(cou => cou[1].toLowerCase() === country.toLowerCase()).flat()[0]

    const Country = Object.entries(dataParsed).filter(cou => cou[1].toLowerCase() === country.toLowerCase()).flat()[1]


    if (threeCode) {

        const currency = Object.entries(currencyParse).filter(arr => arr[0].toLowerCase() === threeCode.toLowerCase()).flat()[1]

        return {
            currency: currency,
            countryCode: threeCode,
            Country
        }
    }
}

const currencyfreaks = (From, To, callback) => {

    // here i add some defensive programming
    if (!giveMeCountry(From) && !giveMeCountry(To)) {
        callback('Please provide valid countries identifier', undefined)
    } else
        if (!giveMeCountry(From)) {
            callback('please provide a valid origin', undefined)
        } else if (!giveMeCountry(To)) {
            callback('please provide a valid destination', undefined)

        } else {
            const FromCountry = giveMeCountry(From).currency
            // console.log(FromCountry)
            const toCountry = giveMeCountry(To).currency
            const countryCodeFrom = giveMeCountry(From).countryCode
            const countryCodeTo = giveMeCountry(To).countryCode
            const countrySender = giveMeCountry(From).Country
            const countryReceiver = giveMeCountry(To).Country

            const url = `https://api.currencyfreaks.com/latest?apikey=992b19978a484e1eb528da2cdf39cf08&base=${FromCountry}`

            request({ url, json: true }, (error, response) => {

                if (error) {
                    callback('unable to access currencyfreaks api', undefined)
                } else if (response.body.error) {
                    callback('not available', undefined)

                } else {


                    const baseCurrency = Object.entries(response.body.rates)
                    const filtered = baseCurrency.filter(arr => arr[0] === toCountry).flat()
                    const toCurrency = filtered[0]
                    const amount = Number(filtered[1])
                    const base = response.body.base
                    const receive = To
                    // const array = [countrySender, countryReceiver, amount, updated, date,]

                    const localTime = moment(response.body.date).format("dddd, MMMM Do YYYY h:mm a").split(' ').slice(4).join('')
                    const date = moment(response.body.date).format("dddd, MMMM Do YYYY h:mm a").split(' ').slice(0, 4).join(' ')
                    callback(undefined, {

                        countrySender,
                        countryReceiver,
                        amount,
                        localTime,
                        date,
                        toCurrency,


                        base,
                        countryCodeFrom,
                        countryCodeTo,


                    })
                }
            })

        }

}

// console.log('g')


app.get('/currencycheck', (req, res) => {

    const origin = req.query.origin
    const destination = req.query.destination

    if (!origin) {

        return res.send({
            error: 'please provide an origin'
        })
    } else if (!destination) {
        return res.send({
            error: 'please provide a destination'
        })
    }

    currencyfreaks(origin, destination, (error, response) => {

        if (error) {
            console.log('g')
            return res.send({ error })
        } else {
            return res.send({
                summary: response
            })
        }
    })
})
// =========================================================================





app.listen(port, () => {
    console.log('running')
})