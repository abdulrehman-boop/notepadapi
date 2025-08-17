import express from "express";
const app  = express();

app.get("/welcome",(req,res) => {
    res.send({
        message:"Welcome to our backend code",
    });
});
app.listen(5000,() =>{
    console.log("Server running....");
});