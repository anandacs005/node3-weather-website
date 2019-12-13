
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//console.log(path.join(__dirname,"../public"))
const publicDirectoryPath = path.join(__dirname, "../public")

const viewPaths = path.join(__dirname, "../templates/views")
const partialsPaths = path.join(__dirname, "../templates/partials")

//setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewPaths) //customize the view paths
hbs.registerPartials(partialsPaths)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

//not needed after express.static
// app.get('',(req,res) => {
//     res.send("<h1>Hello Express!<h1>")
// })

// app.get("/help",(req,res) => {
//     res.send('Help page')
// })

// app.get('/about',(req,res) => {
//     res.send('<h1>About page<h1>')
// })


//hbs - handel bars
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: "Ananda"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: "Ananda"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: "Some help text",
        name: "Ananda"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ error: "Address must be provide" })
    }

    //get geocode followed by address
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error: "geocode not found for location" })
        }
        forecast(latitude, longitude, (forecastData) => {
            if (error) {
                return res.send({ error: "forecast error" })
            }
            res.send({ forecast: forecastData, location:location, address: req.query.address })
        })        
    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ananda',
        errorMessage: 'Help article not found.'
    })
})

//query string handling
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide serach term'
        })
    }
    res.send({
        products: []
    })
})

app.get("*", (req, res) => {
    res.send("My 404 page")
})

// for heoku we need to chnage the port number
// app.listen(3000, () => {
//     console.log("Server is running at port 3000")
// })

app.listen(port, () => {
    console.log("Server is running at port 3000")
})