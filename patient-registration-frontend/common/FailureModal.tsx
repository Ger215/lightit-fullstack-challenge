import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

type FailureModalProps = {
  message: string;
  onClose: () => void;
};

export function FailureModal({ message, onClose }: FailureModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
      <div className="relative bg-white p-8 rounded-2xl shadow-xl w-full max-w-md mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold font-onest text-red-600">
            Patient Creation Error
          </h2>
        </div>

        <div className="flex flex-col items-center text-center gap-4">
          <ExclamationCircleIcon className="h-14 w-14 text-red-600" />
          <p className="font-onest text-gray-700">{message}</p>
          <button
            onClick={onClose}
            className="cursor-pointer mt-4 bg-red-500 text-white px-6 py-2 rounded-lg font-medium font-onest shadow hover:bg-red-600 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
