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
      lowercase: true,
    },
    emailVerified: {
      type: Date,
    },
    password: {
      type: String,
      minLength: [5, "Password must be at least 5 characters long."],
      maxLength: [100, "Password too long."],
    },
    // @todo: Change new fields to required
    username: {
      type: String,
      unique: true,
      // required: true,
      match: [
        /^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
        "Some characters are not accepted. Try a different username.",
      ],
      lowercase: true,
      minLength: 3,
      maxLength: 20,
    },
    phone: {
      type: String,
      unique: true,
    },
    isSeller: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = model("User", UserSchema, "users");

export { User };
