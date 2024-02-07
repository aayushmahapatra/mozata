import express from "express";
import { Restaurant } from "../models/restaurant.model";
import isAuthenticated from "../middlewares/authorization.middleware";

const router = express.Router();

// create a new restaurant
router.post("/add", isAuthenticated(), async (req, res) => {
  try {
    const { name, description, cuisine, address, menu } = req.body;

    const newRestaurant = new Restaurant({
      name,
      description,
      cuisine,
      address,
      menu,
    });

    const savedRestaurant = await newRestaurant.save();
    res.status(201).json(savedRestaurant);
  } catch (error) {
    console.error("Error adding restaurant:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// get all restaurants
router.get("/all", isAuthenticated(), async (_req, res) => {
  try {
    const restaurants = await Restaurant.find().populate("menu");
    res.status(200).json(restaurants);
  } catch (error) {
    console.error("Error getting restaurants:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// get a single restaurant by ID
router.get("/:id", isAuthenticated(), async (req, res) => {
  try {
    const restaurantId = req.params.id;
    const restaurant = await Restaurant.findById(restaurantId).populate("menu");

    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    res.status(200).json(restaurant);
  } catch (error) {
    console.error("Error getting restaurant:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// delete a restaurant by ID
router.delete("/:id", isAuthenticated(), async (req, res) => {
  try {
    const restaurantId = req.params.id;
    const deletedRestaurant = await Restaurant.findByIdAndDelete(restaurantId);

    if (!deletedRestaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    res.status(200).json({ message: "Restaurant deleted successfully" });
  } catch (error) {
    console.error("Error deleting restaurant:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
