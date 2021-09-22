import mongoose from "mongoose";

const { model, Schema } = mongoose;

const TempUserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      /**
       * @todo: Look for an updated 2021 email regex validation
       */
      match: [
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please add a valid email address.",
      ],
    },
    code: {
      type: String,
      required: true,
    },
    emailCount: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  { timestamps: true }
);

const TempUser = model("TempUser", TempUserSchema, "tempUsers");

export { TempUser };
