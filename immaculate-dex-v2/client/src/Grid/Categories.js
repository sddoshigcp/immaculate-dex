import { getCategories } from "../Service/pokedexService";

function getRandomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getCategoryById(dataArray, id) {
    for (const item of dataArray) {
        if (item.id === id.toString()) {
            return item;
        }
    }
    return null; // If no matching Id is found
}

export async function getHeaders() {
    //get three categories using pokedexService where Clue = column
    //return array of three categories

    const categories = await getCategories();

    let length = categories.length;

    const headers = [];

    //generate three random numbers between 1 and length inclusive

    const randomNumbers = [];
    while (randomNumbers.length < 6) {
        let randomNumber = getRandomNumberInRange(1, length);
        if (!randomNumbers.includes(randomNumber)) {
            randomNumbers.push(randomNumber);

           const category = getCategoryById(categories, randomNumber);
           //console.log("columnCategory: " + columnCategory);
            //columnHeaders.push(getCategoryById(categories, randomNumber));
            headers.push(category);
        }
    }

    return headers;
}

