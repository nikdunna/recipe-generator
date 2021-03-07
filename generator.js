//FUNCTIONS/IMPORTS
const fetch = require('node-fetch'); //Fetch module

const readlineSync = require('readline-sync'); //Readline Sync Module, allows to execute in single line cause it's synchronous

const requestLink = 'https://www.themealdb.com/api/json/v1/1/filter.php?i='
var final;
function getIng()
{
    var ingredient = readlineSync.question('What is your main ingredient?');
    final = requestLink.concat(ingredient);
}

async function getDataset() {
    let response = await 
    fetch(final);
    let data = await response.json()
    return data;
}

async function loadRecipes()
{
  const { meals } = await getDataset();
  const mealNames = meals.map(meal => meal.strMeal)
  console.log("You can make these meals");
  console.log(mealNames.join("\n"));
}


getIng();
loadRecipes();