import { Request, Response } from "express"
import { UserBusiness } from "../business/UserBusiness"
import { SignupSchema } from "../dtos/signup.dto"
import { GetUsersSchema } from "../dtos/getUsers.dto"
import { LoginSchema } from "../dtos/login.dto"
import { UserDatabase } from "../database/UserDatabase"
import { NotFoundError } from "../errors/NotFoundError"
import { DeleteSchema } from "../dtos/deleteUser.dto"



export class UserController {
    constructor(private userBusiness: UserBusiness) {

    }
    public getUsers = async (req: Request, res: Response) => {
        try {
            const input = GetUsersSchema.parse({
                q: req.query.q as string | undefined,
                token: req.headers.authorization
            })


            const output = await this.userBusiness.getUsers(input)

            res.status(200).send(output)

        } catch (error: any) {
            if (res.statusCode === 20) {
                res.status(500)
            }
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Unexpected error.")
            }
        }

    }

    public createUser = async (req: Request, res: Response) => {
        try {
            const input = SignupSchema.parse({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                role: req.body.role,
            })


            const output = await this.userBusiness.signUp(input)

            res.status(201).send(output)


        } catch (error: any) {
            if (res.statusCode === 200) {
                res.status(500)
            }
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Unexpected error.")
            }
        }
    }


    public login = async (req: Request, res: Response) => {
        try {
            const input = LoginSchema.parse({
                email: req.body.email,
                password: req.body.password
            })

            const output = await this.userBusiness.login(input)
            res.status(200).send(output)
        } catch (error: any) {
            if (res.statusCode === 200) {
                res.status(500)
            }
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Unexpected error.")
            }
        }

    }


    public deleteID = async (req: Request, res: Response): Promise<void> => {
        try {
            const input = DeleteSchema.parse({
                email: req.params.email
            })

            const output = await this.userBusiness.deleteUser(input)

            res.status(200).send(output)


        } catch (error: any) {

            if (res.statusCode === 200) {
                res.status(500)
            }
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Unexpected error.")
            }
        }
    }
}