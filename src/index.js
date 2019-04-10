const beerList = document.querySelector('#beer-list')
const beerDisplay = document.querySelector('#beer-display')

function createBeerLi(beer) {
  return beerList.innerHTML += `<li class="list-group-item" data-beer-id="${beer.id}">${beer.name}</li>`;
}

function createBeerDisplay(beer) {
  return beerDisplay.innerHTML += `<div data-beer-id=${beer.id} style="display:none">
                              <h1>${beer.name}</h1>
                              <img src=${beer.image_url}/>
                              <h3>${beer.tagline}</h3>
                              <br>
                              <h4>First Brewed:  ${beer.first_brewed}</h4>
                              <h4>Best Paired With:</h4>
                              <ul class="food-pair">
                              </ul>
                              <h4>Expert Tip:  ${beer.brewers_tips}</h4>
                              <br>
                              <textarea class="beer-description" value="">${beer.description}</textarea>
                              <button class="btn btn-info">Save</button>
                            </div>
                            `;
}

function updateBeer(beer) {
  return fetch(`http://localhost:3000/beers/${beer.id}`,{
           method: "PATCH",
           headers: {
             'Content-Type': 'application/json',
             'Accept': 'application/json'
           },
           body: JSON.stringify({
             description: beer.description
           })
         })
           .then( (res) => {
             return res.json();
           })
}

function updateBeerPageDescription(beer) {
  e.target.previousElementSibling.innerText = beer.description
}

fetch('http://localhost:3000/beers')
  .then((res) => {
    return res.json();
  })
  .then((beers) => {
    beers.forEach((beer) => {

      createBeerLi(beer)
      // style="display:none"
      createBeerDisplay(beer)
      beer.food_pairing.forEach( (food_pair) => {
        let beerPairList = document.querySelector(`div[data-beer-id="${beer.id}"] ul[class="food-pair"]`);
        beerPairList.innerHTML += `<li>${food_pair}</li>`
      })
    })
  })

beerList.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    let selectedBeer = document.querySelector(`div[data-beer-id="${event.target.dataset.beerId}"]`);
    let allBeerDisplays = Array.from(beerDisplay.children);
    allBeerDisplays.forEach((beerDisplay) =>
      beerDisplay.style.display = "none"
    )
    selectedBeer.style.display = "block"
  }
})

beerDisplay.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn')){
    const newText = e.target.previousElementSibling.value;
    const beerId = e.target.parentElement.dataset.beerId;
    const beer = {
      description: newText,
      id: beerId
    }
    updateBeer(beer).then( (beer) => {
      updateBeerPageDescription(beer)
    })
  }
})
