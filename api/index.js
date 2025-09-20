import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";   
import Users from "./users.js";
import Notes from "./notes.js";
const app = express();
app.use(bodyParser.json());
app.use(cors());
if (!global.mongoose) {
  global.mongoose = mongoose.connect(
    "mongodb+srv://abdulrehman:awes@cluster0.ojozblg.mongodb.net/notepad",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));
}
app.get("/", (req, res) => {
  res.send("🚀 Notepad API is running on Vercel");
});

app.post("/users", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const exists = await Users.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const user = await Users.create({ username, email, password });
    res.json({ message: "User created", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});
app.post("/notes", async (req, res) => {
  try {
    const { userId, title, content } = req.body;
    const note = await Notes.create({ userId, title, content });
    res.json({ message: "Note created", note });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});
app.get("/notes/:userId", async (req, res) => {
  try {
    const notes = await Notes.find({ userId: req.params.userId });
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});
export default app;
