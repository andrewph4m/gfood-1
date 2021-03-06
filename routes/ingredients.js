const router = require("express").Router();
const mongoose = require("mongoose");
let Ingredient = require("../models/ingredient.model");

const ingredients_url = "https://gfood-api.azurewebsites.net/ingredients/";

router.route("/").get((req, res) => {
  Ingredient.find()
    .select("name hsr ghg energy")
    .then((docs) => {
      const response = {
        count: docs.length,
        ingredients: docs.map((doc) => {
          return {
            name: doc.name,
            hsr: doc.hsr,
            ghg: doc.ghg,
            energy: doc.energy,
            _id: doc._id,
            request: {
              type: "GET",
              url: ingredients_url + doc._id,
            },
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.route("/add").post((req, res) => {
  const newIngredient = new Ingredient({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    description: req.body.description,
    hsr: req.body.hsr,
    ghg: req.body.ghg,
    energy: req.body.energy,
    protein: req.body.protein,
    sodium: req.body.sodium,
    sugar: req.body.sugar,
    saturated_fat: req.body.saturated_fat,
    fibre: req.body.fibre,
    product_id: req.body.product_id,
    category_id: req.body.category_id,
    carbohydrate: req.body.carbohydrate,
  });

  newIngredient
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Ingredient Added",
        addedIngredient: {
          name: result.name,
          _id: result._id,
          request: {
            type: "GET",
            url: ingredients_url + result._id,
          },
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.route("/:id").get((req, res) => {
  Ingredient.findById(req.params.id)
    .then((docs) => {
      console.log(docs);
      if (docs) {
        res.status(200).json(docs);
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.route("/:id").delete((req, res) => {
  Ingredient.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(200).json({
        message: "Ingredient deleted",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.route("/update/:id").put((req, res) => {
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }

  Ingredient.update({ _id: req.params.id }, { $set: updateOps })
    .then((docs) => {
      console.log(docs);
      res.status(200).json({
        message: "Ingredient updated",
        request: {
          type: "GET",
          url: ingredients_url + req.params.id,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
