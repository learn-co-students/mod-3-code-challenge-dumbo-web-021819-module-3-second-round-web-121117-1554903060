// Insert Code Here

//Getting all the beers
// Fetch all the beers from the server, make the html template, while fetching iterate over the object and add the beer name to the correct html area

// http://localhost:3000/beers
// <ul class="list-group">
//   <li class="list-group-item">Beer title 1</li>
//   <li class="list-group-item">Beer title 2</li>
//   /* etc... */
// </ul>

const beerBox = document.querySelector('.list-group')

const beerNameTemplate = beer => {
  return `<li data-id="${beer.id}" class="list-group-item">${beer.name}</li>`
}

fetch('http://localhost:3000/beers')
.then((response) => {
  return response.json()
}).then((object) => {
  object.forEach((beer) => {
    beerBox.innerHTML += beerNameTemplate(beer)
  })
})

//Display Single Beer Detail

//add event listener to each beer title that then:
//make a fetch to the beers id to get the specific information
//make html constant as to where that info should go
//as that fetch is made add html to the constant that displays the beer


const beerDetailBox = document.getElementById("beer-detail")

const beerInfoTemplate = beer => {
  return `<h1 data-id="${beer.id}">${beer.name}</h1>
          <img src="${beer.image_url}">
          <h3>${beer.tagline}</h3>
          <textarea>${beer.description}</textarea>
          <button id="edit-beer" class="btn btn-info">
            Save
          </button>`
}

beerBox.addEventListener('click', (event) => {
  if(event.target.className === "list-group-item"){
      beerId = event.target.dataset.id
      findBeerInfo(beerId)
  }
})

const findBeerInfo = beerId => {
  fetch(`http://localhost:3000/beers/${beerId}`)
  .then((response) => {
    return response.json()
  }).then((beerObj) => {
    beerDetailBox.innerHTML = beerInfoTemplate(beerObj)
  })
}

//Editing Beer

//event listener on beer info template that if it is on the button that goes to:
//make a fetch request to the specific beer id
//fetch should be a patch that takes in elements(refer to read me)
//update DOM with new description
//
// beerDetailBox.addEventListener('change', (event) => {
//   if(event.target.tagName === ""){
//     parent = event.target.parentElement
//     hTag = parent.querySelector('h1')
//     beerId = parseInt(hTag.dataset.id)
//
//     textTag = parent.querySelector('textarea')
//
//     textTag.addEventListener('change', (event) => {
//       newDescription = event.target.value
//       debugger
//     })
//
//
//     // editBeer(beerId, newDescription)
//   }
// })


let textTag = document.querySelector('textarea')

if(textTag !== null) {
  textTag.addEventListener('change', (event) => {
    newDescription = event.target.value
    // debugger
    beerDetailBox.addEventListener('click', (event) => {
      if(event.target.tagName === "BUTTON"){
        parent = event.target.parentElement
        hTag = parent.querySelector('h1')
        beerId = parseInt(hTag.dataset.id)
        editBeer(beerId, newDescription)
        textTag.innerHTML = newDescription

      }
    })
  })
}



const editBeer = (beerId, newDescription) => {
  return fetch(`http://localhost:3000/beers/${beerId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      description: newDescription
    })
  })
}
