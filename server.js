let express = require('express'),
app = express(),
serveStatic = require('serve-static'),
bodyParser = require('body-parser'),
helmet = require('helmet'),
compression = require('compression'),
port = process.env.PORT || 3000,
path = require('path')
app.use(helmet())
app.use(compression())
app.use(bodyParser.json())
let fulldataset = [],
activesubset = []

app.use(serveStatic('public', { 'index': false}));

app.get('/', function(req, res) {
    res.sendFile(path.normalize(__dirname + '/public/index.html'))
});
app.post('/', function(req, res) {
    fulldataset = req.body.data
    activesubset = fulldataset
    res.send({data: activesubset})
})

app.post('/update', function(req, res) {
  activesubset = [];
  let weaknesses = [],
  types = []
  if(req.body.types.length === 0){
    types = fulldataset
  } else{
    fulldataset.forEach(function(element){
      req.body.types.forEach(function(type){
        if(element.type.includes(type) && !types.includes(element)){
          types.push(element)
        }
      })
    })
  }
  if(req.body.weaknesses.length === 0){
    weaknesses = fulldataset
  } else{
    fulldataset.forEach(function(element){
      req.body.weaknesses.forEach(function(weakness){
        if(element.weaknesses.includes(weakness) && !weaknesses.includes(element)){
          weaknesses.push(element)
        }
      })
    })
  }
  fulldataset.forEach(function(element){
    if(types.includes(element) && weaknesses.includes(element)){
      activesubset.push(element)
    }
  })
  res.send({data: activesubset})
})

app.listen(port);
