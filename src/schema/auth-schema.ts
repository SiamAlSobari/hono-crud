import z from "zod";

 const register = z.object({
    name: z.string(),
    email : z.string().email(),
    password: z.string(),
})

const login = z.object({
    email: z.string(),
    password: z.string(),
})


export const authSchema = {
    register,
    login
}
export type registerInput = z.infer<typeof register>
export type loginInput = z.infer<typeof login>
