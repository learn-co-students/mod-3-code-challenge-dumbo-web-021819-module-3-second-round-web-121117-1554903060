
const beerListUl = document.querySelector("#list-group");
const beerDetailDiv = document.querySelector("#beer-detail");

//beer detail div create
const createBeerInfo = (beer) => {
  return `<h1>${beer.name}</h1>
          <img src="${beer.image_url}">
          <h3>${beer.tagline}</h3>
          <textarea>${beer.description}</textarea>
          <button id="edit-beer" class="btn btn-info" data-id="${beer.id}">
          Save
          </button>`
};

//Populating sidebar with beer names
fetch("http://localhost:3000/beers")
  .then((response) => {
    return response.json();
  }).then((beers) => {
    beers.forEach((beer) => {
      beerListUl.innerHTML += `<li class="list-group-item" data-id="${beer.id}">${beer.name}</li>`
    })
  });

//Show details of specific beer on click
beerListUl.addEventListener('click', (event) => {
  if (event.target.className = 'LI') {
    //clear active selection in sidebar
    let ulChildren = event.currentTarget.children;
    for (let child of ulChildren) {
      child.className = "list-group-item"
    }
    //set current clicked item to active
    event.target.className = "list-group-item active"
    //clear details to reload updated info
    beerDetailDiv.innerHTML = "";
    //patch request
    fetch(`http://localhost:3000/beers/${event.target.dataset.id}`)
      .then((response) => {
        return response.json()
      }).then((beer) => {
        beerDetailDiv.innerHTML += createBeerInfo(beer)
      }).then(() => {
        //Edit function once beer detail is posted to DOM
        document.querySelector("#edit-beer").addEventListener('click', (event) => {
          let desc = event.target.previousElementSibling.value
          fetch(`http://localhost:3000/beers/${event.target.dataset.id}`, {
            method: 'PATCH',
            headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                      },
            body: JSON.stringify({
               "description": desc
            })
          }).then((response) => {
            return response.json()
          }).then((beer) => {
            //update DOM to display current info in beer detail in real time
            beerDetailDiv.innerHTML = "";
            beerDetailDiv.innerHTML += createBeerInfo(beer)
          })
        })
      })
  }
});
