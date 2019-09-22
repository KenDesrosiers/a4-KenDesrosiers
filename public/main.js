function initialLoad(){
  fetch( "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json" )
    .then( data => data.json())
    .then( pokemondata => {})
}
