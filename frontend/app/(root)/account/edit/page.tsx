import { authConfig } from '@/auth.config';
import { SessionUser } from '@/lib/declaration';
import { getServerSession } from 'next-auth';

export default async function Page() {
  const session = await getServerSession(authConfig);

  const user = session?.user as SessionUser;

  return <div>Edit {user?.first_name}&apos;s profile</div>;
}
