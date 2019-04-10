const beerUrl = 'http://localhost:3000/beers'
let beerUlTag = document.querySelector('#list-group')
let beerDetailDivTag = document.querySelector('#beer-detail')

function getAllTheBeers() {
  fetch(beerUrl)
  .then(response => response.json())
  .then(beers => {
    beers.forEach(beer => {
      beerUlTag.innerHTML += createBeerLiTag(beer)
    })
  })
}

function createBeerLiTag(beer) {
  return `<li class="list-group-item" data-id=${beer.id}>${beer.name}</li>`
}

beerUlTag.addEventListener('click', (event) => {
  if (event.target.className === 'list-group-item') {
    beerFetcher(event.target.dataset.id)
    .then(() => {
      let saveButton = document.querySelector('#edit-beer')
      saveButton.addEventListener('click', (event) => {
        let beerDescription = event.target.previousElementSibling.value
        let beerId = event.target.parentElement.querySelector('h1').dataset.beerId
        beerEditor(beerId, beerDescription)
      })
    })
  } //if statement
  
}) // beerUlTag listener

function beerEditor(beerId, beerDescription) {
  return fetch(`http://localhost:3000/beers/${beerId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      description: beerDescription
    }) // body
  }) // fetch
}


function beerFetcher(beerId) {
  return fetch(`http://localhost:3000/beers/${beerId}`)
  .then(response => response.json())
  .then(beer => {
    beerDetailDivTag.innerHTML = generateBeerDetails(beer)
  })
}


function generateBeerDetails(beer) {
  return `<h1 data-beer-id=${beer.id}>${beer.name}</h1>
  <img src=${beer.image_url}>
  <h3>${beer.tagline}</h3>
  <textarea>${beer.description}</textarea>
  <button id="edit-beer" class="btn btn-info">
    Save
  </button>`
}

getAllTheBeers()