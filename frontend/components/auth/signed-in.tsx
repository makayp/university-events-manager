import { auth } from '@/auth';

export default async function SignedIn({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  console.log(session);

  if (!session) {
    console.log('No session ');
    return null;
  }

  return children;
}
