import { getUser } from '@/lib/user-data';
import { ChangePassword, UpdateUserData } from './update-account-form';

export default async function AccountUpdateForm() {
  const user = await getUser();

  if (!user) return <p>Something went wrong!</p>;

  return (
    <div className='rounded-xl bg-gray-50 p-2 pt-4 md:p-4 space-y-10'>
      <div className='space-y-5'>
        <h3 className='text-xl font-medium md:ml-2'>Update User Info</h3>
        <div className='bg-white p-4 md:p-6 rounded-xl'>
          <UpdateUserData user={user} />
        </div>
      </div>

      <div className='space-y-5'>
        <h3 className='text-xl font-medium'>Update Password</h3>
        <div className='bg-white p-4 md:p-6 rounded-xl'>
          <ChangePassword />
        </div>
      </div>
    </div>
  );
}
