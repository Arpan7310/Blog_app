
import express from "express";
import mongoose from "mongoose";
import blogRouter from "./routes/blog-routes";
import router from "./routes/user-routes";
const app=express();


app.use(express.json());
app.use("/api/user",router);
app.use("/api/blog",blogRouter);
mongoose.connect(
    'mongodb+srv://Arpan:password1234@cluster0.5mztn43.mongodb.net/?retryWrites=true&w=majority',).then(res=>{
    app.listen(9000)
    console.log("Arpan + server is listening ");
    }
).then(res=>{
console.log("hello");
}).catch(res=>{
  console.log(res);
  console.log("njkcvn");
})





