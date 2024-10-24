import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';

export default NextAuth({
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
        const testUser = {
          id: Date.now() + '',
          first_name: 'Jane',
          last_name: 'Doe',
          email: 'jane@email.com',
          image: '/avatar',
          password: 'jane123',
          accessToken: 'test',
        };

        if (
          credentials?.email !== testUser.email ||
          credentials?.password !== testUser.password
        )
          throw new Error('Invalid credentials');

        const { password, ...user } = testUser;

        return user;
      },
    }),
  ],
});
