const ulTag = document.querySelector('ul#list-group')
const beerDetailDiv = document.querySelector('div#beer-detail')


// remember, identify key values are done in the event listener
// fetch for create, update requires the return on the fetch
// all fetch but delete require .then() of response
// update and create fetch requires JSON.stringify on the body


const beerListTag = (beer) => {
    return `<li data-id=${beer.id} class='list-group-item'>${beer.name}</li>`
}

const showBeerDetail = (beer) => {
    return `<h1>${beer.name}</h1>
    <img src=${beer.image_url}>
    <h3>${beer.tagline}</h3>
    <textarea>${beer.description}</textarea>
    <button data-id=${beer.id} id="edit-beer" class="btn btn-info">
    Save
    </button>`
}

fetch('http://localhost:3000/beers')
.then((resp) => {
    return resp.json()
}).then((beers) => {
    beers.forEach((beer) => {
        ulTag.innerHTML += beerListTag(beer);
    })
})

const singleBeerDetail = (id) => {
    fetch(`http://localhost:3000/beers/${id}`)
    .then((resp) => {
        return resp.json()
    }).then((beer) => {
        beerDetailDiv.innerHTML = showBeerDetail(beer)
    })
}


ulTag.addEventListener('click', (event) => {
    event.preventDefault();
    if(event.target.tagName === 'LI') {
        singleBeerDetail(event.target.dataset.id)
    }
})


const editBeerDetails = (id, newDescription) => {
    return fetch(`http://localhost:3000/beers/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({description: newDescription})
    }).then((resp) => {
        return resp.json()
    })
}

beerDetailDiv.addEventListener('click', (event) => {
    event.preventDefault();
    if(event.target.tagName === 'BUTTON') {
        let editBeerButton = beerDetailDiv.querySelector('button#edit-beer');
        let textAreaTag = event.target.parentElement.querySelector('textarea');
        let descriptionText = event.target.parentElement.querySelector('textarea').value;

        

        editBeerDetails(event.target.dataset.id, descriptionText).then((resp) => {
            
            let newDescription = `${resp.description}`
            textAreaTag.textContent = newDescription;
        })
    }
})
