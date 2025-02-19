import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
        maxAge: 60 * 60
    },
    providers: [
        Google({
            clientId: process.env.CLIENT_ID || "",
            clientSecret: process.env.CLIENT_SECRET || "",
            authorization: {
                params: {
                    scope: "openid email profile https://www.googleapis.com/auth/calendar",
                    response_type: 'code',
                    prompt: "consent"
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, trigger, account })  {
            if(account || (trigger === "update" && account)){
                token.accessToken = account.access_token;
            }
            return token;
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken;
            return session;
        }
    }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };