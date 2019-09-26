(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterAll = exports.assemble = void 0;

var assemble = function assemble(pokemondata) {
  d3.select('body').selectAll('div.pokemon').data(d3.entries(pokemondata.data)).join('div').style('margin-right', '1vw').attr('class', 'pokemon').style('margin-bottom', '0.25vw').style('margin-top', '0.25vw').style('display', 'inline-block').append('img').attr('src', function (d) {
    return d.value.img;
  }).style('height', '10vw').style('width', '10vw').style('margin', 'auto').on('mouseover', function () {
    d3.select(event.currentTarget).style('background-color', '#3d3d3d');
  }).on('mouseout', function () {
    d3.select(event.currentTarget).style('background-color', 'transparent');
  }).style('border', '2px red solid').style('border-radius', '50%').on('click', function (d) {
    return fillModal(d);
  }).attr('data-toggle', 'modal').attr('data-target', '.pokemonentry');
};

exports.assemble = assemble;

var fillModal = function fillModal(param) {
  document.querySelector('.modal-title').innerHTML = param.value.name;
  document.querySelector('.pokemontype').innerHTML = param.value.type.join(', ');
  document.querySelector('.pokemonweaknesses').innerHTML = param.value.weaknesses.join(', ');
  document.querySelector('.pokemonweight').innerHTML = param.value.weight;
  document.querySelector('.pokemonheight').innerHTML = param.value.height;
  document.querySelector('.pokemonmodalimage').src = param.value.img;
};

var filterAll = function filterAll() {
  d3.selectAll('.pokemon').remove(); // way to get all that are checked

  var checkedTypes = document.querySelectorAll('#types input:checked');
  var checkedWeaknesses = document.querySelectorAll('#weaknesses input:checked');
  var typeArray = [];
  var weaknessArray = [];
  checkedTypes.forEach(function (element) {
    typeArray.push(element.value);
  });
  checkedWeaknesses.forEach(function (element) {
    weaknessArray.push(element.value);
  });
  var json = {
    types: typeArray,
    weaknesses: weaknessArray,
    height: document.querySelector('#height').value,
    weight: document.querySelector('#weight').value
  };
  var body = JSON.stringify(json);
  fetch('/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: body
  }).then(function (response) {
    return response.json();
  }).then(function (pokemondata) {
    assemble(pokemondata);
  });
};

exports.filterAll = filterAll;

},{}],2:[function(require,module,exports){
"use strict";

var _d3stuff = require("./d3stuff.js");

var _otherstuff = require("./otherstuff.js");

var songs = ['assets/1.mp3', 'assets/2.mp3', 'assets/3.mp3', 'assets/4.mp3', 'assets/5.mp3'];
var count = 0;

window.onload = function () {
  fetch('https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json').then(function (data) {
    return data.json();
  }).then(function (pokemondata) {
    var json = {
      data: pokemondata.pokemon
    };
    var body = JSON.stringify(json);
    fetch('/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body
    }).then(function (response) {
      return response.json();
    }).then(function (pokemondata) {
      (0, _d3stuff.assemble)(pokemondata);
    });
  });
};

window.filterAll = _d3stuff.filterAll;
window.toggleColorMode = _otherstuff.color;
window.helpMe = _otherstuff.help;

window.changeSong = function changeSong() {
  if (count < 4) {
    count++;
  } else {
    count = 0;
  }

  document.querySelector('audio').src = songs[count];
};

},{"./d3stuff.js":1,"./otherstuff.js":3}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.help = exports.color = void 0;

var help = function help() {
  var key = event.which;

  if (key === 47) {
    $('#helpme').modal('show');
  }
};

exports.help = help;

var color = function color() {
  if (document.body.style.backgroundColor === 'black') {
    document.body.style.backgroundColor = 'white';
    var elements = document.getElementsByClassName('change');

    for (var i = 0; i < elements.length; i++) {
      elements[i].style.backgroundColor = 'white';
      elements[i].style.color = 'black';
    }

    document.querySelector('#colormode').innerHTML = '<b>Dark Mode</b>';
    document.querySelector('h3').style.color = 'white';
    document.querySelector('#help').style.color = 'white';
    document.querySelector('#modaltext').style.color = 'black';
    document.querySelector('h1').style.color = 'white';
    elements = document.getElementsByClassName('otherchange');

    for (var _i = 0; _i < elements.length; _i++) {
      elements[_i].style.color = 'white';
    }

    elements = document.getElementsByClassName('modal-body');

    for (var _i2 = 0; _i2 < elements.length; _i2++) {
      elements[_i2].style.backgroundColor = 'white';
      elements[_i2].style.color = 'black';
    }

    elements = document.getElementsByClassName('modal-footer');

    for (var _i3 = 0; _i3 < elements.length; _i3++) {
      elements[_i3].style.backgroundColor = 'white';
    }

    elements = document.getElementsByClassName('modal-header');

    for (var _i4 = 0; _i4 < elements.length; _i4++) {
      elements[_i4].style.color = 'white';
    }
  } else {
    document.body.style.backgroundColor = 'black';

    var _elements = document.getElementsByClassName('change');

    for (var _i5 = 0; _i5 < _elements.length; _i5++) {
      _elements[_i5].style.backgroundColor = 'black';
      document.querySelector('#help').style.color = 'black';
      document.querySelector('#modaltext').style.color = 'white';
      _elements[_i5].style.color = 'white';
    }

    document.querySelector('#colormode').innerHTML = '<b>Light Mode</b>';
    document.querySelector('h3').style.color = 'black';
    document.querySelector('h1').style.color = 'black';
    _elements = document.getElementsByClassName('otherchange');

    for (var _i6 = 0; _i6 < _elements.length; _i6++) {
      _elements[_i6].style.color = 'black';
    }

    _elements = document.getElementsByClassName('modal-body');

    for (var _i7 = 0; _i7 < _elements.length; _i7++) {
      _elements[_i7].style.backgroundColor = 'black';
      _elements[_i7].style.color = 'white';
    }

    _elements = document.getElementsByClassName('modal-footer');

    for (var _i8 = 0; _i8 < _elements.length; _i8++) {
      _elements[_i8].style.backgroundColor = 'black';
    }

    _elements = document.getElementsByClassName('modal-header');

    for (var _i9 = 0; _i9 < _elements.length; _i9++) {
      _elements[_i9].style.color = 'black';
    }
  }
};

exports.color = color;

},{}]},{},[2]);
