import z from 'zod'

const userZod = z.object({
  username: z.string().trim().min(3, { message: 'Must be 3 or more characters long' }).nonempty(),
  password: z.string().trim().min(3, { message: 'Must be 3 or more characters long' }).nonempty(),
})
type userZod = z.infer<typeof userZod>

export default userZod
