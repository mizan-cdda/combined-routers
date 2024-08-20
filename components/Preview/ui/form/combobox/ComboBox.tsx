'use client';
import React, { type InputHTMLAttributes, type FC, Fragment, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import type { VariantProps } from 'class-variance-authority';
import { inputVariants } from '../../variants/input-variants';
import Loader from '../../loader/Loader';
import Avatar from '../../avatar/Avatar';
import { ReIcon } from '@/components/ReIcon/ReIcon';

interface ComboBoxItem {
  id?: string;
  name: string;
  icon?: string;
  image?: string;
}

export interface ComboBoxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'color'>,
    VariantProps<typeof inputVariants> {
  label?: string;
  multiple?: boolean;
  error?: string;
  value?: any;
  selected: any;
  setSelected: any;
  disabled?: boolean;
  loading?: boolean;
  items?: ComboBoxItem[] | any[];
  classNames?: string;
}

const ComboBox: FC<ComboBoxProps> = ({
  value,
  selected,
  setSelected,
  label,
  size = 'md',
  color = 'default',
  shape = 'smooth',
  disabled,
  loading = false,
  items = [],
  classNames,
  error,
  ...props
}) => {
  const [query, setQuery] = useState('');

  const filteredItems =
    query === ''
      ? items
      : items.filter((item) =>
          item.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  return (
    <div className={`relative w-full ${classNames}`}>
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          {!!label && <label className="font-sans text-[.85rem] text-muted-400">{label}</label>}
          <div className="relative z-0 w-full font-sans">
            <Combobox.Input
              className={inputVariants({
                size,
                color,
                shape,
                className: `peer relative text-start
                ${size === 'sm' && selected?.icon ? 'pe-2 ps-8' : ''}
                ${size === 'md' && selected?.icon ? 'pe-3 ps-10' : ''}
                ${size === 'lg' && selected?.icon ? 'pe-4 ps-12' : ''}
                ${size === 'sm' && selected?.image ? 'pe-2 ps-8' : ''}
                ${size === 'md' && selected?.image ? 'pe-3 ps-11' : ''}
                ${size === 'lg' && selected?.image ? 'pe-4 ps-12' : ''}
                ${size === 'sm' && !selected?.icon ? 'px-2' : ''}
                ${size === 'md' && !selected?.icon ? 'px-3' : ''}
                ${size === 'lg' && !selected?.icon ? 'px-4' : ''}
                ${size === 'sm' && !selected?.image ? 'px-2' : ''}
                ${size === 'md' && !selected?.image ? 'px-3' : ''}
                ${size === 'lg' && !selected?.image ? 'px-4' : ''}
                ${error ? '!border-error-500' : ''}
                ${disabled ? '!pointer-events-none !cursor-not-allowed !opacity-50' : ''}
                ${
                  loading
                    ? 'pointer-events-none !text-transparent !shadow-none placeholder:!text-transparent !select-none'
                    : ''
                }
              `
              })}
              displayValue={(item: any) => item.name}
              onChange={(event) => setQuery(event.target.value)}
              {...props}
            />
            <div
              className={`absolute start-0 top-0 z-0 flex items-center justify-center text-muted-400 transition-colors duration-300 peer-focus-visible:text-primary-500 dark:text-muted-500 
                ${size === 'sm' ? 'h-8 w-8' : ''} 
                ${size === 'md' ? 'h-10 w-10' : ''} 
                ${size === 'lg' ? 'h-12 w-12' : ''}`}
            >
              {!!selected?.icon && !selected?.image ? (
                <ReIcon
                  iconName={selected?.icon}
                  className={`
                    ${size === 'sm' ? 'h-3 w-3' : ''} 
                    ${size === 'md' ? 'h-4 w-4' : ''} 
                    ${size === 'lg' ? 'h-5 w-5' : ''}
                    ${error ? '!text-error-500' : ''}
                  `}
                />
              ) : (
                ''
              )}
              {!!selected?.image && !selected?.icon ? (
                <Avatar
                  src={selected?.image}
                  text={selected?.name.substring(0, 1)}
                  size={size === 'lg' ? 'xxs' : 'xxxs'}
                />
              ) : (
                ''
              )}
            </div>
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
            <Combobox.Button
              className={`peer:focus-visible:[&>svg]:rotate-180 absolute end-0 top-0 flex items-center justify-center
                ${size === 'sm' ? 'h-8 w-8' : ''} 
                ${size === 'md' ? 'h-10 w-10' : ''} 
                ${size === 'lg' ? 'h-12 w-12' : ''}
                ${loading ? '!pointer-events-none !text-transparent !opacity-0 !select-none' : ''}
              `}
            >
              <ReIcon
                iconName="MdOutlineKeyboardArrowUp"
                className="h-4 w-4 text-muted-400 transition-transform duration-300"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options
              className={`slimscroll absolute z-0 mt-1 w-full overflow-auto border !p-2 text-base shadow-lg shadow-muted-300/30 ring-1 ring-primary-500 ring-opacity-5 focus:outline-none dark:shadow-muted-800/20 sm:text-sm
                ${shape === 'rounded' ? 'rounded-md' : ''}
                ${shape === 'smooth' ? 'rounded-lg' : ''}
                ${shape === 'rounded' ? 'rounded-md' : ''}
                ${shape === 'curved' ? 'rounded-xl' : ''}
                ${shape === 'full' ? 'rounded-xl' : ''}
                ${
                  color === 'default'
                    ? 'border-muted-200 bg-white dark:border-muted-700 dark:bg-muted-800'
                    : ''
                }
                ${
                  color === 'contrast'
                    ? 'border-muted-200 bg-white dark:border-muted-800 dark:bg-muted-950'
                    : ''
                }
                ${
                  color === 'muted'
                    ? 'border-muted-200 bg-white dark:border-muted-700 dark:bg-muted-800'
                    : ''
                }
                ${
                  color === 'mutedContrast'
                    ? 'border-muted-200 bg-white dark:border-muted-800 dark:bg-muted-950'
                    : ''
                }
              `}
            >
              {filteredItems.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredItems.map((item) => (
                  <Combobox.Option
                    key={item.id}
                    className={({ active }) =>
                      `relative flex cursor-default select-none items-center gap-2 p-2 transition-colors duration-300 
                      ${
                        active
                          ? 'bg-primary-500/10 text-primary-700 dark:bg-primary-500/20'
                          : 'text-muted-600 dark:text-muted-400'
                      }
                      ${shape === 'rounded' ? 'rounded-md' : ''}
                      ${shape === 'smooth' ? 'rounded-lg' : ''}
                      ${shape === 'rounded' ? 'rounded-md' : ''}
                      ${shape === 'curved' ? 'rounded-xl' : ''}
                      ${shape === 'full' ? 'rounded-xl' : ''}
                    `
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        {!!item?.icon && !item?.image ? (
                          <span className={`pointer-events-none flex items-center justify-center`}>
                            <ReIcon
                              iconName={item?.icon}
                              className="h-5 w-5 text-muted-400 transition-colors duration-300"
                              aria-hidden="true"
                            />
                          </span>
                        ) : (
                          ''
                        )}
                        {!!item?.image && !item?.icon ? (
                          <Avatar src={item?.image} text={item?.name.substring(0, 1)} size="xxs" />
                        ) : (
                          ''
                        )}
                        <span
                          className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                        >
                          {item.name}
                        </span>
                        {selected ? (
                          <span
                            className={`relative z-0 ms-auto flex items-center pe-2 text-primary-600 ${
                              active ? '' : ''
                            }`}
                          >
                            <ReIcon iconName="GoCheck" className="h-4 w-4" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default ComboBox;
