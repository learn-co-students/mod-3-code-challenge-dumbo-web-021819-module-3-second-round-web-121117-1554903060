

const ulTag = document.querySelector('#list-group');
const divTag = document.querySelector('#beer-detail');
const createBeerLi = (beer) => {
   return `<li class="list-group-item" data-id="${beer.id}">${beer.name}</li>`
}
const createBeerDiv = (beer) => {
   return `
      <h1 data-id="${beer.id}">${beer.name}</h1>
      <img src="${beer.image_url}">
      <h3>${beer.tagline}</h3>
      <textarea name="description">${beer.description}</textarea>
      <br/>
      <button id="edit-beer" class="btn btn-info">
      Save
      </button>`
}

ulTag.addEventListener('click', (event) => {
  if (event.target.className === 'list-group-item') {
      return fetch(`http://localhost:3000/beers/${event.target.dataset.id}`)
         .then(response => response.json())
         .then(beer => {
            divTag.innerHTML += createBeerDiv(beer)
         })
   }
})

const updateBeerInfo = (id, description) => {
   fetch(`http://localhost:3000/beers/${id}`, {
      method: 'PATCH',
      headers: {
         'Content-Type': 'application/json',
         'Accept': 'application/json'
      },
      body: JSON.stringify({
         description: description
      })
   })
      .then(response => response.json())
      .then(beerObj => {
         beerObj.innerHTML += description
         // debugger
         // console.log('hi')
      })
}

divTag.addEventListener('click', (event) => {
   event.preventDefault();
   if (event.target.className === 'btn btn-info') {
      // console.log(event.target.parentElement)
      const updatedBeerDescription = event.target.parentElement.children.description.value;
      const beerId = parseInt(event.target.parentElement.children[0].dataset.id);
      updateBeerInfo(beerId, updatedBeerDescription)
   }
})
fetch('http://localhost:3000/beers')
   .then(response => response.json())
   .then(allBeers => {
      allBeers.forEach(beer => {
         ulTag.innerHTML += createBeerLi(beer)
      })
   })
