import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { FieldError } from 'react-hook-form';

export default function PasswordValidation({
  password,
  errors,
}: {
  password: string;
  errors: FieldError | undefined;
}) {
  const [passwordRequirements, setPasswordRequirements] = useState({
    minLength: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });

  useEffect(() => {
    setPasswordRequirements({
      minLength: password.trim().length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      specialChar: /[!@#$%^&*()]/.test(password),
    });
  }, [password]);

  return (
    <ul className='text-sm mt-2 space-y-1 text-gray-600'>
      <li
        className={clsx({
          'text-green-600': passwordRequirements.minLength,
          'text-destructive': !passwordRequirements.minLength && errors,
        })}
      >
        • At least 8 characters long
      </li>
      <li
        className={clsx({
          'text-green-600': passwordRequirements.uppercase,
          'text-destructive': !passwordRequirements.uppercase && errors,
        })}
      >
        • At least one uppercase letter
      </li>
      <li
        className={clsx({
          'text-green-600': passwordRequirements.lowercase,
          'text-destructive': !passwordRequirements.lowercase && errors,
        })}
      >
        • At least one lowercase letter
      </li>
      <li
        className={clsx({
          'text-green-600': passwordRequirements.number,
          'text-destructive': !passwordRequirements.number && errors,
        })}
      >
        • At least one number
      </li>
      <li
        className={clsx({
          'text-green-600': passwordRequirements.specialChar,
          'text-destructive': !passwordRequirements.specialChar && errors,
        })}
      >
        • At least one special character (!@#$%^&*())
      </li>
    </ul>
  );
}
