

const listGroup = document.querySelector('.list-group')

const createlistGroupItemHTML = (beer) => {
  return `<font color="blue"><li id="${beer.id}" class="list-group-item">${beer.name}</li></font>`
}


fetch('http://localhost:3000/beers')
.then(response => response.json())
.then(beers => beers.forEach(beer => {
  // debugger
  listGroup.innerHTML += createlistGroupItemHTML(beer)
  // debugger
}))


/////////////////////////////////////////////////////////////////////////////////////////////////////


const beerDetailDiv = document.querySelector('#beer-detail')

const createBeerDetail = (beerDetails) => {
  return `
          <font color="white"><h1>${beerDetails.name}</h1></font>
          <img src="${beerDetails.image_url}">
          <font color="white"><h3>${beerDetails.tagline}</h3></font>
          <textarea id="${beerDetails.id}">${beerDetails.description}</textarea>
          <button type="submit" id="edit-beer" class="btn btn-info">
            Save
          </button>`
}

listGroup.addEventListener('click', (event) => {
  // debugger
  fetch(`http://localhost:3000/beers/${event.target.id}`)
  .then(response => response.json())
  .then(beerDetails => {

    beerDetailDiv.innerHTML = createBeerDetail(beerDetails)
    // debugger
})
})

const saveButton = document.querySelector('#beer-detail')

// fetch(`http://localhost:3000/beers/${event.target.id}`)
// .then(response => console.log(response.json()))

const updateBeerDescription = (id, beerText) => {
  // debugger
  fetch(`http://localhost:3000/beers/${id}`,{
    method:'PATCH',
    headers:   {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
    },
    body: JSON.stringify({description: `${beerText}`})
  }).then(response => response.json())
}

saveButton.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON'){
    let originalText = event.target.parentElement.querySelector('textarea').innerHTML
    let theId = event.target.parentElement.querySelector('textarea').id
    // debugger
    originalText = event.target.parentElement.querySelector('textarea').value
    updateBeerDescription(theId,originalText)
  }

})
