import mongoose from "mongoose";

const { model, Schema } = mongoose;

const AccountSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    provider: {
      type: String,
    },
    type: {
      type: String,
    },
    providerIdAccount: {
      type: String,
    },
    access_token: {
      type: String,
    },
    expires_at: {
      type: Number,
    },
    scope: {
      type: String,
    },
    token_type: {
      type: String,
    },
    i: {
      type: String,
    },
  },
  { timestamps: true }
);

const Account = model("Account", AccountSchema, "accounts");

export { Account };
