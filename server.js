
//https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json
let express = require('express'),
app = express(),
serveStatic = require('serve-static'),
helmet = require('helmet'),
compression = require('compression'),
port = process.env.PORT || 3000
app.use(helmet)
app.use(compression)
app.use(serveStatic('public', { 'index': false}))

app.listen(port)
