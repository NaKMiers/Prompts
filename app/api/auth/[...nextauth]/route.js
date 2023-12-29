import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { connectToDB } from '@utils/database'

import UserModel from '@models/UserModel'

const handler = NextAuth({
   providers: [
      GoogleProvider({
         clientId: process.env.GOOGLE_ID,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
   ],
   callbacks: {
      async session({ session }) {
         const sessionUser = await UserModel.findOne({
            email: session.user.email,
         })

         session.user.id = sessionUser._id.toString()

         return session
      },
      async signIn({ profile }) {
         console.log('profile', profile)

         try {
            await connectToDB()

            // check if a user already exists
            const userExists = await UserModel.findOne({
               email: profile.email,
            })

            // if not, create a new user
            if (!userExists) {
               await UserModel.create({
                  email: profile.email,
                  username: profile.name
                     .replace(' ', '')
                     .toLowerCase(),
                  image: profile.picture,
               })
            }

            return true
         } catch (err) {
            console.log(err)
            return false
         }
      },
   },
})

export { handler as GET, handler as POST }
