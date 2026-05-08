const axios = require("axios");

const https = require("https");

const agent = new https.Agent({
  rejectUnauthorized: false
});

async function obtenerListaPokemon() {
    const respuesta = await axios.get("https://www.pokemon.com/api/1/el/kalos/kalos",
        { httpsAgent: agent }
    );

    const pokemons = respuesta.data
        .slice(0, 151)
        .map(pokemon => ({
            numero: pokemon.number,
            nombre: pokemon.name,
            tipos: pokemon.type.map(tipo => capitalizar(tipo)).join("/"),
            imagen: pokemon.ThumbnailImage,
            detailURL: "https://www.pokemon.com" + pokemon.detailPageURL
        }));

        return pokemons;
}

function capitalizar(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}

module.exports = obtenerListaPokemon;