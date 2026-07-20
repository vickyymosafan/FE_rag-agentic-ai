import NextAuth from "next-auth"
import Credentials from "@auth/core/providers/credentials"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "mahasiswa@univ.ac.id" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials as {
          email: string
          password: string
        }

        if (email === "admin@univ.ac.id" && password === "admin123") {
          return { id: "1", name: "Admin", email, role: "admin" }
        }
        if (email === "user@univ.ac.id" && password === "user123") {
          return { id: "2", name: "Mahasiswa", email, role: "user" }
        }

        return null
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.role = (user as { role: string }).role
        token.id = user.id
      }
      return token
    },
    session: ({ session, token }) => {
      if (session.user) {
        session.user.role = token.role as string
        session.user.id = token.id as string
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
})
