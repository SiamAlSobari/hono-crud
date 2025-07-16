import { db } from "../../common/utils/database"
import { registerInput } from "../schema/auth-schema"

const register = async (input:registerInput) => {
    const createUser = await db.user.create({
        data: {
            email: input.email,
            password: input.password,
            profile: {
                create: {
                    name: input.name
                }
            }
        },
    })
}


export const authService = {
    register
}