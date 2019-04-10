document.addEventListener('DOMContentLoaded', e => {
    // document.addEventListener('click', e => console.log(e.target));
    fetchAllBeers()
    .then(makeAllBeersLi);
    listGroupClickListener();
    editBeerListener()
});

function fetchAllBeers() {
    return fetch('http://localhost:3000/beers')
    .then(r => r.json())
    .then(beersArray => beersArray)
}

function makeAllBeersLi(beersArray) {
    beersArray.forEach (beerObj => {
        const listGroup = document.getElementById('list-group')
        listGroup.innerHTML += `
        <li class="list-group-item" data-beer-id="${beerObj.id}">${beerObj.name}</li>
        </div>
        `
    })
}

function listGroupClickListener() {
    document.getElementById('list-group').addEventListener('click', e => {
        if (e.target.tagName === 'LI') {
            fetch(`http://localhost:3000/beers/${e.target.dataset.beerId}`)
            .then(r => r.json())
            .then(postBeerDetailTag)
        }
    })
}

function makeBeerDetailTag(beerObj) {
    return `
    <h1>${beerObj.name}</h1>
    <img src="${beerObj.image_url}">
    <h3>${beerObj.tagline}</h3>
    <textarea>${beerObj.description}</textarea>
    <button id="edit-beer" class="btn btn-info" data-beer-id="${beerObj.id}">
      Save
    </button>
    `
}

function postBeerDetailTag(beerObj) {
    document.getElementById('beer-detail').innerHTML = '';
    document.getElementById('beer-detail').innerHTML += makeBeerDetailTag(beerObj);
    document.querySelector('textarea').addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const beerDetail = e.target.value;
            const beerId = e.target.parentElement.querySelector('button').dataset.beerId
            updateBeerDetailInDb(beerId, beerDetail)
        }
    })
}

function editBeerListener() {
        document.getElementById('beer-detail').addEventListener('click', e => {
        if (e.target.id === 'edit-beer') {
            const beerDetail = e.target.parentElement.querySelector('textarea').value
            const beerId = e.target.dataset.beerId 
            updateBeerDetailInDb(beerId, beerDetail)
        }
    })
}

function updateBeerDetailInDb(beerId, beerDetail) {
    fetch(`http://localhost:3000/beers/${beerId}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json', Accept: 'application/json'},
    body: JSON.stringify({description: beerDetail})})
}

