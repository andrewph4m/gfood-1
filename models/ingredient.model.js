const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ingredientSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    name: { type: String, required: true },
    description: { type: String },
    hsr: { type: Number },
    ghg: { type: Number },
    energy: { type: Number, required: true },
    protein: { type: Number, required: true },
    sodium: { type: Number, required: true },
    sugar: { type: Number, required: true },
    saturated_fat: { type: Number, required: true },
    fibre: { type: Number, required: true },
    product_id: { type: Number, required: true },
    category_id: { type: String, required: true },
    carbohydrate: { type: Number },
  },
  {
    timestamps: true,
  }
);

const Ingredient = mongoose.model("Ingredient", ingredientSchema);

module.exports = Ingredient;
