import { UsersDB } from "../types/types";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
    public static USERS_TABLE = "users"

    //
    //Get Users
    //
    public async getUsers(id?: string): Promise<UsersDB[]> {

        let result: UsersDB[]
        if (id !== undefined) {
            result = await BaseDatabase.connection(UserDatabase.USERS_TABLE).where({ id: id })
        } else {
            result = await BaseDatabase.connection(UserDatabase.USERS_TABLE)
        }

        return result

    }


    //
    //Get User by Email
    //
    public async getUserByEmail(email: string): Promise<UsersDB> {
        const [result] = await BaseDatabase.connection(UserDatabase.USERS_TABLE).where({ email: email })
        return result
    }

    //
    //Create User
    //
    public async createUser(userDB: UsersDB): Promise<void> {
        await BaseDatabase.connection(UserDatabase.USERS_TABLE).insert(userDB)
    }


    //
    //Edit User
    //
    public async editUser(idToEdit: string, userDB: UsersDB): Promise<void> {
        await BaseDatabase.connection(UserDatabase.USERS_TABLE).update(userDB).where({ id: idToEdit })
    }

    //
    //Delete User
    //
    public async deleteUser(email: string): Promise<void> {
        await BaseDatabase.connection(UserDatabase.USERS_TABLE).del().where({ email: email })
    }


}