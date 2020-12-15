import mongoose from "mongoose"

export default async () => {
  await mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser: true, useUnifiedTopology: true});
    const db = mongoose.connection;
    db.on("error", () => console.log("connection error:"));
    db.once("open", () => {
      // we're connected!
      console.log(`MongoDB connected on  ${process.env.MONGODB_URI}`);
      console.log(`###########################################################################`);
    });
}