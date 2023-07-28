import express, { Request, Response } from "express";
import cors from "cors";

const app = express()
app.use(cors())
app.use(express.json())
app.listen(3003, () => {
    console.log("Port 3003 connected.")
})
