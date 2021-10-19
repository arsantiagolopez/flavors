import mongoose from "mongoose";

const { model, Schema } = mongoose;

const UserProfileSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    image: {
      type: String,
    },
    bio: {
      type: String,
    },
    geolocation: {
      type: { type: String },
      coordinates: [Number],
    },
    address: {
      type: String,
    },
    // Name can only be changed twice a month
    dateFirstChangeName: {
      type: Date,
    },
    countChangeName: {
      type: Number,
      default: 0,
    },
    onboardPercentage: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const UserProfile = model("UserProfile", UserProfileSchema, "userProfiles");

export { UserProfile };
