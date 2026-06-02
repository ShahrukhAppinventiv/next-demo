import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { LOGIN_USER_CREDENDTIAL } from "@/app/constants/loginUserCred";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {},
        password: {},
      },

     async authorize(credentials) {

  const email = credentials?.email;
  const password = credentials?.password;

  const user = LOGIN_USER_CREDENDTIAL.find(
    (user) => user.email === email
  );

  if (!user) {
    throw new Error("Invalid credentials");
  }

  if (user.password !== password) {
    throw new Error("Invalid credentials");
  }

  return {
    id: user.email,
    name: user.name,
    email: user.email,
    accessToken: "CUSTOM_TOKEN_123",
  };
}
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    /*
      SAVE TOKEN INSIDE JWT
    */
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
      }

      if (user) {
        token.accessToken = (user as any).accessToken;

        token.name = user.name;

        token.email = user.email;
      }

      return token;
    },

    /*
      EXPOSE TOKEN TO CLIENT
    */
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;


      session.user.name = token.name as string;

      session.user.email = token.email as string;

      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST};
