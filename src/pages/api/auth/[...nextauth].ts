import bcrypt from 'bcrypt';
import UserModel from 'lib/models/User.model';
import dbConnect from 'lib/mongodb';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        try {
          await dbConnect();
        } catch (e) {
          console.log(e);
        }
        const user = await UserModel.findOne({
          username: credentials?.username,
        });
        if (!user) {
          throw new Error('No user found with the email');
        }
        const checkPassword: boolean = await bcrypt.compare(
          credentials?.password as string,
          user.password
        );
        if(!checkPassword){
          throw new Error("Password doesn`t match")
        }
        return { id:user._id,name: user.username };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    // Here you can define your own custom pages for login, recover password, etc.
    signIn: '/login', // we are going to use a custom login page (we'll create this in just a second)
  },
};
export default NextAuth(authOptions);
