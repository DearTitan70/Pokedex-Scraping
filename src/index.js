require("dotenv").config();

const obtenerListaPokemon = require("./scraper");
const obtenerDescripcion = require("./obtenerDescripcion");
const escribirEnHoja = require("./sheets");

async function main() {
  try {
    console.log("Obteniendo lista base...");
    const pokemons = await obtenerListaPokemon();

    console.log("Obteniendo descripciones individuales...");

    for (let i = 0; i < pokemons.length; i++) {
        console.log(`Procesando ${i + 1}/151 - ${pokemons[i].nombre}`);

        const descripcion = await obtenerDescripcion(pokemons[i].detailURL);
        pokemons[i].descripcion = descripcion;
    }

    console.log("Enviando datos a Google Sheets...");
    await escribirEnHoja(pokemons);

    console.log("Proceso completado correctamente.");
  } catch (error) {
    console.error("Error general:", error);
  }
}

main();