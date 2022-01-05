const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const { create } = require('./models/Recipe.model');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // // Run your code here, after you have insured that the connection was made
    const newRecipe = {
      "title": "La recette magique de Steven",
      "level": "Amateur Chef",
      "ingredients": [
        "1/2 cup rice vinegar",
        "5 tablespoons honey",
        "1/3 cup soy sauce (such as Silver Swan®)",
        "1/4 cup Asian (toasted) sesame oil",
        "3 tablespoons Asian chili garlic sauce",
        "3 tablespoons minced garlic",
        "salt to taste",
        "8 skinless, boneless chicken thighs"
      ],
      "cuisine": "Asian",
      "dishType": "main_course",
      "image": "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
      "duration": 40,
      "creator": "Chef LePapu"
    };
    // Recipe.create(newRecipe, (error, recipe) => {
    //   if (error) {
    //     console.log('An error happened:', error);
    //     return;
    //   }
    //   // console.log('The user is saved and its value is: ', recipe);
    //   console.log(newRecipe.title);
    // });

    // Recipe.insertMany(data)
    //   .then(recipes => recipes.forEach(elem => console.log("The recipe is saved and its title is:" + elem.title)))
    //   .catch(error => console.log('An error happened while saving a new user:', error));

    const query = { title: "Rigatoni alla Genovese" };
    // Recipe.findOneAndUpdate(query, { duration: 100 })
    //   .then(console.log("recipe updated"))
    //   .catch(error => console.log("an error occured", error));

    // Recipe.deleteOne({ title: "Carrot Cake" })
    //   .then(console.log("recipe deleted"))
    //   .catch(error => console.log("an error occured", error));

    // setTimeout(mongoose.connection.close(), 3000);

    console.log("Does something happen?");

    (async function launchAllCRUDPromises() {
      try {
        // let functionExected = await Recipe.create(newRecipe, (error, recipe) => {
        //   if (error) {
        //     console.log('An error happened:', error);
        //     return;
        //   }
        //   // console.log('The user is saved and its value is: ', recipe);
        //   console.log(newRecipe.title);
        // })

        await Recipe.create(newRecipe)
          .then(console.log("created recipe from Steven"))
          .catch(error => console.log("error", error));

        await Recipe.insertMany(data)
          .then(recipes => recipes.forEach(elem => console.log("The recipe is saved and its title is:" + elem.title)))
          .catch(error => console.log('An error happened while saving a new user:', error));


        await Recipe.findOneAndUpdate(query, { duration: 100 })
          .then(console.log("recipe updated"))
          .catch(error => console.log("an error occured", error));

        await Recipe.deleteOne({ title: "Carrot Cake" })
          .then(console.log("recipe deleted"))
          .catch(error => console.log("an error occured", error));

        await mongoose.connection.close()
          .then(console.log("connection close"))
          .catch(error => console.log("an error occured", error));

      } catch (err) {
        (console.log(err))
      }
    })();


    // Recipe.create(newRecipe)
    //   .then(() => {
    //     console.log("created recipe from Steven");
    //     Recipe.insertMany(data);
    //   })
    //   .then(recipes => {
    //     recipes.forEach(elem => console.log("The recipe is saved and its title is:" + elem.title))
    //     Recipe.findOneAndUpdate(query, { duration: 100 }).then(recipes )
    //   })
    //   .then(() => {
    //     console.log("recipe updated")
    //     Recipe.findOneAndUpdate(query, { duration: 100 })
    //   })
    //   .then(() => {
    //     console.log("recipe updated");
    //     Recipe.deleteOne({ title: "Carrot Cake" });
    //   })
    //   .then(() => {
    //     console.log("recipe deleted");
    //     mongoose.connection.close();
    //   })
    //   .then(console.log("connection close"))





  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });


// setTimeout(() => mongoose.connection.close(), 3000);

