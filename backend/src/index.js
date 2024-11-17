import express from "express";
import dotenv from "dotenv"

import userRoutes from "./routes/user.route.js"
import adminRoutes from "./routes/admin.route.js"
import authRoutes from "./routes/auth.route.js"
import songRoutes from "./routes/song.route.js"
import albumRoutes from "./routes/album.route.js"
import statRoutes from "./routes/stat.route.js"
import { connectDB } from "./lib/db.js";
import fileUpload from "express-fileupload"
import path from "path"
import { clerkMiddleware } from '@clerk/express'
import cors from "cors"

dotenv.config()
const __dirname=path.resolve()

const app=express();
const PORT= process.env.PORT
app.use(cors(
    {
        origin:"http://localhost:3000",
        credentials:true
    }
))
app.use(express.json())
app.use(clerkMiddleware())


app.use("/api/users",userRoutes)
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:path.join(__dirname,"tmp"),
    createParentPath:true,
    limits:{
        fileSize:10*1024*1024
    }
}))

app.use("/api/admin",adminRoutes)
app.use("/api/auth",authRoutes)
app.use("/api/songs",songRoutes)
app.use("/api/albums",albumRoutes)
app.use("/api/stats",statRoutes)

app.use((err,req,res,next)=>{
    res.status(500).json({message:process.env.NODE_ENV==="production"?"Internal server error":err.message})
})

app.listen(PORT,()=>{
    console.log("server is running on port "+PORT)
    connectDB()
})