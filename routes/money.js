const express = require('express')


const route = express.Router()


route.get('/currency', (req, res) => {



    res.render('currency', {
        title: 'Currency Checker',
        footer: '/currency'
    })
})


module.exports = route