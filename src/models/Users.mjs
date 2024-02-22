import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: Boolean, required: false },
  address: { type: String, required: false },
  account: {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
});

const User = mongoose.model('User', UsersSchema);
export default User;