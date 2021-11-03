import mongoose from "mongoose";

const { model, Schema } = mongoose;

const ScheduleSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isActive: {
      type: Boolean,
    },
    days: [
      {
        day: {
          type: String,
          required: true,
        },
        isOpen: {
          type: Boolean,
          default: false,
        },
        openTime: {
          type: String,
        },
        closeTime: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

const Schedule = model("Schedule", ScheduleSchema, "schedules");

export { Schedule };
