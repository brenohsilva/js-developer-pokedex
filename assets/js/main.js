const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;


function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">

            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <div>
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                </div>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>

            <div class="containerProperties">
                <h3>About</h3>
                <div class="properties">
                <span class="propertiesTitle">weight</span>
                <span>${pokemon.weight} kg</span>
                <span class="propertiesTitle" >Height</span>
                <span>${pokemon.height} m</span>
                <span class="propertiesTitle" >Ability</span>
                <span>${pokemon.ability}</span>
            </div>
        </li>
        
    `
}

loadPokemonItens(offset, limit)

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')

        pokemonList.innerHTML += newHtml
    })
}

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

