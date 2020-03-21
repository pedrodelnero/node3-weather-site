const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Setup express
const app = express();

// DEFINE PATHS FOR EXPRESS CONFIG
    // Setup path to the public folder
const publicDirPath = path.join(__dirname, '../public');
    // Setup path to use for custom location example
const viewsPath = path.join(__dirname, '../templates/views');
    // Setup path to partials (used down in handlebars)
const partialPaths = path.join(__dirname, '../templates/partials');


// SETUP HANDLEBARS ENGINE & VIEWS LOCATION
    // handlebar hbs module set
app.set('view engine', 'hbs');
    // Setup custom viewes location 
app.set('views', viewsPath)
hbs.registerPartials(partialPaths)

// Setup static dir(asset) to serve
app.use(express.static(publicDirPath))



// RENDERING
    // Index (home)  page
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather page',
        name: 'Pedro'
    })
});
    // About page
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Pedro'
    })
});
    // Help page
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Pedro',
        message: 'Help you? Only if you ask nicely...and with detail. Not gonna ask a thousand questions now'
    })
});

    // Weater page (yet to come)
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        // Used return so 2nd res down below is runned
        return res.send( {
            error: 'You must provide an address'
        })
    }

        geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({ error })
            } 
            
                forecast(latitude, longitude, (error, forcastData) => {
                    if (error) {
                        return res.send({ error })
                    }
            
                    
                    res.send({
                        forecast: forcastData,
                        location,
                        address: req.query.address
                    })
            });
        })
    
    
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        // Used return so 2nd res down below is runned
        return res.send( {
            error: 'You must provide a search term'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    });
});




    // 404 after help page
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        name: 'Pedro',
        message: 'Help article not found'
    })
});
    // General 404 (always comes last)
app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        name: 'Pedro',
        message: 'Page not found'
    })});


// Turns on server
app.listen(3000, () => {
    console.log('Server running on port 3000')
});