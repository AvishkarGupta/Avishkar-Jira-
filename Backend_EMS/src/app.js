import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoutes.js"
import taskRouter from "./routes/taskRouter.js"
import commentRouter from "./routes/commentRouter.js"
import filterRouter from "./routes/filterRouter.js"

const app = express()

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}))
// app.use(JSON.parse(json))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true, limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


app.use("/api/users", userRouter)
app.use("/api/task", taskRouter)
app.use("/api/comment", commentRouter)
app.use("/api/filter", filterRouter)


export default app;