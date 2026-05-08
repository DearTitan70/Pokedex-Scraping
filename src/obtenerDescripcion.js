const axios = require("axios");
const cheerio = require("cheerio");
const https = require("https");

const agent = new https.Agent({
  rejectUnauthorized: false
});

async function obtenerDescripcion(url) {
  const { data } = await axios.get(url, {
    httpsAgent: agent,
    headers: {
      "User-Agent": "Mozilla/5.0"
    }
  });

  const $ = cheerio.load(data);

  const descripcion = $("p.version-x.active")
    .first()
    .text()
    .trim();

  return descripcion || "Sin descripción";
}

module.exports = obtenerDescripcion;