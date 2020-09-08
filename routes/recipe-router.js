const express = require("express");
const Recipe = require("../models/recipe-model");

const router = new express.Router();

router.post("/recipe", async (req, res) => {
  const recipe = new Recipe({
    ...req.body
  });

  try {
    await recipe.save();
    res.status(201).send(recipe);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/recipes", async (req, res) => {
  try {
    const allRecipes = await Recipe.find({});

    res.send(allRecipes);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
