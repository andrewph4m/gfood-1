const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const mealSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    name: { type: String, required: true, unique: true },
    description: { type: String },
    energy: { type: Number },
    ghg: { type: Number },
    hsr: { type: Number },
    ingredients: [
      {
        ingredient: {
          type: Schema.Types.ObjectId,
          ref: "Ingredient",
          required: true,
        },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  {
    timestamps: true,
  }
);

mealSchema.plugin(uniqueValidator);

const Meal = mongoose.model("Meal", mealSchema);

module.exports = Meal;
