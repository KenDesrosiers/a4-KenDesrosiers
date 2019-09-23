let express = require('express'),
app = express(),
serveStatic = require('serve-static'),
helmet = require('helmet'),
compression = require('compression'),
port = process.env.PORT || 3000,
path = require('path')
app.use(helmet())
app.use(compression())

app.use(serveStatic('public', { 'index': false}));

app.get('/', function(req, res) {
    res.sendFile(path.normalize(__dirname + '/public/index.html'))
});

app.listen(port);
