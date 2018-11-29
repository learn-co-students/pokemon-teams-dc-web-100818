const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", function(){
  getTrainers()

})

function getTrainers(){
  fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(json => {
      json.forEach(makeTrainerCard)
    })
}

function makeTrainerCard(trainer){
  let trainerCard = document.createElement('div')
  trainerCard.classList.add('card')
  trainerCard.dataset.id = trainer.id
  getMain().appendChild(trainerCard)

  let trainerName = document.createElement('p')
  trainerName.innerText = trainer.name
  trainerCard.appendChild(trainerName)

  let addPokemonBtn = document.createElement('button')
  addPokemonBtn.setAttribute('data-trainer-id', trainer.id)
  addPokemonBtn.innerText = "Add Pokemon"
  addPokemonBtn.addEventListener('click', function(){
    if (trainer.pokemons.length < 6){
    fetch(POKEMONS_URL, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({trainer_id: trainer.id})
    })
    .then(resp => resp.json())
    .then(json => {
      trainer.pokemons.push(json)

      let newPoke = document.createElement('li')
      newPoke.innerText = `${json.nickname} (${json.species})`
      let release = document.createElement('button')
      release.classList.add('release')
      release.setAttribute('data-pokemon-id', json.id)
      release.innerText = "Release"

      release.addEventListener('click', function(){
        fetch(`${POKEMONS_URL}/${json.id}`, {
          method: "DELETE"
        })
        newPoke.remove()
      })
      newPoke.appendChild(release)
      pokemonList.appendChild(newPoke)
    })
    }
    else{
      alert("You already have 6 pokemon!")
    }
  })
  trainerCard.appendChild(addPokemonBtn)

  let pokemonList = document.createElement('ul')
    for(let i=0; i < trainer.pokemons.length; i++){
      let pokeLi = document.createElement('li')
      pokeLi.innerText = `${trainer.pokemons[i].nickname} (${trainer.pokemons[i].species})`
      let releaseBtn = document.createElement('button')
      releaseBtn.classList.add('release')
      releaseBtn.setAttribute('data-pokemon-id', trainer.pokemons[i].id)
      releaseBtn.innerText = "Release"

      releaseBtn.addEventListener('click', function(){
        fetch(`${POKEMONS_URL}/${trainer.pokemons[i].id}`, {
          method: "DELETE"
        })
        pokeLi.remove()
      })
      pokeLi.appendChild(releaseBtn)
      pokemonList.appendChild(pokeLi)
    }
    trainerCard.appendChild(pokemonList)
}

function getAddBtn(){
  return document.querySelector()
}

function getMain(){
  return document.querySelector('main')
}
