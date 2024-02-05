import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dish",
    },
  ],
});

const Category = mongoose.model("Category", categorySchema);

export { Category };
