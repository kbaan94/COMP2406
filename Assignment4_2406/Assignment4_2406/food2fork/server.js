// require modules
const express = require('express');
const path = require('path');
const recipesRouter = require('./api/recipes');

// start the app
const app = express();

// use body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// set the public path
const publicPath = path.join(__dirname, 'public');

// set static folder
app.use(express.static(publicPath));

// Home Route should redirect to recipes
app.get('/', (req, res) => res.redirect('/recipes'));

// Recipes Route and recipes.html should send index.html as a response
app.get('/recipes', (req, res) => res.sendFile('index.html', {root: publicPath}));
app.get('/recipes.html', (req, res) => res.sendFile('index.html', {root: publicPath}));

// Members API routes
app.use('/api', recipesRouter);

// set the default port to 3000
const PORT = process.env.PORT || 3000;

// listen to the port
app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT} CNTL-C to quit`);
    console.log('To Test:');
    console.log('http://localhost:3000/recipes');
    console.log('http://localhost:3000/recipes?ingredient=Basil');
    console.log('http://localhost:3000/recipes?ingredient=Basil,Cumin');
    console.log('To get just the JSON data:');
    console.log('http://localhost:3000/api');
    console.log('http://localhost:3000/api?ingredient=Basil');
    console.log('http://localhost:3000/api?ingredient=Basil,Cumin');
});
