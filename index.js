import express from "express"; 
import mongoose from "mongoose"; 
import bodyParser from "body-parser"; 
import cors from "cors"; 
import Users from "./models/users.js"; 
import Notes from "./models/notes.js"; 

const app = express(); 
app.use(cors()); 
app.use(bodyParser.json()); 

// ✅ Connect to MongoDB using environment variable 
mongoose.connect( 
    "mongodb+srv://abdulrehman:awes@cluster0.ojozblg.mongodb.net/notepad", 
    { useNewUrlParser: true, useUnifiedTopology: true } 
).then(() => console.log("✅ Connected to MongoDB")) 
.catch(err => console.error("❌ MongoDB connection error:", err)); 

// ------------------- APIs ------------------- 

// Root route (so / doesn’t show “Cannot GET /”) 
app.get("/", (req, res) => { 
    res.send("🚀 Notepad API is running on Vercel"); 
}); 

// Register User 
app.post("/users", async (req, res) => { 
    try { 
        const { username, email, password } = req.body; 
        const exists = await Users.findOne({ email }); 
        if (exists) { 
            return res.status(400).json({ message: "Email already exists" }); 
        } 
        const user = await Users.create({ username, email, password }); 
        res.json({ message: "User  created", user }); 
    } catch (err) { 
        res.status(500).json({ message: "Something went wrong" }); 
    } 
}); 

// Create Note 
app.post("/notes", async (req, res) => { 
    try { 
        const { userId, title, content } = req.body; 
        const note = await Notes.create({ userId, title, content }); 
        res.json({ message: "Note created", note }); 
    } catch (err) { 
        res.status(500).json({ message: "Something went wrong" }); 
    } 
}); 

// Get Notes by User 
app.get("/notes/:userId", async (req, res) => { 
    try { 
        const notes = await Notes.find({ userId: req.params.userId }); 
        res.json(notes); 
    } catch (err) { 
        res.status(500).json({ message: "Something went wrong" }); 
    } 
}); 

// ✅ Export app instead of app.listen (for Vercel) 
export default app; 
