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
        <div className='space-y-28 [&_input]:shadow-none lg:[&_input]:max-w-xl [&_input]:bg-white'>
          <div className='space-y-5'>
            <h3 className='text-xl font-medium'>Update User Info</h3>
            <UpdateUserData user={user} />
          </div>
          <div className='space-y-5'>
            <h3 className='text-xl font-medium'>Update Password</h3>
            <ChangePassword />
          </div>
        </div>
      </div>
    </section>
  );
}
