import { CheckCircleIcon } from '@heroicons/react/24/outline';

type SuccessModalProps = {
  onClose: () => void;
};

export function SuccessModal({ onClose }: SuccessModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
      <div className="relative bg-white p-8 rounded-2xl shadow-xl w-full max-w-md mx-auto text-center">
        <div className="flex flex-col items-center gap-4">
          <CheckCircleIcon className="h-16 w-16 text-green-600" />
          <h3 className="text-xl font-semibold text-green-600 font-onest">
            Patient added successfully!
          </h3>
          <button
            onClick={onClose}
            className="cursor-pointer mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
