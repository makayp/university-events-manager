import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { getUser } from './lib/user-data';
import { DBUser } from './lib/declaration';

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,

  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'example@brandonu.ca',
        },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          const res = await fetch(`${process.env.SERVER_ENDPOINT}/auth/login`, {
            method: 'POST',
            body: JSON.stringify({
              email,
              password,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          });

          const data = await res.json();

          if (res.status == 401) {
            console.log(data);
            return null;
          }

          if (res.ok && data.token) {
            const token = data.token;

            const user = await getUser(token);

            if (!user) return null;

            return { ...user, accessToken: token };
          }
        } catch (error) {
          console.log(error);
          throw new Error('error');
        }

        return null;
      },
    }),
  ],
});
