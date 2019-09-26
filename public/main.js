import { assemble, filterAll } from './d3stuff.js'
import { color, help } from './otherstuff.js'
const songs = ['assets/1.mp3', 'assets/2.mp3', 'assets/3.mp3', 'assets/4.mp3', 'assets/5.mp3']
let count = 0
window.onload = function () {
  fetch('https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json')
    .then(data => data.json())
    .then(pokemondata => {
      const json = { data: pokemondata.pokemon }
      const body = JSON.stringify(json)
    fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body
      })
        .then(response => response.json())
        .then(pokemondata => {
          assemble(pokemondata)
        })
    })
}

window.filterAll = filterAll
window.toggleColorMode = color
window.helpMe = help
window.changeSong = function changeSong () {
  if (count < 4) {
    count++
  } else {
    count = 0
  }
  document.querySelector('audio').src = songs[count]
}
