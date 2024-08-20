'use client';
import React, { useState, useCallback, useEffect } from 'react';
import { ReIcon } from '@/components/ReIcon/ReIcon';
import Progress from '../../progress/Progress';
import { useDropzone } from 'react-dropzone';
import IconBox from '../../iconbox/IconBox';
import Button from '../../button/Button';

// Define the props interface for the InputFile component
export interface InputFileProps {
  id: string;
  url: string;
  acceptedFileTypes?: string[];
  maxFileSize?: number;
  allowMultiple?: boolean;
  label?: string;
  labelAlt?: string;
  shape?: 'straight' | 'rounded' | 'smooth' | 'curved' | 'full';
  color?:
    | 'default'
    | 'contrast'
    | 'muted'
    | 'mutedContrast'
    | 'primary'
    | 'info'
    | 'success'
    | 'warning'
    | 'danger'
    | 'none';
  bordered?: boolean;
  spaced?: boolean;
  responses?: any;
  setResponses?: any;
}

// Define the interface for file status
export interface FileStatus {
  name: string;
  progress: number;
  status: 'uploading' | 'success' | 'error';
  message?: string;
}

export default function InputFile(props: InputFileProps) {
  // Destructure props with default values
  const {
    id,
    url,
    acceptedFileTypes,
    maxFileSize = 5,
    allowMultiple = false,
    label = '',
    labelAlt = '',
    shape = 'smooth',
    color = 'contrast',
    bordered = false,
    spaced = true,
    responses,
    setResponses
  } = props;

  const [files, setFiles] = useState<FileStatus[]>([]);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [oversizedFiles, setOversizedFiles] = useState<string[]>([]);

  // Callback function to handle file drop
  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    const newFiles = acceptedFiles.map((file) => ({
      name: file.name,
      progress: 0,
      status: 'uploading' as const
    }));
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    acceptedFiles.forEach(uploadFile);

    // Handle oversized files
    const oversized = rejectedFiles
      .filter((file) => file.errors[0]?.code === 'file-too-large')
      .map((file) => file.file.name);
    setOversizedFiles(oversized);
  }, []);

  // Configure dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes
      ? acceptedFileTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {})
      : undefined,
    maxSize: maxFileSize * 1024 * 1024,
    multiple: allowMultiple,
    onDropRejected: (rejectedFiles) => {
      const oversized = rejectedFiles
        .filter((file) => file.errors[0]?.code === 'file-too-large')
        .map((file) => file.file.name);
      setOversizedFiles(oversized);
    }
  });

  // Function to handle file upload
  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) throw new Error('Upload failed. Please try again.');
      const responseData = await response.json();

      setFiles((prevFiles) =>
        prevFiles.map((f) =>
          f.name === file.name
            ? { ...f, progress: 100, status: 'success', response: responseData }
            : f
        )
      );

      setResponses((prevResponses: any) => [...prevResponses, responseData]); // Add the response to the responses state

      if (files.every((f) => f.status === 'success')) {
        setUploadComplete(true);
      }
    } catch (error) {
      setFiles((prevFiles) =>
        prevFiles.map((f) =>
          f.name === file.name
            ? { ...f, status: 'error', message: 'Upload failed. Please try again.' }
            : f
        )
      );
    }
  };

  // Function to reset the uploader state
  const resetUploader = () => {
    setFiles([]);
    setUploadComplete(false);
    setResponses([]);
    setOversizedFiles([]);
  };

  // Updated the uploader state
  useEffect(() => {
    setResponses(files);
  }, [files]);

  console.log('response-------------', responses, files);

  return (
    <div
      className={`flex w-full flex-col gap-4
      ${bordered && color === 'default' ? 'border border-muted-200 dark:border-muted-700' : ''}
      ${bordered && color === 'contrast' ? 'border border-muted-200 dark:border-muted-800' : ''}
      ${bordered && color === 'muted' ? 'border border-muted-200 dark:border-muted-700' : ''}
      ${bordered && color === 'mutedContrast' ? 'border border-muted-200 dark:border-muted-800' : ''}
      ${shape === 'rounded' ? 'rounded-md' : ''}
      ${shape === 'smooth' ? 'rounded-lg' : ''}
      ${shape === 'curved' ? 'rounded-xl' : ''}
      ${shape === 'full' ? 'rounded-xl' : ''}
      ${color === 'default' ? 'bg-white dark:bg-muted-800' : ''}
      ${color === 'contrast' ? 'bg-white dark:bg-muted-950' : ''}
      ${color === 'muted' ? 'bg-muted-100 dark:bg-muted-800' : ''}
      ${color === 'mutedContrast' ? 'bg-muted-100 dark:bg-muted-950' : ''}
    `}
    >
      <div className="w-full">
        <label className={`block pb-3 pt-6 ${spaced ? 'px-6' : ''}`}>
          <span className="block text-sm text-muted-500 dark:text-muted-400">{label}</span>
          <span className="block text-xs text-muted-500 dark:text-muted-400">{labelAlt}</span>
        </label>

        <div className={`group ${spaced ? 'px-6' : ''}`}>
          <div
            {...getRootProps()}
            className={`relative border-2 border-dashed border-muted-300 bg-muted-50 p-5 dark:border-muted-700 dark:bg-muted-800
            ${shape === 'rounded' ? 'rounded-md' : ''}
            ${shape === 'smooth' ? 'rounded-lg' : ''}
            ${shape === 'curved' ? 'rounded-xl' : ''}
            ${shape === 'full' ? 'rounded-xl' : ''}
          `}
          >
            <input {...getInputProps()} />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              className="mx-auto mb-4 h-14 w-14 text-muted-400 transition-colors duration-300 group-hover:text-primary-500"
            >
              <g fill="none" stroke="currentColor" strokeLinejoin="round">
                <path d="M2 14.5A4.5 4.5 0 0 0 6.5 19h12a3.5 3.5 0 0 0 .5-6.965a7 7 0 0 0-13.76-1.857A4.502 4.502 0 0 0 2 14.5Z" />
                <path strokeLinecap="round" d="m14 11l-2-2m0 0l-2 2m2-2v6" />
              </g>
            </svg>
            <div className="mx-auto flex max-w-xs flex-col text-center">
              <p className="text-sm text-muted-500 dark:text-muted-400">
                {isDragActive
                  ? 'Drop the files here ...'
                  : "Drag 'n' drop some files here, or click to select files"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={`flex flex-col-reverse gap-2 overflow-x-auto mb-4 ${spaced ? 'px-6' : ''}`}>
        {oversizedFiles.length > 0 && (
          <div className="text-xs text-error-500 mb-2">
            The following file(s) exceed the maximum size of {maxFileSize}MB:
            <ul className="list-disc list-inside">
              {oversizedFiles.map((file) => (
                <li key={file}>{file}</li>
              ))}
            </ul>
          </div>
        )}
        {files.map((file) => (
          <div key={file.name} className="flex flex-col gap-1 text-xs">
            <p className="text-muted-500 dark:text-muted-400">{file.name}</p>
            <div
              className={`flex h-6 items-center gap-2 rounded-full border border-muted-200 dark:border-muted-700 pl-2  py-3 overflow-hidden ${file.status !== 'success' && 'pr-2'} ${file.status !== 'success' && 'pr-4'}`}
            >
              {file.status === 'success' && (
                <div className="mr-2">
                  <ReIcon iconName="AiFillCheckCircle" className="-me-3 h-4 w-4 text-success-500" />
                </div>
              )}
              <Progress size="xs" value={file.progress} />
              {file.status === 'success' && (
                <div className="flex gap-2 pr-2">
                  <button>
                    <ReIcon iconName="CgEye" className="h-4 w-4 text-primary-500" />
                  </button>
                  <button
                    onClick={() => {
                      setFiles((prevFiles: any) =>
                        prevFiles.filter((f: any) => f.name !== file.name)
                      );
                    }}
                  >
                    <ReIcon iconName="AiOutlineClose" className="h-4 w-4 text-error-500" />
                  </button>
                </div>
              )}
              {file.status === 'error' && (
                <ReIcon
                  iconName="AiOutlinePlusCircle"
                  className="-me-3 h-5 w-5 rotate-45 text-error-500"
                />
              )}
            </div>
            {file.status === 'error' && (
              <p className="font-normal text-xs text-error-500 mb-2">{file.message}</p>
            )}
          </div>
        ))}
      </div>

      {uploadComplete && (
        <div className={`flex flex-col gap-2 py-3 ${spaced ? 'px-6' : ''}`}>
          <div className="mt-3 w-full text-center">
            <IconBox
              icon="AiOutlineCheckCircle"
              variant="pastel"
              color="success"
              className="mx-auto mb-2"
            />
            <h3 className="mb-1 text-base font-light text-muted-800 dark:text-muted-100">
              Upload Complete
            </h3>
            <p className="mx-auto max-w-[320px] text-sm text-muted-500 dark:text-muted-400">
              Great, your file{allowMultiple ? 's were' : ' was'} successfully uploaded.
            </p>
          </div>
        </div>
      )}

      {(uploadComplete || files.length > 0 || oversizedFiles.length > 0) && (
        <div className={`pb-6 ${spaced ? 'px-6' : ''}`}>
          <Button
            shape={shape}
            color="muted"
            type="button"
            className="w-full"
            onClick={resetUploader}
          >
            Upload Again
          </Button>
        </div>
      )}
    </div>
  );
}

// --------------------------------------------------------------------------------------------------------------------

// 'use client';
// import React, { useState, type ChangeEvent, useRef } from 'react';
// import Button from '../../button/Button';
// import { ReIcon } from '@/components/ReIcon/ReIcon';
// import IconBox from '../../iconbox/IconBox';
// import Progress from '../../progress/Progress';

// export interface InputFileProps {
//   id: string;
//   acceptedFileTypes?: string[] | null;
//   url: string;
//   maxFileSize?: number;
//   allowMultiple?: boolean;
//   label?: string;
//   labelAlt?: string;
//   shape?: 'straight' | 'rounded' | 'smooth' | 'curved' | 'full';
//   color?:
//     | 'default'
//     | 'contrast'
//     | 'muted'
//     | 'mutedContrast'
//     | 'primary'
//     | 'info'
//     | 'success'
//     | 'warning'
//     | 'danger'
//     | 'none';
//   bordered?: boolean;
//   spaced?: boolean;
// }

// export default function InputFile(props: InputFileProps) {
//   const {
//     id,
//     acceptedFileTypes,
//     url,
//     maxFileSize = 5,
//     allowMultiple = false,
//     label = '',
//     labelAlt = '',
//     shape = 'smooth',
//     color = 'contrast',
//     bordered = false,
//     spaced = true
//   } = props;

//   const MAX_FILE_BYTES = maxFileSize * 1024 * 1024; // MB to bytes

//   // Change the state structure to handle multiple file progress and status
//   const [fileProgress, setFileProgress] = useState<{ [key: string]: number }>({});
//   const [fileStatus, setFileStatus] = useState<{ [key: string]: string }>({});
//   const [uploadError, setUploadError] = useState<string | null>(null);
//   const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
//   const [uploadWarning, setUploadWarning] = useState<boolean>(false);

//   const isError = Object.values(fileStatus).some((status) => status !== 'Uploaded');

//   // Create a ref for the file input
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const resetUploader = () => {
//     setFileProgress({});
//     setFileStatus({});
//     setUploadError(null);
//     setUploadSuccess(false);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
//   };

//   const fileSelectedHandler = (event: ChangeEvent<HTMLInputElement>) => {
//     setUploadError(null); // reset the upload error when a new file is selected
//     if (event.target.files) {
//       const files = Array.from(event.target.files);
//       let isValid = true; // Flag to check if all files are valid
//       let fileErrors: { [key: string]: string } = {};

//       for (const file of files) {
//         if (file.size > MAX_FILE_BYTES) {
//           fileErrors[file.name] = `File size cannot exceed ${maxFileSize} MB`;
//           isValid = false;
//         }
//         if (acceptedFileTypes && !acceptedFileTypes.includes(file.type)) {
//           fileErrors[file.name] =
//             'File type not accepted. Accepted types: ' + acceptedFileTypes.join(', ');
//           isValid = false;
//         }
//       }

//       if (!isValid) {
//         setFileStatus(fileErrors);
//       } else {
//         files.forEach((file) => {
//           setFileProgress((prev) => ({ ...prev, [file.name]: 0 }));
//           fileUploadHandler(file);
//         });
//       }
//     }
//   };

//   const fileUploadHandler = (file: File) => {
//     const formData = new FormData();
//     formData.append('uploads', file);

//     const xhr = new XMLHttpRequest();
//     xhr.open('POST', url, true);

//     xhr.upload.addEventListener('progress', (event) => {
//       if (event.lengthComputable) {
//         const progress = Math.round((event.loaded / event.total) * 100);
//         setFileProgress((prev) => ({ ...prev, [file.name]: progress }));
//       }
//     });

//     xhr.addEventListener('readystatechange', () => {
//       if (xhr.readyState === 4) {
//         if (xhr.status === 200) {
//           setFileStatus((prev) => ({ ...prev, [file.name]: 'Uploaded' }));
//           setUploadSuccess(true);
//         } else {
//           setFileStatus((prev) => ({
//             ...prev,
//             [file.name]: 'Error while uploading the file. Server response: ' + xhr.statusText
//           }));
//         }
//       }
//     });

//     xhr.send(formData);
//   };

//   return (
//     <div
//       className={`flex w-full flex-col gap-4
//       ${bordered && color === 'default' ? 'border border-muted-200 dark:border-muted-700' : ''}
//       ${bordered && color === 'contrast' ? 'border border-muted-200 dark:border-muted-800' : ''}
//       ${bordered && color === 'muted' ? 'border border-muted-200 dark:border-muted-700' : ''}
//       ${bordered && color === 'mutedContrast' ? 'border border-muted-200 dark:border-muted-800' : ''}
//       ${shape === 'rounded' ? 'rounded-md' : ''}
//       ${shape === 'smooth' ? 'rounded-lg' : ''}
//       ${shape === 'curved' ? 'rounded-xl' : ''}
//       ${shape === 'full' ? 'rounded-xl' : ''}
//       ${color === 'default' ? 'bg-white dark:bg-muted-800' : ''}
//       ${color === 'contrast' ? 'bg-white dark:bg-muted-950' : ''}
//       ${color === 'muted' ? 'bg-muted-100 dark:bg-muted-800' : ''}
//       ${color === 'mutedContrast' ? 'bg-muted-100 dark:bg-muted-950' : ''}
//     `}
//     >
//       {uploadSuccess ? (
//         <div
//           className={`flex flex-col gap-2 py-3
//           ${spaced ? 'px-6' : ''}
//         `}
//         >
//           {isError ? (
//             <div className="mt-3 w-full text-center [&+div]:hidden">
//               <IconBox
//                 icon="AiOutlinePlusCircle"
//                 variant="pastel"
//                 color="danger"
//                 className="mx-auto mb-2 rotate-45"
//               />
//               <h3 className="mb-1 text-base font-light text-muted-800 dark:text-muted-100">
//                 Upload error
//               </h3>
//               <p className="mx-auto max-w-[320px] text-sm text-muted-500 dark:text-muted-400">
//                 Sorry, there was a problem uploading your file(s).
//               </p>
//             </div>
//           ) : (
//             <></>
//           )}
//           <div className="mt-3 w-full text-center">
//             <IconBox
//               icon="AiOutlineCheckCircle"
//               variant="pastel"
//               color="success"
//               className="mx-auto mb-2"
//             />
//             <h3 className="mb-1 text-base font-light text-muted-800 dark:text-muted-100">
//               Upload Complete
//             </h3>
//             <p className="mx-auto max-w-[320px] text-sm text-muted-500 dark:text-muted-400">
//               Great, your file(s) were successfully uploaded.
//             </p>
//           </div>
//         </div>
//       ) : (
//         <div className="w-full">
//           <label
//             className={`block pb-3 pt-6
//             ${spaced ? 'px-6' : ''}
//           `}
//           >
//             <span className="block text-sm text-muted-500 dark:text-muted-400">{label}</span>
//             <span className="block text-xs text-muted-500 dark:text-muted-400">{labelAlt}</span>
//           </label>

//           {!isError ? (
//             <div
//               className={`group
//               ${spaced ? 'px-6' : ''}
//             `}
//             >
//               <div
//                 className={`relative border-2 border-dashed border-muted-300 bg-muted-50 p-5 dark:border-muted-700 dark:bg-muted-800
//                 ${shape === 'rounded' ? 'rounded-md' : ''}
//                 ${shape === 'smooth' ? 'rounded-lg' : ''}
//                 ${shape === 'curved' ? 'rounded-xl' : ''}
//                 ${shape === 'full' ? 'rounded-xl' : ''}
//             `}
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="32"
//                   height="32"
//                   viewBox="0 0 24 24"
//                   className="mx-auto mb-4 h-14 w-14 text-muted-400 transition-colors duration-300 group-hover:text-primary-500"
//                 >
//                   <g fill="none" stroke="currentColor" strokeLinejoin="round">
//                     <path d="M2 14.5A4.5 4.5 0 0 0 6.5 19h12a3.5 3.5 0 0 0 .5-6.965a7 7 0 0 0-13.76-1.857A4.502 4.502 0 0 0 2 14.5Z" />
//                     <path strokeLinecap="round" d="m14 11l-2-2m0 0l-2 2m2-2v6" />
//                   </g>
//                 </svg>
//                 <div className="mx-auto flex max-w-xs flex-col text-center">
//                   <label>
//                     <input
//                       id={id}
//                       type="file"
//                       className="hidden w-36 cursor-pointer text-sm"
//                       onChange={fileSelectedHandler}
//                       accept={acceptedFileTypes ? acceptedFileTypes.join(',') : undefined}
//                       ref={fileInputRef}
//                       multiple={allowMultiple} // Added the 'multiple' attribute conditionally
//                     />
//                     <label
//                       htmlFor={id}
//                       className={`mx-auto flex w-40 cursor-pointer items-center justify-center bg-primary-500 px-3 py-2 text-sm text-center font-normal text-white transition-colors duration-300 hover:bg-primary-400 active:bg-primary-500
//                       ${shape === 'rounded' ? 'rounded-md' : ''}
//                       ${shape === 'smooth' ? 'rounded-lg' : ''}
//                       ${shape === 'curved' ? 'rounded-xl' : ''}
//                       ${shape === 'full' ? 'rounded-full' : ''}
//                     `}
//                     >
//                       Select File{allowMultiple ? 's' : ''}
//                     </label>
//                   </label>

//                   <div className="mt-3 text-xs uppercase text-muted-500 dark:text-muted-400">
//                     or drop {allowMultiple ? '' : 'a'} file{allowMultiple ? 's' : ''} here
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             ''
//           )}

//           <label className="block">
//             <span className="text-sm font-medium text-danger-500">{uploadError}</span>
//           </label>
//         </div>
//       )}

//       <div
//         className={`flex flex-col-reverse gap-2 overflow-x-auto
//         ${spaced ? 'px-6' : ''}
//       `}
//       >
//         {Object.entries(fileProgress).map(([fileName, progress]) => (
//           <div key={fileName} className="flex flex-col gap-1 text-xs">
//             <p className="text-muted-500 dark:text-muted-400">{fileName}</p>
//             <div className="flex h-6 items-center gap-2 rounded-full border border-muted-200 dark:border-muted-700 px-3  overflow-hidden">
//               <Progress size="xs" value={progress} />
//               {progress === 100 ? (
//                 <>
//                   {fileStatus[fileName] === 'Uploaded' ? (
//                     <ReIcon
//                       iconName="AiOutlineCheckCircle"
//                       className="-me-3 h-6 w-6 text-success-500"
//                     />
//                   ) : (
//                     <ReIcon
//                       iconName="AiOutlinePlusCircle"
//                       className="-me-3 h-6 w-6 rotate-45 text-danger-500"
//                     />
//                   )}
//                 </>
//               ) : (
//                 ''
//               )}
//             </div>
//             <p className="font-normal text-xs text-danger-500 mb-2">
//               {fileStatus[fileName] !== 'Uploaded' ? fileStatus[fileName] : ''}
//             </p>
//           </div>
//         ))}
//       </div>
//       <div>
//         {uploadSuccess || isError ? (
//           <div
//             className={`pb-6
//             ${spaced ? 'px-6' : ''}
//           `}
//           >
//             <Button
//               shape={shape}
//               color="muted"
//               type="button"
//               className="w-full"
//               onClick={resetUploader}
//             >
//               Upload Again
//             </Button>
//           </div>
//         ) : (
//           ''
//         )}
//       </div>
//     </div>
//   );
// }
