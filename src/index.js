const beerList = document.querySelector('#beer-list')
const beerDisplay = document.querySelector('#beer-display')


fetch('http://localhost:3000/beers')
  .then((res) => {
    return res.json();
  })
  .then((beers) => {
    beers.forEach((beer) => {
      beerList.innerHTML += `<li class="list-group-item" data-beer-id="${beer.id}">${beer.name}</li>`
      // style="display:none"
      beerDisplay.innerHTML += `<div data-beer-id=${beer.id} style="display:none">
                                  <h1>${beer.name}</h1>
                                  <img src=${beer.image_url}/>
                                  <h3>${beer.tagline}</h3>
                                  <textarea class="beer-description" value="">${beer.description}</textarea>
                                  <button class="btn btn-info">Save</button>
                                </div>
                                `
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
      fetch(`http://localhost:3000/beers/${beerId}`,{
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          description: newText
        })
      })
        .then( (res) => {
          return res.json();
        })
        .then( (beer) => {
          e.target.previousElementSibling.innerText = beer.description
        })
    }
  })
