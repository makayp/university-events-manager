import { auth } from '@/auth';

export default async function SignedIn({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    console.log('No session ');
    return null;
  }

  return children;
}
