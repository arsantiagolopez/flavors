import mongoose from "mongoose";

const { model, Schema } = mongoose;

const UserAddressSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
    },
    street: {
      type: String,
      required: true,
    },
    lineTwo: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    postal: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const UserAddress = model("UserAddress", UserAddressSchema, "userAddresses");

export { UserAddress };
