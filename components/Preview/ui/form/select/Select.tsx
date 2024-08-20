/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, type FC, type SelectHTMLAttributes } from 'react';
import type { VariantProps } from 'class-variance-authority';
import { selectVariants } from '../../variants/select-variants';
import Loader from '../../loader/Loader';
import { ReIcon } from '@/components/ReIcon/ReIcon';

interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size' | 'color'>,
    VariantProps<typeof selectVariants> {
  label?: string;
  icon?: string;
  error?: string;
  loading?: boolean;
  options?: string[] | { label: string; value: string }[];
  availableDataAPI?: string;
  containerClasses?: string;
  formik?: any;
}

const Select: FC<SelectProps> = ({
  label,
  options = [],
  icon,
  color = 'default',
  shape,
  size = 'md',
  error,
  loading = false,
  className: classes = '',
  containerClasses = '',
  availableDataAPI,
  formik,
  ...props
}) => {
  const [updadtedOptions, setUpdatedOptions] = useState(options);

  useEffect(() => {
    if (availableDataAPI && options?.length === 0) {
      fetch(availableDataAPI)
        .then((response) => response.json())
        .then((data) => {
          const fetchedOptions = data.map((d) => d.username);
          setUpdatedOptions(fetchedOptions);

          if (formik && fetchedOptions.length > 0) {
            formik.setFieldValue(props.name, fetchedOptions[0]);
          }
        });
    } else if (options.length > 0) {
      setUpdatedOptions(options);
      if (formik) {
        formik.setFieldValue(props.name, options[0]);
      }
    }
  }, []);

  if (!Array.isArray(updadtedOptions)) {
    throw new Error('options must be an array!');
  }

  const transformedOptions = updadtedOptions.map((option) =>
    typeof option === 'string' ? { label: option, value: option } : option
  );
  return (
    <div className={`w-full font-sans ${containerClasses}`}>
      {!!label && <label className="font-sans text-[.85rem] text-muted-400">{label}</label>}
      <div className="relative">
        <div
          className={`group relative inline-block w-full after:pointer-events-none after:absolute after:end-[1.125em] after:top-1/2 after:z-[4] after:block after:h-[.625em] after:w-[.625em] after:rounded-[2px] after:border-b-[3px] after:border-s-[3px] after:border-muted-400 after:transition-all after:duration-300 after:content-[''] after:[transform:scale(0.8)_rotate(-45deg)] focus-within:after:[transform:scale(0.8)_rotate(-225deg)]
            ${size === 'sm' ? 'after:-mt-[.4575em] focus-within:after:top-[60%]' : ''}
            ${size === 'md' ? 'after:-mt-[.4575em] focus-within:after:top-[60%]' : ''}
            ${size === 'lg' ? 'after:-mt-[.4575em] focus-within:after:top-[60%]' : ''}
            ${loading ? 'after:!border-transparent pointer-events-none' : ''}
        `}
        >
          <select
            className={selectVariants({
              size,
              color,
              shape,
              className: `peer 
                ${classes}
                ${size === 'sm' && icon ? 'ps-8 !py-1' : ''}
                ${size === 'md' && icon ? 'ps-10' : ''}
                ${size === 'lg' && icon ? 'ps-12' : ''}
                ${size === 'sm' && !icon ? 'ps-2 !py-1' : ''}
                ${size === 'md' && !icon ? 'ps-3' : ''}
                ${size === 'lg' && !icon ? 'ps-4' : ''}
                ${error ? '!border-danger-500' : ''}
                ${loading ? '!text-transparent !shadow-none !select-none' : ''}
              `
            })}
            {...props}
          >
            {transformedOptions.map((opt, i) => (
              <option key={i} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {!!icon ? (
          <div
            className={`absolute start-0 top-0 flex items-center justify-center text-muted-400 transition-colors duration-300 peer-focus-visible:text-primary-500 dark:text-muted-500 
            ${size === 'sm' ? 'h-8 w-8' : ''} 
            ${size === 'md' ? 'h-10 w-10' : ''} 
            ${size === 'lg' ? 'h-12 w-12' : ''}`}
          >
            <ReIcon
              iconName={icon}
              className={`
              ${size === 'sm' ? 'h-3 w-3' : ''} 
              ${size === 'md' ? 'h-4 w-4' : ''} 
              ${size === 'lg' ? 'h-5 w-5' : ''}
              ${error ? '!text-danger-500' : ''}
            `}
            />
          </div>
        ) : (
          ''
        )}
        {!!loading ? (
          <div
            className={`absolute end-0 top-0 z-0 flex items-center justify-center text-muted-400 transition-colors duration-300 peer-focus-visible:text-primary-500 dark:text-muted-500 
            ${size === 'sm' ? 'h-8 w-8' : ''} 
            ${size === 'md' ? 'h-10 w-10' : ''} 
            ${size === 'lg' ? 'h-12 w-12' : ''}`}
          >
            <Loader
              classNames={`dark:text-muted-200
                ${
                  color === 'muted' || color === 'mutedContrast'
                    ? 'text-muted-400'
                    : 'text-muted-300'
                }
              `}
              size={20}
              thickness={4}
            />
          </div>
        ) : (
          ''
        )}
        {!!error ? (
          <span className="mt-0.5 block font-sans text-[0.75rem] text-danger-500">{error}</span>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default Select;
