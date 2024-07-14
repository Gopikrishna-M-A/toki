  import GoogleProvider from "next-auth/providers/google"
  import { MongoDBAdapter } from "@auth/mongodb-adapter"
  import clientPromise from "@/lib/mongodb"

  export const authOptions = {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
    ],
    adapter: MongoDBAdapter(clientPromise),
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      async session({ session, user }) {
        if (session?.user) {
          session.user.id = user.id;
          session.user.businessId = user.businessId;
        }
        return session;
      },
    },
    cookies: {
      sessionToken: {
        name: `next-auth.session-token`,
        options: {
          httpOnly: true,
          sameSite: 'lax',
          path: '/',
          secure: true
        }
      },
      // ... other cookie configurations
    },
  }
