const express = require('express')
const app = express()
const serveStatic = require('serve-static')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const compression = require('compression')
const port = process.env.PORT || 3000
const path = require('path')
app.use(helmet())
app.use(compression())
app.use(bodyParser.json())
let fulldataset = []
let activesubset = []

app.use(serveStatic('public', { index: false }))

app.get('/', function (req, res) {
  res.sendFile(path.normalize(__dirname + '/public/index.html'))
})
app.post('/', function (req, res) {
  fulldataset = req.body.data
  activesubset = fulldataset
  res.send({ data: activesubset })
})

app.post('/update', function (req, res) {
  activesubset = []
  let weaknesses = []
  let types = []
  const weights = []
  const heights = []
  // assess types
  if (req.body.types.length === 0) {
    types = fulldataset
  } else {
    fulldataset.forEach(function (element) {
      req.body.types.forEach(function (type) {
        if (element.type.includes(type) && !types.includes(element)) {
          types.push(element)
        }
      })
    })
  }
  // assess weaknesses
  if (req.body.weaknesses.length === 0) {
    weaknesses = fulldataset
  } else {
    fulldataset.forEach(function (element) {
      req.body.weaknesses.forEach(function (weakness) {
        if (element.weaknesses.includes(weakness) && !weaknesses.includes(element)) {
          weaknesses.push(element)
        }
      })
    })
  }
  // assess height
  fulldataset.forEach(function (element) {
    const h = Number(element.height.substring(0, element.height.length - 2))
    if (h <= req.body.height && !heights.includes(element)) {
      heights.push(element)
    }
  })
  // assess weight
  fulldataset.forEach(function (element) {
    const w = Number(element.weight.substring(0, element.weight.length - 3))
    if (w <= req.body.weight && !weights.includes(element)) {
      weights.push(element)
    }
  })
  fulldataset.forEach(function (element) {
    if (types.includes(element) && weaknesses.includes(element) && heights.includes(element) && weights.includes(element)) {
      activesubset.push(element)
    }
  })
  res.send({ data: activesubset })
})

app.listen(port)
