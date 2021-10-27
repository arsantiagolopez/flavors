import mongoose from "mongoose";

const { model, Schema } = mongoose;

const PlateSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image: {
      type: String,
    },
    title: {
      type: String,
    },
    category: {
      type: String,
    },
    subCategory: {
      type: String,
    },
    price: {
      type: Number,
    },
    description: {
      type: String,
    },
    tags: [
      {
        type: String,
      },
    ],
    menu: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const Plate = model("Plate", PlateSchema, "plates");

export { Plate };
