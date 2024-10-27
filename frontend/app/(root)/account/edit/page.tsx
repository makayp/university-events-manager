import { auth } from '@/auth';

export default async function Page() {
  const session = await auth();

  const user = session?.user;

  return <div>Edit {user?.first_name}&apos;s profile</div>;
}
