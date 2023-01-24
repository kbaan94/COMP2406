// require modules
const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

// store all the recipes (mock data)
// let recipes = [
//     {
//         name: 'Slow Cooker Chicken Tortilla Soup',
//         url: 'https://www.food2fork.com/view/Slow_Cooker_Chicken_Tortilla_Soup/29159',
//         img: 'https://static.food2fork.com/19321150c4.jpg',
//     },
//     {
//         name: 'Amazing Apricot Chicken',
//         url: 'https://www.food2fork.com/view/Slow_Cooker_Chicken_Tortilla_Soup/29159',
//         img: 'https://static.food2fork.com/19321150c4.jpg',
//     },
//     {
//         name: 'Meatloaf Balsamico',
//         url: 'https://www.food2fork.com/view/Slow_Cooker_Chicken_Tortilla_Soup/29159',
//         img: 'https://static.food2fork.com/19321150c4.jpg',
//     },
//     {
//         name: 'Pork and Veggie Bibimbap',
//         url: 'https://www.food2fork.com/view/Slow_Cooker_Chicken_Tortilla_Soup/29159',
//         img: 'https://static.food2fork.com/19321150c4.jpg',
//     },
//     {
//         name: 'Monterey Jack Chicken Sandwich',
//         url: 'https://www.food2fork.com/view/Slow_Cooker_Chicken_Tortilla_Soup/29159',
//         img: 'https://static.food2fork.com/19321150c4.jpg',
//     },
//     {
//         name: 'Pulled Pork Fiesta Bowls',
//         url: 'https://www.food2fork.com/view/Slow_Cooker_Chicken_Tortilla_Soup/29159',
//         img: 'https://static.food2fork.com/19321150c4.jpg',
//     },
//     {
//         name: 'Roasted Pork Tenderloin',
//         url: 'https://www.food2fork.com/view/Slow_Cooker_Chicken_Tortilla_Soup/29159',
//         img: 'https://static.food2fork.com/19321150c4.jpg',
//     },
//     {
//         name: 'Mediterranean Baked Veggies',
//         url: 'https://www.food2fork.com/view/Slow_Cooker_Chicken_Tortilla_Soup/29159',
//         img: 'https://static.food2fork.com/19321150c4.jpg',
//     },
//     {
//         name: 'Roasted Broccoli and Potato Chowder',
//         url: 'https://www.food2fork.com/view/Slow_Cooker_Chicken_Tortilla_Soup/29159',
//         img: 'https://static.food2fork.com/19321150c4.jpg',
//     },
//     {
//         name: 'Veggie Chile Rellenos',
//         url: 'https://www.food2fork.com/view/Slow_Cooker_Chicken_Tortilla_Soup/29159',
//         img: 'https://static.food2fork.com/19321150c4.jpg',
//     }
// ];

// initialize recipes as an empty array
let recipes = [];

// hard-code the secret key
const FOOD_2_FORK_API_KEY = '90959b0d0fc9e3ad202d77ec10a37191';


// GET recipes http://localhost:3000/api/
router.get('/', (req, res) => {

    // grab the query parameters
    const ingredientsQueryParams = req.query['ingredient'];

    // if the user set an/some ingredient(s), filter the recipes by their ingredients
    if (ingredientsQueryParams) {

        // fetch filtered recipes using our API KEY and return up to 30 in JSON format or [ ] in case it fails
        fetch(`https://www.food2fork.com/api/search?key=${FOOD_2_FORK_API_KEY}&q=${ingredientsQueryParams}`)
            .then(val => val.json())
            .then(valJSON => {

                    recipes = valJSON.recipes;

                    // return up to 30 recipes
                    res.json(recipes.splice(0,30));
                },
                error => {
                    console.log(error);
                    res.json([]);
                }
        );

    // otherwise return all up to 30 recipes
    } else { 

        // fetch all recipes using our API KEY and return up to 30 in JSON format or [ ] in case it fails
        fetch(`https://www.food2fork.com/api/search?key=${FOOD_2_FORK_API_KEY}`)
            .then(val => val.json())
            .then(valJSON => {
                    recipes = valJSON.recipes;
                    res.json(recipes.splice(0,30));
                },
                error => {
                    console.log(error);
                    res.json([]);
                }
        );
        
    }

});

// export the API router
module.exports = router;