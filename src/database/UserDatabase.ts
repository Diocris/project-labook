import { UsersDB } from "../types/types";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
    public static USERS_TABLE = "users"


    public async getUsers(q?: string): Promise<UsersDB[]> {

        let result: UsersDB[]
        if (q) {
            result = await BaseDatabase.connection(UserDatabase.USERS_TABLE).where({ id: q })
        } else {
            result = await BaseDatabase.connection(UserDatabase.USERS_TABLE)
        }

        return result

    }

    public async postUser(userDB: UsersDB): Promise<void> {
        await BaseDatabase.connection(UserDatabase.USERS_TABLE).insert(userDB)
    }

    public async editUser(idToEdit: string, userDB: UsersDB): Promise<void> {
        await BaseDatabase.connection(UserDatabase.USERS_TABLE).update(userDB).where({ id: idToEdit })
    }

    public async deleteUser(id: string): Promise<void> {
        await BaseDatabase.connection(UserDatabase.USERS_TABLE).del().where({ id })
    }


}