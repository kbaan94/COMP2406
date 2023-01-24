// Grab the flexbox container
const recipesFlexbox = document.getElementById('recipesFlexbox');

// fetch all recipes (without parameters)
function fetchAllRecipes() {
    recipesFlexbox.innerHTML = '';
    fetch('http://localhost:3000/api')
    .then(res => res.json())
    .then(
        recipes => recipes.forEach(recipe => recipesFlexbox.innerHTML += `
            <div style="max-width: 250px; max-height: 300px;" class="flex-item card mw-25 mr-2 mb-4 border border-success rounded-0">
                <a target="_blank" style="text-decoration: none" href="${recipe.f2f_url}">
                    <img height="200" class="card-img-top" src="${recipe.image_url}" alt="Recipe image cap">
                    <div class="card-body">
                        <p class="card-text text-center">${recipe.title}</p>
                    </div>
                </a>
            </div>
        `)
    );
}

function fetchRecipesByQuery(query) {
    recipesFlexbox.innerHTML = '';
        fetch(`http://localhost:3000/api?ingredient=${query}`)
        .then(res => res.json())
        .then(
        recipes => recipes.forEach(recipe => recipesFlexbox.innerHTML += `
            <div style="max-width: 250px; max-height: 300px;" class="flex-item card mw-25 mr-2 mb-4 border border-success rounded-0">
                <a target="_blank" style="text-decoration: none" href="${recipe.f2f_url}">
                    <img height="200" class="card-img-top" src="${recipe.image_url}" alt="Recipe image cap">
                    <div class="card-body">
                        <p class="card-text text-center">${recipe.title}</p>
                    </div>
                </a>
            </div>
        `)
        );
}

// capture the click even on the submit button
document.getElementById('submitBtn').addEventListener('click', clickEvent => {

    // get the user's query
    const query = document.getElementById('query').value.trim();

    // if the user searched for something, pass the parameters to the GET request
    if (query.length > 0) {
        fetchRecipesByQuery(query);
    // if the query is empty, fetch all recipes once again
    } else {
        fetchAllRecipes();
    }

});

// Capture the keyup keyboard event on the search field
document.getElementById('query').addEventListener("keyup", keyUpEvent => {

    // if the user pressed 'Enter'
    if (keyUpEvent.keyCode === 13) {

      // cancel the default action
      keyUpEvent.preventDefault();

      // trigger the submit button click handler
      document.getElementById("submitBtn").click();
    }

  });


// check the current active URL
const { href } = window.location;

// check if the user has provided query parameters or not
if (href.includes('?ingredient=')) {

    // get the user's query
    const query = href.substring(href.indexOf('=')+1);

    // fetch recipes filtered by query
    fetchRecipesByQuery(query);

} else {

    // fetch all recipes
    fetchAllRecipes();
}