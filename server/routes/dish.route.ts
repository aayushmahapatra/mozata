// userRoutes.js
import express from "express";
import { Dish } from "../models/dish.model";
import isAuthenticated from "../middlewares/authorization.middleware";

const router = express.Router();

// Create a new dish
router.post("/add", isAuthenticated(), async (req, res) => {
  try {
    const { name, description, price, restaurant } = req.body;

    const newDish = new Dish({
      name,
      description,
      price,
      restaurant,
    });

    const savedDish = await newDish.save();
    res.status(201).json(savedDish);
  } catch (error) {
    console.error("Error adding dish:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Search dishes by name or description
router.get("/search", isAuthenticated(), async (req, res) => {
  try {
    const keyword = req.query.keyword;

    if (!keyword) {
      return res.status(400).json({ error: "Keyword is required for search" });
    }

    const regex = new RegExp(String(keyword), "i"); // Case-insensitive search

    const searchResults = await Dish.find({
      $or: [{ name: { $regex: regex } }],
    });

    res.status(200).json(searchResults);
  } catch (error) {
    console.error("Error searching dishes:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all dishes
router.get("/all", isAuthenticated(), async (req, res) => {
  try {
    const dishes = await Dish.find().populate("restaurant");
    res.status(200).json(dishes);
  } catch (error) {
    console.error("Error getting dishes:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get a single dish by ID
router.get("/:id", isAuthenticated(), async (req, res) => {
  try {
    const dishId = req.params.id;
    const dish = await Dish.findById(dishId).populate("restaurant");

    if (!dish) {
      return res.status(404).json({ error: "Dish not found" });
    }

    res.status(200).json(dish);
  } catch (error) {
    console.error("Error getting dish:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a dish by ID
router.delete("/:id", isAuthenticated(), async (req, res) => {
  try {
    const dishId = req.params.id;
    const deletedDish = await Dish.findByIdAndDelete(dishId);

    if (!deletedDish) {
      return res.status(404).json({ error: "Dish not found" });
    }

    res.status(200).json({ message: "Dish deleted successfully" });
  } catch (error) {
    console.error("Error deleting dish:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
