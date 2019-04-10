//display all beer names on the left side of the screen. 

//template for displaying all beer names 
const beerListItem = (beer) => {
    return `<li class="list-group-item" data-id=${beer.id}>${beer.name}</li> `
}

//where i am placing the beer list 
const beerListTag = document.querySelector("ul.list-group")

//make a call to the database for the beer list items 
fetch('http://localhost:3000/beers/')
    .then(response => response.json())
        .then((beers) => {
            beers.forEach((beer) => {
                beerListTag.innerHTML += beerListItem(beer)
            })
        })

//----------------------------------------------------------//
//displaying more details on the right side of the screen. 

//template for displaying beer details
const beerDetails = (beer) => {
    return `<div data-id=${beer.id}>
            <h1>${beer.name}</h1>
            <img src=${beer.image_url}>
            <h3>${beer.tagline}</h3>
            <textarea>${beer.description}</textarea>
            <button id="edit-beer" class="btn btn-info"> Save </button>
            <button id="delete-beer" class="btn btn-delete"> Delete </button>
            <button id="more-info" class="btn-more-info"> More Details </button>
            </div>`
}

//template for displaying more beers 

const extendedBeerDetails = (beer) => {
    return `<div data-id=${beer.id}>
    <h1>${beer.name}</h1>
    <img src=${beer.image_url}>
    <h3>${beer.tagline}</h3>
    <p>First Brewed: ${beer.first_brewed} </p>
    <p>${beer.description}</p>
    <p> Food Pairings: ${beer.food_pairing}</p>
    <p> Brewers Tips: ${beer.brewers_tips}</p>
    <p><em> Contributed by: ${beer.contributed_by} </em></p>
    </div>`
}

//where i am placing the beer details. 
const beerDetailTag = document.querySelector('div#beer-detail')

//when a user clicks on a beerListItem the corresponding beerDetails should appear in the beerDetailTag
//wait for the click on a list item and then populate the div tag with the correct data. 
//if the id on the event.target is === to the id on the beer detail. 
//the beer detail becomes the innerHtml of the beerDetailTag. 
document.addEventListener('click', () => {
let selectedBeerId = parseInt(event.target.dataset.id)
if(selectedBeerId){
    fetch(`http://localhost:3000/beers/${selectedBeerId}`)
        .then(response => response.json())
            .then((beer) => {
                beerDetailTag.innerHTML = beerDetails(beer)
            })
        }
})

//in the beerDetailTag, when a user clicks in the text area 
beerDetailTag.addEventListener('click', () => {
    if (event.target.className === 'btn btn-info'){
        let newText = event.target.parentElement.querySelector('textarea').value
        let beerId = parseInt(event.target.parentElement.dataset.id)
        
        fetch(`http://localhost:3000/beers/${beerId}`, {
            method: 'PATCH', 
            headers: {
                'Content-Type': 'application/json', 
                'Accept': 'application/json'
            }, 
            body: JSON.stringify({description: newText})
        })
        .then(response => response.json())
            .then((updatedBeer) => {
                beerDetailTag.innerHTML = beerDetails(updatedBeer)
            })
    }
    else if (event.target.className === 'btn btn-delete'){
        debugger
        let beerId = parseInt(event.target.parentElement.dataset.id)
        fetch(`http://localhost:3000/beers/${beerId}`, {
            method: 'DELETE'
        })
        .then(response => response.json()) 
    } //this is not done. it does not delete from the DOM until refresh!!!

})
//seeing all of the beer details. 
beerDetailTag.addEventListener('click', () => {
    let selectedBeerId = parseInt(event.target.parentElement.dataset.id)
    if (event.target.className === 'btn-more-info'){
        fetch(`http://localhost:3000/beers/${selectedBeerId}`)
        .then(response => response.json())
        .then((beer) => {
            beerDetailTag.innerHTML = extendedBeerDetails(beer)
        })
        .then
    }
})

//delete a beer
