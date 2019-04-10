const beerListUlTag = document.querySelector('ul.list-group');
const singleBeerDivTag = document.querySelector('div#beer-detail');

const beerTemplate = (beerObj) => {
  return `<h1 data-id="${beerObj.id}">${beerObj.name}</h1>
<img src="${beerObj.image_url}">
<h3>${beerObj.tagline}</h3>
<textarea>${beerObj.description}</textarea>
<button id="edit-beer" class="btn btn-info">
  Save
</button>`
}

document.addEventListener('DOMContentLoaded', event => {
  fetch('http://localhost:3000/beers')
    .then(response => {
      return response.json();
    })
    .then(parsedJsonArr => {
      parsedJsonArr.forEach(beerobj => {
        beerListUlTag.innerHTML += ` <li class="list-group-item" data-id="${beerobj.id}">${beerobj.name}</li>`
      })
    })
})

beerListUlTag.addEventListener('click', event => {
  if (event.target.tagName === 'LI') {
    let currentId = event.target.dataset.id

    grabBeerDetails(currentId)
      .then(returnedBeerObj => {
      singleBeerDivTag.innerHTML = beerTemplate(returnedBeerObj);
    })
  }
})

function grabBeerDetails(id) {
  return fetch(`http://localhost:3000/beers/${id}`)
    .then(response => {
      return response.json();
    })
}

singleBeerDivTag.addEventListener('click', event => {
  if (event.target.tagName === 'BUTTON') {
    let targetID = event.target.parentElement.querySelector('h1').dataset.id;
    let newText = event.target.parentElement.querySelector('textarea').value;

    let desiredTextObj = {
      "id": targetID,
      "description": newText
    }

    updateBeerDescription(desiredTextObj)
      .then(updatedTextObj => {
        event.target.parentElement.querySelector('textarea').innerHTML = updatedTextObj.description;
      })
  }
})

function updateBeerDescription(newDescriptionObj) {
  return fetch(`http://localhost:3000/beers/${newDescriptionObj.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(newDescriptionObj)
  })
    .then(response => {
      return response.json();
    })
}
