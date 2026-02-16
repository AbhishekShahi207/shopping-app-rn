import express from "express"
import path from "path"
import { clerkMiddleware } from '@clerk/express'
import { ENV } from "./config/env.js"
import { connectDb } from "./config/db.js"

const app=express()
const __dirname=path.resolve()

app.use(clerkMiddleware()) //it adds auth object to every req

app.get("/api/health",(req,res)=>{
    res.json({message:"App is rung "})
})

//deployement 
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../admin/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../admin", "dist", "index.html"));
  });
}

app.listen(ENV.PORT,()=>{
  connectDb()
    console.log("Server is Runing")
})