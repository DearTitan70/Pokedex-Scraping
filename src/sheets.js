const { google } = require("googleapis");

async function escribirEnHoja(pokemons) {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: "credentials.json",
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const spreadsheetId = process.env.SPREADSHEET_ID;

    await sheets.spreadsheets.values.clear({
      spreadsheetId,
      range: "Pokemons!A:E",
    });

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: "Pokemons!A1",
      valueInputOption: "RAW",
      requestBody: {
        values: [
          ["Número", "Nombre", "Descripción", "Tipos", "Imagen"]
        ],
      },
    });

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Pokemons!A2",
      valueInputOption: "RAW",
      requestBody: {
        values: pokemons.map(p => [
          p.numero,
          p.nombre,
          p.descripcion,
          p.tipos,
          p.imagen,
        ]),
      },
    });

    console.log("Datos enviados correctamente a Google Sheets.");

  } catch (error) {
    console.error("Error escribiendo en Sheets:", error.message);
    throw error;
  }
}

module.exports = escribirEnHoja;