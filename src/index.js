// URLs
const beersUrl = 'http://localhost:3000/beers';

// Tags
// <ul class="list-group" id="list-group">
const ulTag = document.querySelector('ul#list-group');
// <div id="beer-detail">
const divBeerDetail = document.querySelector('div#beer-detail');

const editFormTag = document.querySelector('form');

// Helper Functions

const createListItem = beer => {
  return `<li class="list-group-item" data-beer-id="${beer.id}">${beer.name}</li>`;
};

const createDetailCard = beer => {
  return `<h1>${beer.name}</h1>
          <img src=${beer.image_url}>
          <h3>${beer.tagline}</h3>
          <form data-beer-id="${beer.id}">
            <textarea>${beer.description}</textarea>
            <button type="submit" id="edit-beer" class="btn btn-info">
              Save
            </button>
          </form>`;
};


const updateDetailCard = (id, newDescription) => {
  return fetch(`${beersUrl}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type' : 'application/json',
      'Accept' : 'application/json'
    },
    body: JSON.stringify({"description": newDescription})
  }).then(response => {
    return response.json();
  })
};


document.addEventListener('DOMContentLoaded', event => {

  // Step 1 - Display All Beer Names

  fetch(beersUrl).then(response => {
    return response.json();
  }).then(arrayOfBeers => {
    arrayOfBeers.forEach(beer => {
      ulTag.innerHTML += createListItem(beer);
    })
  })

  // Step 2 - Display Single Beer Details

  ulTag.addEventListener('click', event => {
    if (event.target.tagName === "LI") {
      let currentListItem = event.target;
      let id = currentListItem.dataset.beerId;
      fetch(`${beersUrl}/${id}`).then(response => {
        return response.json();
      }).then(beer => {
        divBeerDetail.innerHTML = createDetailCard(beer);
      })
    }
  })

  /*

  <h1>${beer.name}</h1>
  <img src=${beer.image_url}>
  <h3>${beer.tagline}</h3>
  <form data-beer-id="${beer.id}">
    <textarea>${beer.description}</textarea>
    <button type="submit" id="edit-beer" class="btn btn-info">
      Save
    </button>
  </form>


  */

  // Step 3 - Edit Beer Details

  divBeerDetail.addEventListener('submit', event => {
    event.preventDefault();
    let currentSaveButton = event.target;
    let id = currentSaveButton.parentElement.dataset.beerId;
    let textAreaTag = currentSaveButton.parentElement.querySelector('textarea');
    let newDescription = textAreaTag.value;
    updateDetailCard(id, newDescription).then(updatedBeer => {
      textAreaTag.innerText = `${updatedBeer.description}`;
    })

  })


})
