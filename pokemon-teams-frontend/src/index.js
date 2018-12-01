const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", function(){
  fetchAllTrainers().then(data => renderTrainers(data))
})

//function to get elements

function getMain(){
  return document.querySelector('main');
}

function fetchAllTrainers(){
  return fetch('http://localhost:3000/trainers')
    .then(response => response.json())
}

function renderTrainers(data){
  mainElement = getMain();
  data.forEach(trainer => {
    cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
    cardDiv.dataset.id = trainer.id;

    trainerName = document.createElement('p');
    trainerName.innerText = trainer.name;

    addPokemonButton = document.createElement('button');
    addPokemonButton.dataset.trainerId = trainer.id;
    addPokemonButton.innerText = "Add Pokemon";
    addPokemonButton.addEventListener('click', (event) => getPokemon(event, trainer));

    trainerList = document.createElement('ul');
    trainerList.id = `trainer-${trainer.id}`;
    trainer.pokemons.forEach(pokemon => {
      pokemonItem = document.createElement('li');
      pokemonItem.id = `pokemon-${pokemon.id}`
      pokemonItem.innerText = `${pokemon.species} (${pokemon.nickname})`;
      trainerList.appendChild(pokemonItem);
      releasePokemonButton = document.createElement('button');
      releasePokemonButton.classList.add('release');
      releasePokemonButton.dataset.pokemonId = pokemon.id;
      releasePokemonButton.innerText = 'release';
      releasePokemonButton.addEventListener('click', releasePokemon);
      pokemonItem.appendChild(releasePokemonButton);
    })

    mainElement.appendChild(cardDiv)
    cardDiv.append(trainerName, addPokemonButton, trainerList)
  })
}

function renderNewPokemon(trainer, data){
  myList = document.getElementById(`trainer-${trainer.id}`);
  pokemonItem = document.createElement('li');
  pokemonItem.id = `pokemon-${data.id}`
  pokemonItem.innerText = `${data.species} (${data.nickname})`;
  myList.appendChild(pokemonItem);
  releasePokemonButton = document.createElement('button');
  releasePokemonButton.classList.add('release');
  releasePokemonButton.dataset.pokemonId = data.id;
  releasePokemonButton.innerText = 'release';
  releasePokemonButton.addEventListener('click', releasePokemon);
  pokemonItem.appendChild(releasePokemonButton);
}

function getPokemon(event, trainer){
  if (trainer.pokemons.length >= 6){
    alert('You can only have up to 6 Pokemon');
  } else if (trainer.pokemons.length < 6){
    data = { trainer_id: `${trainer.id}`}
    fetch('http://localhost:3000/pokemons', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response => response.json())
      .then(data => {
      renderNewPokemon(trainer, data);
    });
  }
}

function releasePokemon(event){
  pokemonId = Number(event.currentTarget.dataset.pokemonId);
  fetch(`http://localhost:3000/pokemons/${pokemonId}`, {
    method: "DELETE"
  }).then(response => response.json())
  .then(data => {
    deletePokemonFromDom(data);
  })
}

function deletePokemonFromDom(data){
  thisPokemonItem = document.querySelector(`#pokemon-${data.id}`)
  console.log(thisPokemonItem);
  thisPokemonItem.remove();
}
