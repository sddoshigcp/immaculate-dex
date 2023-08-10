import apiClient from "./apiClient";
import categoryData from "../Data/categories.json";

// export async function getAllPokemon() {
//     try {
//         const response = await fetch("/api/pokemon");
//         if (!response.ok) {
//             throw new Error("Network response was not ok.");
//         }
//         const data = await response.json();
//         //console.log("data: " + JSON.stringify(data));
//         return data;
//     } catch (error) {
//         console.error("Error fetching data:", error.message);
//         throw error;
//     }
// }

// export async function getCategories() {
//     try {
//         const response = await fetch("/api/categories");
//         if (!response.ok) {
//             throw new Error("Network response was not ok.");
//         }
//         const data = await response.json();
//         //console.log("data: " + JSON.stringify(data));
//         return data;
//     }
//     catch (error) {
//         console.error("Error fetching data:", error.message);
//         throw error;
//     }
// }

export async function getAllPokemon() {
    //use pokeapi instead of google sheets
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
        if (!response.ok) {
            throw new Error("Network response was not ok.");
        }
        const data = await response.json();
        //console.log("data: " + JSON.stringify(data.results));
        return data.results;
    }
    catch (error) {
        console.error("Error fetching data:", error.message);
        throw error;
    }
}

export async function getCategories() {
    try {
        return categoryData;
    }
    catch (error) {
        console.error("Error fetching data:", error.message);
        throw error;
    }
}
