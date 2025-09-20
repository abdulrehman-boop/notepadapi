import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
});
const Users = mongoose.models.Users || mongoose.model("Users", userSchema);
export default Users;

