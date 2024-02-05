import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  cuisine: {
    type: String,
    required: true,
  },
  address: {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
  },
  menu: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dish",
    },
  ],
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

export { Restaurant };
