import mongoose from "mongoose";

const { model, Schema } = mongoose;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please add a valid email address.",
      ],
    },
    emailVerified: {
      type: Date,
    },
    password: {
      type: String,
      minLength: [5, "Password must be at least 5 characters long."],
      maxLength: [100, "Password too long."],
    },
  },
  { timestamps: true }
);

const User = model("User", UserSchema, "users");

export { User };
