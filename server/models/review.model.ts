import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
  },
  // You can have a reference to either Restaurant or Dish, depending on where the review is left
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
  },
  dish: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Dish",
  },
});

const Review = mongoose.model("Review", reviewSchema);

export { Review };
