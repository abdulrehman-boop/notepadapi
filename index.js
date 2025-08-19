import express from "express";

const app = express();
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("API is live! Use POST /login endpoint.");
});

// Login route
app.post("/login", (req, res) => {
  const { email, name, pass } = req.body;
  if (!email || !name || !pass) {
    return res.status(400).send({
      success: false,
      message: "Please fill all fields (email, name, password).",
    });
  }
  if (!email.includes("@gmail.com")) {
    return res.status(400).send({
      success: false,
      message: "Email must be a valid Gmail address (e.g. example@gmail.com).",
    });
  }
  res.send({
    success: true,
    message: "Login successful",
    data: { email, name, pass },
  });
});

// Use dynamic port for Vercel
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
