import mongoose from "mongoose";

const { model, Schema } = mongoose;

const SessionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sessionToken: {
      type: String,
    },
    expires: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Session = model("Session", SessionSchema, "sessions");

export { Session };
