const express = require("express");
const multer = require("multer");

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

const upload = multer({
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png)$/)) {
      return cb(new Error("File must be an image"));
    }

    cb(undefined, true);
  }
});

router.post(
  "/recipes/:id/upload",
  upload.single("upload"),
  async (req, res) => {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body);
    recipe.img = req.file.buffer;
    await recipe.save();

    if (!recipe) {
      return res.status(404).send();
    }
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.get("/recipes/:id/img", async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id);

    if (!recipe) {
      return res.status(404).send();
    }

    res.set("Content-Type", "image");
    res.send(recipe.img);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/recipes/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).send();
    }

    res.send(recipe);
  } catch (e) {
    res.status(500).send();
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
