import ReactSignatureCanvas from 'react-signature-canvas';
import Button from '@/components/ui/button/Button';
const SignaturePenal = ({ signRef, initialsRef }: { signRef: any; initialsRef: any }) => {
  return (
    <main className="flex flex-col gap-2 sm:flex-row mt-1">
      <div className="w-full relative mr-4 rounded-lg">
        <ReactSignatureCanvas
          ref={signRef}
          canvasProps={{
            className: 'bg-primary-50 dark:bg-muted-800 w-full h-[220px] rounded-t-lg'
          }}
        />
        <div className="w-full h-8 bg-primary-50 dark:bg-muted-800 border-t-2 border-dashed  border-primary-500 dark:border-primary-200 rounded-b-lg"></div>
        <Button
          variant={'outlined'}
          onClick={() => {
            if (!signRef) return;
            signRef?.current?.clear();
          }}
          className="w-full mt-4"
        >
          Clear and draw again
        </Button>
        <div className="bg-primary-500 dark:bg-muted-600 text-white py-1 px-2 absolute rounded-lg top-2 left-2 select-none">
          Signature
        </div>
      </div>
      <div className="sm:w-2/5 w-full relative rounded-lg">
        <ReactSignatureCanvas
          ref={initialsRef}
          canvasProps={{
            className: 'bg-primary-50 dark:bg-muted-800 w-full h-[220px] rounded-t-lg'
          }}
        />
        <div className="w-full h-8 bg-primary-50 dark:bg-muted-800 border-t-2 border-dashed  border-primary-500 dark:border-primary-200 rounded-b-lg"></div>
        <Button
          variant={'outlined'}
          onClick={() => {
            if (!signRef) return;
            initialsRef?.current?.clear();
          }}
          className="mt-4  w-full"
        >
          Clear and draw again
        </Button>
        <div className="bg-primary-500 dark:bg-muted-600 text-white py-1 px-2 absolute rounded-lg top-2 left-2 select-none">
          Initials
        </div>
      </div>
    </main>
  );
};

export default SignaturePenal;
