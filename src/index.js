const ulTag = document.querySelector('ul.list-group');
const beerDivTag = document.querySelector('div#beer-detail')
const beerLiTemplate = (beerObj)=>{
  return `<li data-id="${beerObj.id}" class="list-group-item">${beerObj.name}</li>`
}
const beerDetailsTemplate = (beerObj)=>{
  return `<h1>${beerObj.name}</h1>
  <img src="${beerObj.image_url}">
  <h3>${beerObj.tagline}</h3>
  <textarea>${beerObj.description}</textarea>
  <button data-id="${beerObj.id}" id="edit-beer" class="btn btn-info">
    Save
  </button>`
}

function beerFetchAll() {
  fetch('http://localhost:3000/beers')
  .then(response=>{return response.json();})
  .then(beerArr=>{
    beerArr.forEach(beer=>{
      ulTag.innerHTML += beerLiTemplate(beer);
    })
  })
}

function singleBeerFetch(beerId) {
  fetch(`http://localhost:3000/beers/${beerId}`)
  .then(response=>{return response.json();})
  .then(beer=>{
    beerDivTag.innerHTML += beerDetailsTemplate(beer)
  })
}

function updateBeerDescription(beerObj) {
  return fetch(`http://localhost:3000/beers/${beerObj.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(beerObj)
  })
  .then(response=>response.json())
}

document.addEventListener('DOMContentLoaded', ()=>{
  beerFetchAll()
})

ulTag.addEventListener('click', (event)=>{
  beerDivTag.innerHTML = "";
  let beerId = event.target.dataset.id;
  singleBeerFetch(beerId);
  beerDivTag.addEventListener('click', (event)=>{
    let beerSaveBtn = document.querySelector('button#edit-beer');
    if (event.target === beerSaveBtn) {
      // console.log('You clicked save')
      let newBeerDescription = event.target.previousElementSibling.value;
      let beerId = parseInt(event.target.dataset.id);
      const beerObj = {
        "id": beerId,
        "description": newBeerDescription
      };
      // debugger
      updateBeerDescription(beerObj);
      // alert('Saved!!')
    }
  })
})
