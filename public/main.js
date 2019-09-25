window.onload = function() {
  fetch( "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json" )
    .then( data => data.json() )
    .then( pokemondata => {
          let json = {data: pokemondata.pokemon}
          let body = JSON.stringify(json);
          fetch('/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body
          })
          .then(response => response.json())
          .then(pokemondata => {
            d3.select( 'body' ).selectAll( 'div.pokemon' )
        .data( d3.entries(pokemondata.data))
        .join( 'div' )
          .style('margin-right', '1vw')
          .attr('class', 'pokemon')
          .style('margin-bottom', '0.25vw')
          .style('margin-top', '0.25vw')
          .style('display', 'inline-block')
          .append("img")
          .attr('src', d => d.value.img)
          .style('height', '10vw')
          .style('width', '10vw')
          .style('margin', 'auto')
          .on('mouseover', function(){d3.select(event.currentTarget).style('background-color', '#3d3d3d')})
          .on('mouseout', function(){d3.select(event.currentTarget).style('background-color', 'transparent')})
          .style('border', '2px red solid')
          .style('border-radius', '50%')
          .on('click', d => fillModal(d))
          .attr('data-toggle', 'modal')
          .attr('data-target', '.pokemonentry')
          })
    })
}

function fillModal(param){
  document.querySelector('.modal-title').innerHTML = param.value.name
  document.querySelector('.pokemontype').innerHTML = param.value.type.join(', ')
  document.querySelector('.pokemonweaknesses').innerHTML = param.value.weaknesses.join(', ')
  document.querySelector('.pokemonweight').innerHTML = param.value.weight
  document.querySelector('.pokemonheight').innerHTML = param.value.height
  document.querySelector('.pokemonmodalimage').src = param.value.img
}

function filterAll(){
  d3.selectAll('.pokemon').remove()
  //way to get all that are checked
  let checkedTypes = document.querySelectorAll("#types input:checked")
  let checkedWeaknesses = document.querySelectorAll("#weaknesses input:checked")
  let typeArray = [];
  let weaknessArray = [];
  checkedTypes.forEach(function(element){
    typeArray.push(element.value)
  })
  checkedWeaknesses.forEach(function(element){
    weaknessArray.push(element.value)
  })
  let json = {types: typeArray, weaknesses: weaknessArray, height: document.querySelector('#height').value, weight: document.querySelector('#weight').value}
  let body = JSON.stringify(json);
  fetch('/update', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body
  })
  .then(response => response.json())
  .then(pokemondata => {
    d3.selectAll( 'div.pokemon' )
.data( d3.entries(pokemondata.data))
.join( 'div' )
  .style('margin-right', '1vw')
  .attr('class', 'pokemon')
  .style('margin-bottom', '0.25vw')
  .style('margin-top', '0.25vw')
  .style('display', 'inline-block')
  .append("img")
  .attr('src', d => d.value.img)
  .style('height', '10vw')
  .style('width', '10vw')
  .style('margin', 'auto')
  .on('mouseover', function(){d3.select(event.currentTarget).style('background-color', '#3d3d3d')})
  .on('mouseout', function(){d3.select(event.currentTarget).style('background-color', 'transparent')})
  .style('border', '2px red solid')
  .style('border-radius', '50%')
  .on('click', d => fillModal(d))
  .attr('data-toggle', 'modal')
  .attr('data-target', '.pokemonentry')
  })
}



function toggleColorMode(){
  if(document.body.style.backgroundColor === 'black'){
    document.body.style.backgroundColor = 'white'
    let elements = document.getElementsByClassName('change')
    for (let i = 0; i < elements.length; i++ ) {
      elements[i].style.backgroundColor = 'white'
      elements[i].style.color = 'black'
    }
    document.querySelector('#colormode').innerHTML = '<b>Dark Mode</b>'
    document.querySelector('h3').style.color = 'white'
    document.querySelector('h1').style.color = 'white'
    elements = document.getElementsByClassName('otherchange')
    for (let i = 0; i < elements.length; i++ ) {
      elements[i].style.color = 'white'
    }
    elements = document.getElementsByClassName('modal-body')
    for (let i = 0; i < elements.length; i++ ) {
      elements[i].style.backgroundColor = 'white'
      elements[i].style.color = 'black'
    }
    elements = document.getElementsByClassName('modal-footer')
    for (let i = 0; i < elements.length; i++ ) {
      elements[i].style.backgroundColor = 'white'
    }
    elements = document.getElementsByClassName('modal-header')
    for (let i = 0; i < elements.length; i++ ) {
      elements[i].style.color = 'white'
    }
  } else{
    document.body.style.backgroundColor = 'black'
    let elements = document.getElementsByClassName('change')
    for (let i = 0; i < elements.length; i++ ) {
      elements[i].style.backgroundColor = 'black'
      elements[i].style.color = 'white'
    }
    document.querySelector('#colormode').innerHTML = '<b>Light Mode</b>'
    document.querySelector('h3').style.color = 'black'
    document.querySelector('h1').style.color = 'black'
    elements = document.getElementsByClassName('otherchange')
    for (let i = 0; i < elements.length; i++ ) {
      elements[i].style.color = 'black'
    }
    elements = document.getElementsByClassName('modal-body')
    for (let i = 0; i < elements.length; i++ ) {
      elements[i].style.backgroundColor = 'black'
      elements[i].style.color = 'white'
    }
    elements = document.getElementsByClassName('modal-footer')
    for (let i = 0; i < elements.length; i++ ) {
      elements[i].style.backgroundColor = 'black'
    }
    elements = document.getElementsByClassName('modal-header')
    for (let i = 0; i < elements.length; i++ ) {
      elements[i].style.color = 'black'
    }
  }
}
