import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  userId:   { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
  title:    { type: String, required: true },
  content:  { type: String, required: true },
  createdAt:{ type: Date, default: Date.now },
});

export default mongoose.model("Notes", noteSchema);
