import express from "express"

export const userRouter = express.Router()

import { UserController } from "../controllers/UserController"
import { UserBusiness } from "../business/UserBusiness"
import { UserDatabase } from "../database/UserDatabase"
import { IdGenerator } from "../services/idGenerator"
import { TokenManager } from "../services/TokenManager"
import { HashManager } from "../services/HashManager"

const userControllerr = new UserController(new UserBusiness(new UserDatabase(), new IdGenerator(), new TokenManager(), new HashManager()))

userRouter.get("/", userControllerr.getUsers)
userRouter.post("/", userControllerr.createUser)
userRouter.put("/:id", userControllerr.editUser)
userRouter.delete("/:id")