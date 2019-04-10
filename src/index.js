const ulTag = document.getElementById('list-group');
//list beer temp
const beerTemplate = (beer) => {
  return `
    <li class="list-group-item" id=${beer.id}>${beer.name}</li>
  `
}
//fetch all beers
fetch(`http://localhost:3000/beers`)
.then((response) => {
  return response.json();
}).then((beers) => {
  beers.forEach((beer) => {
    ulTag.innerHTML += beerTemplate(beer);
  })
});
//beer det temp
const beerDetailsTemplat = (beer) => {
  return `
    <h1>${beer.name}</h1>
    <img src="${beer.image_url}">
    <h3>${beer.tagline}</h3>
    <textarea>${beer.description}</textarea>
    <button id=${beer.id} class="btn btn-info">
      Save
    </button>
  `
}
// beer details html
const beerShow = document.getElementById('beer-detail')
//click beer
ulTag.addEventListener('click', (event) => {
  if (event.target.className === "list-group-item") {
    const beerId = parseInt(event.target.id);
    const divTag = event.target.parentElement;
    fetch(`http://localhost:3000/beers/${beerId}`)
    .then((response) => {
      return response.json();
    }).then((beer) => {
      beerShow.innerHTML += beerDetailsTemplat(beer);
    })
  }
})

//edit beer
beerShow.addEventListener('click', (event) => {
  if (event.target.className === "btn btn-info");
  const details = event.target.parentElement.querySelector('textarea').value;
  const beerId = parseInt(event.target.id);
  fetch(`http://localhost:3000/beers/${beerId}`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({description: details})
  }).then((response) => {
    return response.json();
  }).then((newBeer) => {
    beerShow.innerHTML = beerDetailsTemplat(beer);
  })
})
// dont fail me please
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@#*,,*#@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@&*,..,/@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@*,...*@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@*,..,*@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@#*,..,*@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@&*,...,/@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@&*,....,(@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@%*,,....,,,,,,,*********%@@@@@@
// @@@@@@@#*,,,,,,,,,,,,,,,,,,,****/@@@@@@
// @@@@@@&*,,,,,,,,,,,,,,,,,,,*****#@@@@@@
// @@@@@#*,,,,,,,,,,,,,,,,,,,,,*,,,*/@@@@@
// @@@@@(*,,,,,,,,,,,,,,,,,,,,,****/(@@@@@
// @@@@&*,,,,,,,,,,,,,,,,,,,,,,*****%@@@@@
// @@@@%*,,,,,,,,,,,,,,,,,,,,,,****/(@@@@@
// @@@@@/*,,,,,,,,,,,,,,,,,,,,**//(&@@@@@@
// @@@@@@/**,,,,,,,,,,,,,,,,,,,***(@@@@@@@
// @@@@@@@@(/****************///(#@@@@@@@@
// @@@@@@@@@@@@@&%######%%@@@@@@@@@@@@@@@@





// ulTag.addEventListener('click', (event) => {
//   if (event.target.className === "name") {
//     const beerId = parseInt(event.target.id)
//     debugger
//     fetch(`http://localhost:3000/beers/${beerId}`)
//     .then((response) => {
//       return response.json();
//     }).then((beer) => {

//     })
//   }
// })