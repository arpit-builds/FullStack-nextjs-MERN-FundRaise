import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import mongoose from "mongoose"
import User from "@/models/User"
import Payment from "@/models/Payment"
import connectDb from "@/db/connectDb"
// import AppleProvider from "next-auth/providers/apple"
// import FacebookProvider from "next-auth/providers/facebook"
// import GoogleProvider from "next-auth/providers/google"
// import TwitterProvider from "next-auth/providers/twitter"

const authOptions = NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      httpOptions: {
        timeout: 15000 // 15 seconds
      }
    }),

  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account.provider == "github") {
        // connect to the database
        await connectDb()
        // check if the user already exists in the database
        const currentUser = await User.findOne({ email: user.email })
        if (!currentUser) {
          // create a new user
          const newUser = await User.create({
            email: user.email,
            username: user.email.split("@")[0]
          })
          await newUser.save()
        }
        return true
      }
    },
    async session({ session, user, token }) {
      const dbUser = await User.findOne({ email: session.user.email })
      session.user.name = dbUser.username
      return session
    }
  }
})

export { authOptions as GET, authOptions as POST }