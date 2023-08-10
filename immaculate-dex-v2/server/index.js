const express = require("express");

const PORT = 3001;

//const apiRouter = require('./spreadsheet');
const app = express();
//app.use(apiRouter);
app.use(express.json());

const spreadsheetData = require("./spreadsheet");

app.get("/api", (req, res) => {
    res.json({ message: "API!" });
});

app.get("/api/categories", async (req, res) => {
    // try {
    //     const data = await spreadsheetData();
    //     res.json(data.categoryData);
    // } catch (error) {
    //     console.error("Error fetching category data:", error.message);
    //     res.status(500).send("Internal Server Error");
    // }
    try {
        return categoryData;
    }
    catch (error) {
        console.error("Error fetching data:", error.message);
        throw error;
    }
});

app.get("/api/pokemon", async (req, res) => {
    // try {
    //     const data = await spreadsheetData();
    //     res.json(data.pokemonData);
    // } catch (error) {
    //     console.error("Error fetching pokemon data:", error.message);
    //     res.status(500).send("Internal Server Error");
    // }
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
        if (!response.ok) {
            throw new Error("Network response was not ok.");
        }
        const data = response.json();
        //console.log("data: " + JSON.stringify(data));
        return data.results;
    }
    catch (error) {
        console.error("Error fetching data:", error.message);
        throw error;
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
