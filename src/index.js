//finding the Ul tag
const listUlTag = document.querySelector('ul')

//Making lis for beers
const beerLiTag = (beer) => {
  return `<li class="list-group-item" data-id="${beer.id}">${beer.name}</li>`
}

//fetching all the beers
fetch('http://localhost:3000/beers')
  .then((response) => {
    return response.json()
  }).then((beerList) => {
      beerList.forEach((beer) =>{
        listUlTag.innerHTML += beerLiTag(beer)
      })
  })

//creating the beer HTML card
const createBeerCardHtml = (beerCard) => {
  return `<h1>${beerCard.name}</h1>
<img src="${beerCard.image_url}">
<h3>${beerCard.tagline}</h3>
<textarea data-id="${beerCard.id}">${beerCard.description}</textarea>
<button id="edit-beer" class="btn btn-info">
  Save
</button>`
}

//finding beer detail tag
const beerDivTag = document.querySelector('div#beer-detail')

//create GET fetch for particular beer
const readBeerCard = (id) => {
  return fetch(`http://localhost:3000/beers/${id}`)
    .then((response) => {
      return response.json()
    })
}
//adding event, "click", to a particular
listUlTag.addEventListener('click', (event) => {
  let beerId = event.target.dataset.id
   readBeerCard(beerId).then((beer) => {
     beerDivTag.innerHTML = createBeerCardHtml(beer)
  })
})

//fetch, PATCH request
const patchRequest = (beer) => {
  return fetch(`http://localhost:3000/beers/${beer.id}`,{
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({description: beer.description})
  }).then((response) => {
    return response.json()
  })
}

//Editting beer description
beerDivTag.addEventListener('click', (event) => {
  //finding the save button
  let saveBtn = document.querySelector('#beer-detail').querySelector('#edit-beer')
  let currentBeer = document.querySelector('div#beer-detail')
  let beerText = document.querySelector('div#beer-detail').querySelector('textarea').innerHTML
  //save the description upon clicking save
  if (event.target === saveBtn) {
    //kept getting a 404 error :(
    patchRequest(currentBeer)

  }

})
