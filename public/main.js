window.onload = function() {
  fetch( "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json" )
    .then( data => data.json() )
    .then( pokemondata => {
      d3.select( 'body' ).selectAll( 'div' )
        .data( d3.entries( pokemondata.pokemon ) )
        .join( 'div' )
          d3.select( 'body' ).selectAll( 'div' )
          .style('margin-right', '0.5vw')
          .style('display', 'inline-block')
          .append("img")
          //.attr('src', d => d.value.img)
          .style('height', '10vw')
          .style('width', '10vw')
          .style('margin', 'auto')
          .style('border', '2px white solid')
          .style('border-radius', '50%')
    })
}