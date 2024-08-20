'use client';
import Link from 'next/link';
import DynamicForm from '@/components/Preview/DynamicForm/DynamicForm';
import Button from '@/components/Preview/ui/button/Button';

type EmailProps = {
  element?: string;
  placeholder?: string;
  checkExist?: boolean;
  id?: string;
  label?: string;
  api?: string;
  disabled?: boolean;
  name?: string;
  errors?: string;
  value?: string;
  variant?: string;
  asterisk?: boolean;
  className?: string;
};

const Profile = ({}: EmailProps) => {
  const profileFormData = {
    name: 'Profile',
    grid: 2,
    submit: {
      store: 'localStorage', // local Storage, session Storage
      key_name: 'change-form',
      endPoint: '/change-form',
      method: 'INSERT' // UPSERT, DELETE, UPDATE
    },
    items: [
      {
        index: 1,
        widths: {
          default: '100%',
          greaterThan1440: '100%',
          between890And1440: '100%',
          between600And890: '100%'
        },
        type: 'email',
        asterisk: true,
        id: 'email',
        label: 'Email',
        name: 'email',
        placeholder: 'Enter Email',
        variant: 'L',
        className: 'w-full',
        labelClass: 'text-sm',
        required: true,
        validation: {
          type: 'string',
          validations: {
            matches: {
              regex: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
              message: 'Invalid Email'
            },
            min: {
              value: 5,
              message: 'Password must be at least 5 characters long'
            }
          }
        }
      },
      {
        index: 2,
        widths: {
          default: '100%',
          greaterThan1440: '100%',
          between890And1440: '100%',
          between600And890: '100%'
        },
        type: 'checkbox',
        color: 'primary',
        shape: 'smooth',
        label: <span className="text-sm">Is Married</span>,
        className: '',
        size: 'sm',
        name: 'isMarried'
      },
      {
        index: 3,
        widths: {
          default: '100%',
          greaterThan1440: '100%',
          between890And1440: '100%',
          between600And890: '100%'
        },
        type: 'text',
        name: 'spouse_name',
        label: 'Spouse Name',
        variant: 'M',
        labelClass: 'text-sm',
        placeholder: 'Spouse name',
        className: 'bg-red-900',
        asterisk: true,
        depends: {
          name: 'isMarried',
          operator: 'eq',
          value: true
        },
        validation: {
          type: 'string',
          validations: {
            minLength: {
              value: 10,
              message: 'Description must be at least 10 characters long'
            },
            maxLength: {
              value: 50,
              message: 'Description must be at most 50 characters long'
            }
          }
        }
      }
    ]
  };
  return (
    <section className={`w-full h-auto overflow-auto p-4`}>
      <h2 className="text-2xl leading-8 font-medium text-[#475569]">Profile</h2>

      {/* show alert message end  */}

      <DynamicForm formData={profileFormData}>
        <Button
          type="submit"
          // className="w-full col-span-2 bg-primary leading-6 text-white font-medium bg-gray-700"
          className="col-span-full"
          color="success"
        >
          Submit
        </Button>
      </DynamicForm>
    </section>
  );
};

export default Profile;
