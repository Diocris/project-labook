import { UserModel } from "../models/User"
import { UserDatabase } from "../database/UserDatabase"
import { User } from "../models/User"
import { UsersDB } from "../types/types"
import { IdGenerator } from "../services/idGenerator"
import { SignupInputDTO, SignupOutputDTO } from "../dtos/signup.dto"
import { TokenManager, TokenPayLoad, USER_ROLES } from "../services/TokenManager"
import { BadRequest } from "../errors/BadRequestError"
import { GetUsersInputDTO, GetUsersOutputDTO } from "../dtos/getUsers.dto"
import { HashManager } from "../services/HashManager"

export class UserBusiness {
    constructor(private userDatabase: UserDatabase, private IdGenerator: IdGenerator, private tokenManager: TokenManager, private hashManager: HashManager) {

    }
    public getUsers = async (input: GetUsersInputDTO): Promise<GetUsersOutputDTO> => {
        const { q, token } = input

        const payload = this.tokenManager.getPayLoad(token)

        if (payload === null) {
            throw new BadRequest("Token inválido.")
        }

        if (payload.role !== USER_ROLES.ADMIN) {
            throw new BadRequest("Only Admins can use this function.")
        }

        const usersDB = await this.userDatabase.getUsers(q)

        const users = usersDB.map((userDB) => {
            const user = new User(
                userDB.id,
                userDB.name,
                userDB.email,
                userDB.password,
                userDB.role,
                userDB.created_at
            )

            return user.toBusinessModel()
        })

        const output: GetUsersOutputDTO = users

        return output
    }

    public signUp = async (input: SignupInputDTO): Promise<SignupOutputDTO> => {
        const { name, email, password, role } = input


        if (typeof name !== "string") {
            throw new Error("Name must be a string.")
        }
        if (typeof email !== "string") {
            throw new Error("Email must be a string.")
        }
        if (typeof password !== "string") {
            throw new Error("Password must be a string.")
        }
        if (typeof role !== "string") {
            throw new Error("Role must be a string.")
        }

        const id = this.IdGenerator.generate()

        const hashedPassword = await this.hashManager.hash(password)

        const userDatabase = new UserDatabase()
        const [userDBExist] = await userDatabase.getUsers(id)

        if (userDBExist) {
            throw new Error("Id already registered, try another one.")
        }

        const newUser = new User(id, name, email, hashedPassword, role, new Date().toISOString())

        const newUserDB: UsersDB = {
            id: newUser.getId(),
            name: newUser.getName(),
            email: newUser.getEmail(),
            password: newUser.getPassword(),
            role: newUser.getRole(),
            created_at: newUser.getCreatedAt()
        }
        await userDatabase.postUser(newUserDB)

        const tokenPayLoad: TokenPayLoad = {
            id: newUser.getId(),
            name: newUser.getName(),
            role: USER_ROLES.NORMAL
        }

        const token = this.tokenManager.createToken(tokenPayLoad)



        const output: any = {
            message: "User successful registered.",
            token
        }

        return output

    }



    public login() {

    }

    public editUser = async (idToEdit: string, input: any) => {

        const { id, name, email, password, role } = input

        if (id !== undefined) {
            if (typeof id !== "string") {
                throw new Error("Id must be a string.")
            }
        }
        if (name !== undefined) {
            if (typeof name !== "string") {
                throw new Error("Name must be a string.")
            }
        }
        if (email !== undefined) {
            if (typeof email !== "string") {
                throw new Error("Email must be a string.")
            }
        }

        if (password !== undefined) {
            if (typeof password !== "string") {
                throw new Error("Password must be a string.")
            }
        }

        if (role !== undefined) {
            if (typeof role !== "string") {
                throw new Error("Role must be a string.")
            }
        }



        const userDatabase = new UserDatabase()
        const [userDBExist] = await userDatabase.getUsers(idToEdit)

        if (!userDBExist) {
            throw new Error("User not found")
        }


        const editUser: User = new User(
            userDBExist.id,
            userDBExist.name,
            userDBExist.email,
            userDBExist.password,
            userDBExist.role,
            userDBExist.created_at
        )

        editUser.setId(id)
        editUser.setName(name)
        editUser.setEmail(email)
        editUser.setPassword(password)
        editUser.setRole(role)


        const editUserDB: UsersDB = {
            id: editUser.getId(),
            name: editUser.getName(),
            email: editUser.getEmail(),
            password: editUser.getPassword(),
            role: editUser.getRole(),
            created_at: editUser.getCreatedAt()

        }
        await userDatabase.editUser(idToEdit, editUserDB)

        const output: any = {
            message: "User successful edited.",
            user: editUserDB
        }

        return output


    }
}