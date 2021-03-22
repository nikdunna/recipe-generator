//FUNCTIONS/IMPORTS
const fetch = require('node-fetch'); //Fetch module
const readlineSync = require('readline-sync'); //Readline Sync Module, allows to execute in single line cause it's synchronous
const requestLink = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
var final;

function getIng() {
  var ingredient = readlineSync.question('What is your main ingredient?');
  final = requestLink.concat(ingredient);
}
async function getDataset() {
  let response = await fetch(final);
  let data = await response.json();
  return data;
}
async function loadRecipes() {
  const { meals } = await getDataset(); 
  if (!meals) {
    throw meals; //throws the error when undefined
  }
  const mealNames = meals.map(meals => meals.strMeal) //takes the string names of the recipes from the json 
  console.log("You can make these meals");
  console.log(mealNames.join("\n"));
  return meals;
}
function errorHandler(error) {
  console.log("This item is not found within our recipe list, please try again");
  runMain();
}
function runMain() {
  getIng();
  loadRecipes()
    .catch((error) => errorHandler(error)); //catches error and runs errorHandler function
}


runMain(); //put in a function so it can loop around if necessary


//not sure where the code set a Promise, but it's either that or error got thrown somewhere unexpected
//assumed { meals } or mealNames would be cause of link fetching error, they should already be throwing an error object if error message is indicative
//tried to handle error via .catch() and try/catch under loadRecipe() callback, did not work, perhaps misused or misplaced
//tried to handle via callbacks in loadRecipe() when using callback getDataset() and rerouting to errorHandler()

//update, error happens at const { meals } and is fixed with an if(!meals) statement and throw/catch sequence, programs loops to question again if an error is caught
