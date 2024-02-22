import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: Boolean, required: false },
  address: { type: String, required: false },
  accountId: { type: String, required: true, unique: true },
});

const User = mongoose.model("User", UsersSchema);
export default User;
