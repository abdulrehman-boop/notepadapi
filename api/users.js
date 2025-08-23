import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});

// ✅ Export it as default
const User = mongoose.model("User", userSchema);
export default User;
