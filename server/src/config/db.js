import mongoose from "mongoose";

const InitiateMongoServer = async () => {
  try {
    if (process.env.NODE_ENV === "production") {
      await mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected to production database.");
    } else {
      await mongoose.connect(process.env.DATABASE_URL_TEST, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected to development database.");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export { InitiateMongoServer };
