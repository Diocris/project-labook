import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { userRouter } from "./router/userRouter";
dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
app.listen(Number(process.env.PORT || 3003), () => {
    console.log(`Port ${process.env.PORT} connected.`)
})

app.use("/users", userRouter)

