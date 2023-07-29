import express, { Request, Response } from "express";
import cors from "cors";

const app = express()
app.use(cors())
app.use(express.json())
app.listen(3003, () => {
    console.log("Port 3003 connected.")
})


app.get("/ping", async (req: Request, res: Response) => {
    try {

        res.status(200).send("working!")

    } catch (error: any) {
        if (req.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Unexpected error.")
        }
    }
})