document.addEventListener( 'DOMContentLoaded', function() {
console.log( "loaded" )

let listTag = document.querySelector( '#list-group' )
beerFetch( listTag )
//#########################################
// fetch( 'http://localhost:3000/beers' )
// .then( res => { return res.json() } )
// .then( beers => { 

// beers.forEach( (beer) => { listTag.innerHTML += `<ul class="list-group" ><li class="list-group-item" data-id="${beer.id}"> ${beer.name} </ul></li> `} )

//  } )
//#########################################
//Above sets out the beer name list
//refactored the above into a function below, kept for reference


document.addEventListener( 'click', ( event ) => {
	
	if ( event.target.className === "list-group-item" ) {//listen for clicks on the beer items
  
    let beerId = event.target.dataset.id//id only to be used for comparison later
    let beerDetailTag = document.querySelector( '#beer-detail' )
   
    fetch( 'http://localhost:3000/beers' )
    .then( res => { return res.json() } )
    .then( beers => { 

       beers.forEach( ( beer ) => {


       if ( parseInt( beerId ) === beer.id ){// this may cause future bugs if HTML is changed around

       	beerDetailTag.innerHTML = `<h1>${ beer.name }</h1>
                                  <img src="${ beer.image_url }">
                                  <h3>${ beer.tagline }</h3>
                                 
                                   <textarea>${ beer.description }</textarea>
                                   <button data-id="${ beer.id }" class="btn btn-info">
                                   Save
                                   </button>`

       }

       }) 

    })

	}
//Make the save button work with edits

	let saveBtn = document.querySelector( "#edit-beer" )
	if ( event.target.className === "btn btn-info" ) { //listen for clicks to the save button

		let beerId = event.target.dataset.id
		let textToSave = document.querySelector( 'textarea' ).value
		fetch(`http://localhost:3000/beers/${beerId}`, {
			'method':'PATCH',
			'headers': {
				'Content-Type': 'application/json',
				'Accept':'application/json'
			},
			'body': JSON.stringify( { description: textToSave } )
		}).then( res => { return res.json() } )
		.then( res => { console.log( res ) } )// for testing purposes

	}


}) 




})








let beerFetch = ( htmlTag )=> { //functions for the initial fetch

fetch( 'http://localhost:3000/beers' )
.then( res => { return res.json() } )
.then( beers => { 
  beers.forEach( ( beer ) => {populateBeer(htmlTag, beer)})
  } )

}

let populateBeer = ( tag, beer ) => {//goes hand in hand with the beerFetch function

   tag.innerHTML += `<ul class="list-group" ><li class="list-group-item" data-id="${beer.id}"> ${beer.name} </ul></li> `

}


