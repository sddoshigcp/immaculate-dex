const { google } = require("googleapis");

async function fetchPokemonData() {

  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: "./server/credentials.json",
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });

    // Create client instance for auth
    const client = await auth.getClient();

    // Instance of Google Sheets API
    const googleSheets = google.sheets({ version: "v4", auth: client });

    const spreadsheetId = "1h6303e5VeRLbQR2KAbHvFLl1WMwMVRZhUd8zRIp9p7Y";

    // Get metadata about spreadsheet (optional)
    const metadata = await googleSheets.spreadsheets.get({
      auth: auth,
      spreadsheetId: spreadsheetId,
    });

    const getRows = await googleSheets.spreadsheets.values.get({
      auth: auth,
      spreadsheetId: spreadsheetId,
    //   range: "Sheet1!A1:F1215",
        range: "PokeAPI!A1:G12",
    });

    // Data transformation - Structuring the data
    const rows = getRows.data.values;
    const headers = rows[0]; // Assuming the first row contains headers
    const structuredData = [];

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      const rowData = {};

      for (let j = 0; j < headers.length; j++) {
        rowData[headers[j]] = row[j];
      }

      structuredData.push(rowData);
    }

    return structuredData; // Return the structured data
  } catch (error) {
    console.error("Error fetching data from Google Sheets:", error.message);
    throw error;
  }
}

async function fetchCategoryData() {
    try {
        const auth = new google.auth.GoogleAuth({
          keyFile: "./server/credentials.json",
          scopes: "https://www.googleapis.com/auth/spreadsheets",
        });
    
        // Create client instance for auth
        const client = await auth.getClient();
    
        // Instance of Google Sheets API
        const googleSheets = google.sheets({ version: "v4", auth: client });
    
        const spreadsheetId = "1h6303e5VeRLbQR2KAbHvFLl1WMwMVRZhUd8zRIp9p7Y";
    
        // Get metadata about spreadsheet (optional)
        const metadata = await googleSheets.spreadsheets.get({
          auth: auth,
          spreadsheetId: spreadsheetId,
        });
    
        const getRows = await googleSheets.spreadsheets.values.get({
          auth: auth,
          spreadsheetId: spreadsheetId,
        //   range: "Sheet1!A1:F1215",
            range: "Categories!A1:C48",
        });
    
        // Data transformation - Structuring the data
        const rows = getRows.data.values;
        const headers = rows[0]; // Assuming the first row contains headers
        const structuredData = [];
    
        for (let i = 1; i < rows.length; i++) {
          const row = rows[i];
          const rowData = {};
    
          for (let j = 0; j < headers.length; j++) {
            rowData[headers[j]] = row[j];
          }
    
          structuredData.push(rowData);
        }
    
        return structuredData; // Return the structured data
      } catch (error) {
        console.error("Error fetching data from Google Sheets:", error.message);
        throw error;
      }
}

async function fetchSpreadsheetData() {
    try {
      const pokemonData = await fetchPokemonData();
      const categoryData = await fetchCategoryData();
  
      // Do any further processing or manipulation if needed
  
      // Return an object containing both JSON data
      return {
        pokemonData: pokemonData,
        categoryData: categoryData,
      };
    } catch (error) {
      console.error("Error fetching data:", error.message);
      throw error;
    }
  }

module.exports = fetchSpreadsheetData;
