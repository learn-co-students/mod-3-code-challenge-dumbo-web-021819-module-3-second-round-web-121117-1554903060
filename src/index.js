window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');


const ulTagBeerList = document.getElementById('list-group')

const beerDetailDiv = document.getElementById('beer-detail')

////STEP 1
//////fetch the array of beer objects from the API
//////iterate through the array
/////add a new list item with each iteration


///////PUT THESE INTO FUNCTIONS

//////FETCH (SERVER)
fetch('http://localhost:3000/beers')
  .then(function(response) {
    return response.json();
  })
  .then(function(beers) {
    beers.forEach(function(beerObj) {
      beerListItem(beerObj);
    })
  })

//////////DOM MANIPULATION
  const beerListItem = (beerObj) => {
    ulTagBeerList.innerHTML +=
    `<li class="list-group-item" data-id=${beerObj.id}>${beerObj.name}</li>`
  }


/////////STEP 2/////////////

//////add an event listener as a click on the beer name
/////reveal attributes about that beer upon click (replace the content of the div with the new content)
//use beerObj attributes to fill in the details
//use dataset id to find each attribute?

const beerDetail = (beerObj) => {
  beerDetailDiv.innerHTML =
  `<h1>Beer Name</h1>
  <img src="<add beer img url here>">
  <h3>Beer Tagline</h3>
  <textarea>Beer Description</textarea>
  <button id="edit-beer" class="btn btn-info">
  Save
  </button>`
}



ulTagBeerList.addEventListener('click', function(event) {
  if (event.target.tagName === 'LI') {
    // console.log(event.target.dataset.id)
    fetch('http://localhost:3000/beers/${event.target.dataset.id}')
    // .then return the response of that particular beer, get the attributes to call beerDetail(response)

  }

});















  // .then(function(beers) {
  //   return JSON.stringify(beers);
  // })










































});
