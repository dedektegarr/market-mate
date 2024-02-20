import mongoose from "mongoose";

export default mongoose
  .connect(process.env.MONGODB_URL + process.env.DB_NAME)
  .then(() => {
    console.log(`Connected to database`);
  })
  .catch((error) => console.log(error));
