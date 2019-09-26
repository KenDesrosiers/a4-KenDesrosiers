const help = function () {
  const key = event.which
  if (key === 47) {
    $('#helpme').modal('show')
  }
}

const color = function () {
  if (document.body.style.backgroundColor === 'black') {
    document.body.style.backgroundColor = 'white'
    let elements = document.getElementsByClassName('change')
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.backgroundColor = 'white'
      elements[i].style.color = 'black'
    }
    document.querySelector('#colormode').innerHTML = '<b>Dark Mode</b>'
    document.querySelector('h3').style.color = 'white'
    document.querySelector('#help').style.color = 'white'
    document.querySelector('#modaltext').style.color = 'black'
    document.querySelector('h1').style.color = 'white'
    elements = document.getElementsByClassName('otherchange')
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.color = 'white'
    }
    elements = document.getElementsByClassName('modal-body')
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.backgroundColor = 'white'
      elements[i].style.color = 'black'
    }
    elements = document.getElementsByClassName('modal-footer')
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.backgroundColor = 'white'
    }
    elements = document.getElementsByClassName('modal-header')
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.color = 'white'
    }
  } else {
    document.body.style.backgroundColor = 'black'
    let elements = document.getElementsByClassName('change')
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.backgroundColor = 'black'
      document.querySelector('#help').style.color = 'black'
      document.querySelector('#modaltext').style.color = 'white'
      elements[i].style.color = 'white'
    }
    document.querySelector('#colormode').innerHTML = '<b>Light Mode</b>'
    document.querySelector('h3').style.color = 'black'
    document.querySelector('h1').style.color = 'black'
    elements = document.getElementsByClassName('otherchange')
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.color = 'black'
    }
    elements = document.getElementsByClassName('modal-body')
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.backgroundColor = 'black'
      elements[i].style.color = 'white'
    }
    elements = document.getElementsByClassName('modal-footer')
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.backgroundColor = 'black'
    }
    elements = document.getElementsByClassName('modal-header')
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.color = 'black'
    }
  }
}

export { color, help }
