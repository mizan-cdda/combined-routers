import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '../../Dialog/Dialog';
import BaseParagraph from '../../base-paragraph/BaseParagraph';
import { ReIcon } from '@/components/ReIcon/ReIcon';

const CoFounderModal = ({ isOpen, onClose, onSubmit }) => {


  // Initialize Formik with initial values and validation schema
  const formik = useFormik({
    initialValues: {
      firstName: '',
      middleName: '',
      lastName: '',
      phoneNumber: '',
      emailAddress: ''
    },
    onSubmit: (values) => {
      onSubmit(values);
      onClose();
    }
  });

  if (!isOpen) return null;

  return (
    <Dialog>
    {/* Modal open dialog */}
    <DialogTrigger>
      <button
        type="button"
        className="flex items-center gap-x-2 group bg-green-100 font-medium py-2 px-4 rounded-lg transition-transform transform hover:scale-105 hover:bg-green-200"
      >
        <BaseParagraph
          className="group-hover:opacity-100 duration-500 text-primary"
          size="xs"
          lead="normal"
        >
          + Add a Co-Founder
        </BaseParagraph>
      </button>
    </DialogTrigger>
    {/* Modal content */}
    <DialogContent className="bg-white rounded-md">
      {/* Modal close dialog */}
      <div className="w-full flex items-center justify-between gap-4 p-3">
        <BaseParagraph size="md" weight="semibold">
          {/* {modalTitle} */} Hello modal
        </BaseParagraph>
        <DialogClose>
          <button
            type="button"
            className="text-muted-400 hover:text-red-500 duration-200 z-50"
          >
            <ReIcon iconName="AiOutlineClose" />
          </button>
        </DialogClose>
      </div>
      {/* content */}
      <div className="px-3 pb-3">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas quae ducimus,
        laboriosam harum voluptate assumenda numquam perferendis id enim repellat.
      </div>
    </DialogContent>
  </Dialog>
  );
};

export default CoFounderModal;
