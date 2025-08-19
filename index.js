import express from "express";
const app = express();
// Middleware to parse JSON body
app.use(express.json());

app.post("/login", (req, res) => {
  const { email, name, pass } = req.body;
  // Check if any field is missing
  if (!email || !name || !pass) {
    return res.status(400).send({
      success: false,
      message: "Please fill all fields (email, name, password).",
    });
  }
  // Check if email contains '@gmail.com'
  if (!email.includes("@gmail.com")) {
    return res.status(400).send({
      success: false,
      message: "Email must be a valid Gmail address (e.g. example@gmail.com).",
    });
  }
  // If all validations pass
  res.send({
    success: true,
    message: "Login successful",
    data: {
      email,
      name,
      pass,
    },
  });
});
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
// http://localhost:5000/login