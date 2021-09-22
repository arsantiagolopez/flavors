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
  },
  { timestamps: true }
);

const UserProfile = model("UserProfile", UserProfileSchema, "userProfiles");

export { UserProfile };
