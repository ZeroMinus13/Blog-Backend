import z from 'zod'
import sanitizeHtml from 'sanitize-html'

const userZod = z.object({
  username: z
    .string()
    .trim()
    .min(3, { message: 'Username must be 3 or more characters long' })
    .max(15, { message: 'Username must be 15 or less characters long' })
    .nonempty()
    .transform((value) => sanitizeHtml(value)),
  password: z
    .string()
    .trim()
    .min(3, { message: 'Password must be 3 or more characters long' })
    .max(15, { message: 'Password must be 15 or less characters long' })
    .nonempty()
    .transform((value) => sanitizeHtml(value)),
})

const blogZod = z.object({
  title: z
    .string()
    .trim()
    .min(3, { message: 'Title must be 3 or more characters long' })
    .max(25, { message: 'Title must be 25 or less characters long' })
    .nonempty()
    .transform((value) => sanitizeHtml(value)),
  content: z
    .string()
    .trim()
    .min(3, { message: 'Content must be 3 or more characters long' })
    .max(500, { message: 'Content must be 500 or less characters long' })
    .nonempty()
    .transform((value) => sanitizeHtml(value)),
})

const commentsZod = z.object({
  username: z
    .string()
    .trim()
    .min(3, { message: 'Username must be 3 or more characters long' })
    .max(20, { message: 'Username must be 20 or less characters long' })
    .nonempty()
    .transform((value) => sanitizeHtml(value)),
  content: z
    .string()
    .trim()
    .min(3, { message: 'Content must be 3 or more characters long' })
    .max(500, { message: 'Content must be 500 or less characters long' })
    .nonempty()
    .transform((value) => sanitizeHtml(value)),
})
export default { userZod, blogZod, commentsZod }
