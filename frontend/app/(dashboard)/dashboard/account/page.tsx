import {
  ChangePassword,
  UpdateUserData,
} from '@/components/update-account-form';

export default function Page() {
  const user = {
    email: 'emmanuel@email.com',
    first_name: 'Emmanuel',
    last_name: 'Pop',
    image_url: '',
  };
  return (
    <section>
      <div className='space-y-10'>
        <h1 className='text-2xl font-medium'>Update Account</h1>
        <div className='space-y-28 [&_input]:shadow-none'>
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
        </div>
      </div>
    </section>
  );
}
