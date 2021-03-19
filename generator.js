//FUNCTIONS/IMPORTS
const fetch = require('node-fetch'); //Fetch module

const readlineSync = require('readline-sync'); //Readline Sync Module, allows to execute in single line cause it's synchronous

const requestLink = 'https://www.themealdb.com/api/json/v1/1/filter.php?i='
var final;
function getIng() {
    var ingredient = readlineSync.question('What is your main ingredient?');
    final = requestLink.concat(ingredient);
}

async function getDataset() {
    let response = await 
    fetch(final);
    let data = await response.json()
    return data;
}

async function loadRecipes() {
  const { meals } = await getDataset();
  const mealNames = meals.map(meal => meal.strMeal)
  console.log("You can make these meals");
  console.log(mealNames.join("\n"));
}

/*function errorHandler(error) {
  console.log("This item is not found within our recipe list:");
  console.log({ meals });
}
*/


getIng();
//try {
  loadRecipes()
    .then({ meals } , { meals })
    .catch({ meals } , console.error(error.message))
    .finally(() => console.log("This item is not found within our recipe list:" + { meals }));
/*} catch ({ meals }) {
  errorHandler({ meals });
}
*/

//not sure where the code set a Promise, but it's either that or error got thrown somewhere unexpected
//assumed { meals } or mealNames would be cause of link fetching error, they should already be throwing an error object if error message is indicative
//tried to handle error via .catch() and try/catch under loadRecipe() callback, did not work, perhaps misused or misplaced
//tried to handle via callbacks in loadRecipe() when using callback getDataset() and rerouting to errorHandler()


/*some default error messages displayed (for archiving purposes):
(node:16440) UnhandledPromiseRejectionWarning: TypeError: Cannot read property 'map' of null
    at loadRecipes (C:\Users\Nubtastic\Documents\Code Stuff\recipe-generator-master\generator.js:28:27)
(Use `node --trace-warnings ...` to show where the warning was created)
(node:16440) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside 
of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). To terminate the 
node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 1)
(node:16440) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.


(node:10452) UnhandledPromiseRejectionWarning: TypeError: Cannot read property 'map' of null
    at loadRecipes (C:\Users\Nubtastic\Documents\Code Stuff\recipe-generator-master\generator.js:28:27)
    at processTicksAndRejections (internal/process/task_queues.js:93:5)
(Use `node --trace-warnings ...` to show where the warning was created)
(node:10452) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside 
of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). To terminate the 
node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 1)
(node:10452) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
*/
