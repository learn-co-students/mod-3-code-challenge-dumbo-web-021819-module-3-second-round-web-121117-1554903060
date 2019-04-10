// Today, you will be building a Beer App 🍺🍺🍺
// Note => There is no 2 in the db!
// -- As a user, when the page loads, I should see a list of beer names retrieved
// from an API on the left hand side of the screen.

 // -- As a user, when I click a beer name,
 // the application should reveal more information about that particular beer.
 //
 // -- As a user, when looking at the details of a beer, I can edit the
 // current description of a beer. Clicking the 'Save'
 // button will save any changes added to the description in the database


document.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:3000/beers')
  .then( response => response.json())
  .then( beers => beers.forEach(
    beer => {
      createBeerList(beer)
    }
  ))
  let beerList = document.querySelector('.list-group');
  beerList.addEventListener('click', event => {
    if(event.target.className === 'list-group-item') {
      let beerId = event.target.dataset.id;
      fetch(`http://localhost:3000/beers/${beerId}`)
      .then(response => response.json())
      .then(beer => createBeerDetail(beer))
    }
  })
  let beerDetail = document.querySelector('#beer-detail');
  beerDetail.addEventListener('click', event => {
    if(event.target.id === 'edit-beer') {

      let beerId = event.target.dataset.beerId;
      let parent = event.target.parentElement;
      let query = parent.querySelector('#myTextArea');
      let newText = query.innerHTML;
      // let newDesc = {
      //   description: newText
      // }
      // console.log(newText);

      fetch(`http://localhost:3000/beers/${beerId}`, {

        method: 'PATCH',
        headers: {

     'Content-Type' : "application/json",
     'Accept': "application/json"

     },
      body: JSON.stringify({
            //
            description: newText

      })
     }).then( response => response.json())
     .then( json => console.log(json))

    }
  })
})


function createBeerList (beer) {
  let beerList = document.querySelector('.list-group');
  beerList.innerHTML += `<ul class="list-group">
  <li class="list-group-item" data-id=${beer.id}>${beer.name}</li>
</ul>`
}

function createBeerDetail (beer) {
  let b = document.querySelector('#beer-detail');
  b.innerHTML = `<h1>${beer.name}</h1>
  <img src=${beer.image_url}>
  <h3>${beer.tagline}</h3>
  <textarea id="myTextArea">${beer.description}</textarea>
  <button id="edit-beer" class="btn btn-info" data-beer-id=${beer.id}>
  Save
  </button>`
}
