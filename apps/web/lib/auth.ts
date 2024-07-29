import CredentialsProvider from "next-auth/providers/credentials";
import db from "@repo/db/client";
import bcrypt from "bcrypt";
import { AuthOptions } from "next-auth";

export const authOptions : AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
       
        if(!credentials?.username || !credentials?.password){
          throw new Error ('Invalid Credentials');
        }

        const user = await db.user.findUnique({
          where: {
            username : credentials.username
          }
        });
        if(!user || !user?.hashedPassword){
          throw new Error('Invalid Credentials');
        }
        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        ) ;

        if(!isCorrectPassword){
          throw new Error ('Invalid Credentials');
        }
        return {
          id : user.id.toString(),
          username : user.username
        }
      },
    }),
  ],
  debug: process.env.NODE_ENV ==='development',
  session :  {
    strategy : "jwt"
  },
  secret : process.env.NEXTAUTH_SECRET,
};
