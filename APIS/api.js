const pokemonContainer = document.getElementById("pokemonContainer");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");

let offset = 0;
const limit = 2;

const API_URL = "https://pokeapi.co/api/v2/pokemon";

const obtenerPokemones = async () => {
  try {
    const respuesta = await fetch(`${API_URL}?limit=${limit}&offset=${offset}`);
    const data = await respuesta.json();
    console.log(data)

    const promesas = data.results.map((pokemon) =>
      fetch(pokemon.url).then((res) => res.json())
    );

    const pokemones = await Promise.all(promesas);

    pokemones.forEach((pokemon) => crearCardPokemon(pokemon));

    offset += limit;
  } catch (error) {
    console.error("Error al obtener los Pokémon:", error);
    pokemonContainer.innerHTML = "<p>Error al cargar los Pokémon.</p>";
  }
};

/* Buscar Pokemon diferenciando por minusculas y mayusculas  */
const buscarPokemon = async (nombre) => {
  try {
    pokemonContainer.innerHTML = "";

    const respuesta = await fetch(`${API_URL}/${nombre.toLowerCase()}`);

    if (!respuesta.ok) {
      pokemonContainer.innerHTML = `<p>No se encontró el Pokémon "${nombre}".</p>`;
      return;
    }

    const pokemon = await respuesta.json();
    crearCardPokemon(pokemon);
  } catch (error) {
    console.error("Error al buscar Pokémon:", error);
  }
};

const crearCardPokemon = (pokemon) => {
  const card = document.createElement("article");
  card.classList.add("pokemon-card");

  const numero = pokemon.id.toString().padStart(3, "0");

  const tipos = pokemon.types
    .map(
      (tipo) =>
        `<span class="type ${tipo.type.name}">${tipo.type.name}</span>`
    )
    .join("");

  const habilidades = pokemon.abilities
    .map((habilidad) => habilidad.ability.name)
    .join(", ");

  const stats = pokemon.stats
    .map((stat) => {
      const porcentaje = Math.min(stat.base_stat, 100);

      return `
        <div class="stat">
          <div class="stat-name">${stat.stat.name}: ${stat.base_stat}</div>
          <div class="stat-bar">
            <div class="stat-fill" style="width: ${porcentaje}%"></div>
          </div>
        </div>
      `;
    })
    .join("");

  card.innerHTML = `
    <p class="pokemon-number">#${numero}</p>

    <img 
      class="pokemon-img" 
      src="${pokemon.sprites.front_default}" 
      alt="${pokemon.name}"
    />

    <h2 class="pokemon-name">${pokemon.name}</h2>

    <div class="types">
      ${tipos}
    </div>

    <div class="info">
      <p><strong>Altura:</strong> ${pokemon.height / 10} m</p>
      <p><strong>Peso:</strong> ${pokemon.weight / 10} kg</p>
      <p><strong>Habilidades:</strong> ${habilidades}</p>
    </div>

    <div class="stats">
      ${stats}
    </div>
  `;

  pokemonContainer.appendChild(card);
};

loadMoreBtn.addEventListener("click", obtenerPokemones);

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const nombre = searchInput.value.trim();

  if (nombre === "") {
    pokemonContainer.innerHTML = "";
    offset = 0;
    obtenerPokemones();
    return;
  }

  buscarPokemon(nombre);
});

obtenerPokemones();