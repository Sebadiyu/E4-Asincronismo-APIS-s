document.getElementById("searchButton").addEventListener("click", () => {
    const pokemonNumber = document.getElementById("pokemonNumber").value;
    //Ingreso de numero en imput

    if (!pokemonNumber) {
        displayErrorCard("Por favor, ingresa un número de Pokémon.");
        return;
    } //Si no hay numero ingresado

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`)
        .then((response) => {
            if (!response.ok) {
                //Si devuelve false pasa al error
                throw new Error("Pokémon no encontrado.");
            }
            return response.json();
        })
        .then((data) => {
            displayPokemon(data);
            clearError();
        })
        .catch((error) => {
            displayErrorCard(error.message);
        });
});

function displayPokemon(pokemon) {
    const pokemonContainer = document.getElementById("pokemonContainer");
    if (!pokemon) {
        pokemonContainer.innerHTML = `
            <div class="card">
                <p>Número de Pokémon no encontrado.</p>
            </div>
        `;
        return;
    }

    pokemonContainer.innerHTML = `
        <div class="card">
            <img class="img-card" src="${
                pokemon.sprites.other["official-artwork"].front_default
            }" alt="${pokemon.name}">
            <h2>${pokemon.name}</h2>
            <p><strong>Tipo:</strong> ${pokemon.types
                .map((type) => type.type.name)
                .join(", ")}</p>
            <p><strong>Altura:</strong> ${pokemon.height / 10} m</p>
            <p><strong>Peso:</strong> ${pokemon.weight / 10} kg</p>
        </div>
    `;
    clearError();
}

function showError(message) {
    const errorMessage = document.getElementById("errorMsg");
    errorMessage.textContent = message;
}

function clearError() {
    const errorMessage = document.getElementById("errorMsg");
    errorMessage.textContent = "";
}

function displayErrorCard(message) {
    const pokemonContainer = document.getElementById("pokemonContainer");
    pokemonContainer.innerHTML = `
        <div class="card">
            <p>${message}</p>
        </div>
    `;
}
