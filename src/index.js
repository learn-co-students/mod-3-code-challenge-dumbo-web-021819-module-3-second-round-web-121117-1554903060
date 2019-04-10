const listGroup = document.getElementById('list-group')
const beerDetail = document.getElementById('beer-detail')
const editBeerButton = document.getElementById('edit-beer')

const ROOT_ENDPOINT = 'http://localhost:3000'
const BEERS_ENDPOINT = `${ROOT_ENDPOINT}/beers`

const beerAdapter = {
	getBeers: () => fetch(BEERS_ENDPOINT).then(res => res.json()).then(beers => beers),
	getBeer: (beerID) => fetch(`${BEERS_ENDPOINT}/${beerID}`).then(res => res.json()).then(beer => beer),
	editDescription: (beerID, description) => fetch(`${BEERS_ENDPOINT}/${beerID}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
    		'Accept': 'application/json'
		},
		body: JSON.stringify({
			description: description
		})
	})
	.then(res => res.json())
	.then(data => data)
}

const beerView = {
	addBeersToListGroup: (beers) => beers.forEach(beer => {
		listGroup.innerHTML += `<li class="list-group-item beer-item" data-id="${beer.id}">
                              ${beer.name}
                            </li>`
	}),
	loadBeerDetail: (beer) => {
		beerDetail.dataset.id = beer.id;
		beerDetail.innerHTML = `
		<h1>${beer.name}</h1>
		<img src="${beer.image_url}">
		<h3>${beer.tagline}</h3>
		<textarea>${beer.description}</textarea>
		<button id="edit-beer" class="btn btn-info">
		  Save
		</button>`
	},
	setActive: (beerListItem) => {
    // remove any other active elements
		if(listGroup.querySelector('.active'))
			listGroup.querySelector('.active').classList.remove('active')
				
    // set the new active element
		beerListItem.classList.add('active');
	},
  showSaveAlert: () => {
    document.getElementById('saveAlert').style.display = 'block'
    setTimeout(() => {
      document.getElementById('saveAlert').style.display = 'none';
    }, 3500)
  }
}

const listenForBeerClick = () => {
  listGroup.addEventListener('click', (event) => {
    if(event.target.className.includes('beer-item')) {
      beerAdapter.getBeer(event.target.dataset.id).then((beer) => {
        beerView.setActive(event.target)
        beerView.loadBeerDetail(beer)
      })
    }
  })
}

const listenForEditSubmission = () => {
  beerDetail.addEventListener('click', (event) => {
    if(event.target.id === 'edit-beer') {
      const detail = event.target.parentElement;
      const beerID = detail.dataset.id
      const description = detail.querySelector('textarea').value
      beerAdapter.editDescription(beerID, description)
      beerView.showSaveAlert()
    }
  })
}

beerAdapter.getBeers().then((beers) => {
	beerView.addBeersToListGroup(beers)
  listenForBeerClick()
  listenForEditSubmission()
})