import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';

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
        const testUser = {
          id: '12345',
          first_name: 'Jane',
          last_name: 'Doe',
          email: 'jane@email.com',
          image:
            'https://res.cloudinary.com/denbrnoaj/image/upload/v1721705266/nextjs-course-mutations/hyot7deg8hk5xfwdbz6w.jpg',
          password: 'jane123',
          accessToken: 'test',
        };

        if (
          credentials?.email !== testUser.email ||
          credentials?.password !== testUser.password
        )
          return null;

        const { password, ...user } = testUser;

        return user;
      },
    }),
  ],
});
