const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  ingridients: { type: Array, default: [], required: true },
  time: { type: String },
  portionsNumber: { type: Number },
  steps: { type: Array, default: [], required: true }
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
