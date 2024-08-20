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

const SignInForm = ({}: EmailProps) => {
  const signInFormData = {
    name: 'SignIn',
    grid: 2,
    submit: {
      store: 'localStorage', // local Storage, session Storage, cookies
      key_name: 'name-form',
      endPoint: '/name-form',
      method: 'UPDATE' // INSERT, UPSERT, DELETE, UPDATE
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
        asterisk: true,
        size: 'md',
        color: 'default',
        shape: 'smooth',
        type: 'email',
        id: 'email',
        label: 'Email',
        name: 'email',
        placeholder: 'jenifer.lawrence@cdda.io',
        required: true,
        validation: {
          type: 'string',
          validations: {
            matches: {
              regex: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
              message: 'Invalid Email'
            }
          }
        }
      },
      {
        index: 3,
        widths: {
          default: '100%',
          greaterThan1440: '100%',
          between890And1440: '100%',
          between600And890: '100%'
        },
        // atom: false,
        asterisk: true,
        color: 'default',
        type: 'textarea',
        resize: 'false',
        shape: 'smooth',
        id: 'textarea',
        label: 'Description',
        name: 'description',
        placeholder: '********',
        // variant: 'L',
        // labelClass: 'text-[#64748B] text-sm',
        required: true
      },
      {
        index: 2,
        widths: {
          default: '100%',
          greaterThan1440: '100%',
          between890And1440: '100%',
          between600And890: '100%'
        },
        asterisk: true,
        size: 'md',
        color: 'default',
        shape: 'smooth',
        type: 'password',
        id: 'password',
        label: 'Password',
        name: 'password',
        placeholder: '*************',
        required: true,
        validation: {
          type: 'string',
          validations: {
            matches: {
              regex: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
              message:
                'Password must contain at least 8 characters, one number, one uppercase letter, and one special character !@#$%^&*'
            }
          }
        }
      },
      {
        index: 7,
        widths: {
          default: '100%',
          greaterThan1440: '100%',
          between890And1440: '100%',
          between600And890: '100%'
        },
        name: 'friends',
        label: 'Friends',
        required: true,
        tag: 'repeater',
        form: {
          name: 'Nested Test',
          grid: 4,
          items: [
            {
              index: 3,
              widths: {
                default: '100%',
                greaterThan1440: '100%',
                between890And1440: '100%',
                between600And890: '100%'
              },
              asterisk: true,
              size: 'md',
              color: 'default',
              shape: 'smooth',
              type: 'number',
              id: 'age',
              label: 'Friend age',
              name: 'f_age',
              placeholder: 'write your friend age',
              required: true
            },
            {
              index: 2,
              widths: {
                default: '100%',
                greaterThan1440: '100%',
                between890And1440: '100%',
                between600And890: '100%'
              },
              asterisk: true,
              size: 'md',
              color: 'default',
              shape: 'smooth',
              type: 'text',
              id: 'name',
              label: 'Friend Name',
              name: 'f_name',
              placeholder: 'write your friend name',
              required: true
            }
          ]
        },
        validation: {
          type: 'array',
          validations: {}
        }
      }
    ]
  };

  return (
    <section className={`w-full h-auto overflow-auto p-4`}>
      <h2 className="text-2xl leading-8 font-medium text-[#475569]">Sign In</h2>
      <p className="leading-6 pt-2 flex gap-2 text-[#64748B]">
        Don&apos;t have an account?
        <Link href="/signup" className="text-primary font-bold">
          Sign Up
        </Link>
      </p>

      {/* show alert message end  */}

      <DynamicForm formData={signInFormData}>
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

export default SignInForm;
