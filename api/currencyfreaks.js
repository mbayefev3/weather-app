const request = require('request')
var cc = require('currency-codes');
const fs = require('fs');



const data = fs.readFileSync('./data.json')
const currency = fs.readFileSync('./currency.json')
const currencyBuffer = currency.toString()
const currencyParse = JSON.parse(currencyBuffer)
const dataBuffer = data.toString()
const dataParsed = JSON.parse(dataBuffer)
// console.log(dataParsed)

// console.log(dataParsed)
const giveMeCountry = (country) => {

    const threeCode = Object.entries(dataParsed).filter(cou => cou[1].toLowerCase() === country.toLowerCase()).flat()[0]

    if (threeCode) {

        const currency = Object.entries(currencyParse).filter(arr => arr[0].toLowerCase() === threeCode.toLowerCase()).flat()[1]

        return {
            currency: currency,
            countryCode: threeCode
        }
    }
}

const currencyfreaks = (From, To, callback) => {

    const FromCountry = giveMeCountry(From).currency
    const toCountry = giveMeCountry(To).currency
    const countryCodeFrom = giveMeCountry(From).countryCode
    const countryCodeTo = giveMeCountry(To).countryCode


    const url = `https://api.currencyfreaks.com/latest?apikey=992b19978a484e1eb528da2cdf39cf08&base=${FromCountry}`

    request({ url, json: true }, (error, response) => {

        if (error) {
            callback('unable to access currencyfreaks api', undefined)
        } else if (response.body.error) {
            callback('not available', undefined)

        } else {


            const baseCurrency = Object.entries(response.body.rates)
            const filtered = baseCurrency.filter(arr => arr[0] === toCountry).flat()
            const fromCurrency = From
            const toCurrency = filtered[0]
            const amount = filtered[1]
            const base = response.body.base
            callback(undefined, {

                fromCurrency,
                toCurrency,
                amount,
                base,
                countryCodeFrom,
                countryCodeTo
            })
        }
    })

}


// currencyfreaks('united states', 'senegal', (error, data) => {

//     console.log(error)

//     console.log(data)
// })

module.exports = currencyfreaks