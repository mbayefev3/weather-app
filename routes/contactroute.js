const express = require('express')


const route = express.Router()



route.get('/contact', (req, res) => {

    res.render('contact', {
        title: 'Contact Information'
    })
})



module.exports = route