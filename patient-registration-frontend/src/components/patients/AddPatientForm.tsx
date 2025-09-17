import { useState, useRef } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { postPatient } from '../../services/patientsService';
import { PhoneInput } from './PhoneInput';

type PatientFormProps = {
  onSuccess: () => void;
  onFailure: (errorMessage: string) => void;
  onClose: () => void;
};

export function AddPatientForm({
  onSuccess,
  onFailure,
  onClose,
}: PatientFormProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!/^[a-zA-Z\s]+$/.test(fullName)) {
      newErrors.fullName = 'Full Name must contain only letters.';
    }
    if (!/^[\w.+-]+@gmail\.com$/.test(email)) {
      newErrors.email = 'Only @gmail.com addresses are allowed.';
    }
    if (!phoneNumber.match(/^\d+$/)) {
      newErrors.phoneNumber = 'Phone number must contain only digits.';
    }
    if (!file) {
      newErrors.file = 'Please upload a document photo.';
    } else if (!file.name.endsWith('.jpg')) {
      newErrors.file = 'Only .jpg files are allowed.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await postPatient({
        fullName,
        email,
        countryCode,
        phoneNumber,
        file,
      });

      onClose();
      onSuccess();

      setFullName('');
      setEmail('');
      setCountryCode('');
      setPhoneNumber('');
      setFile(null);
    } catch (error: any) {
      let backendMsg: string = 'Unknown error occurred';
      if (error?.response?.data) {
        const data = error.response.data;
        if (Array.isArray(data.message)) {
          backendMsg = data.message.join(', ');
        } else if (typeof data.message === 'string') {
          backendMsg = data.message;
        } else if (data.error) {
          backendMsg = data.error;
        }
      } else if (error?.message) {
        backendMsg = error.message;
      }

      onFailure(backendMsg);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
      <div className="relative bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold font-onest">Add Patient</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <XMarkIcon className="h-6 w-6 cursor-pointer" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 w-full">
          <div>
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full font-onest px-4 py-2 text-sm border rounded-lg focus:ring-2 focus:outline-none focus:ring-blue-300"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1 animate-pulse font-onest">
                {errors.fullName}
              </p>
            )}
          </div>
          <div>
            <input
              type="email"
              placeholder="Email (@gmail.com only)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full font-onest text-sm px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none focus:ring-blue-300"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1 animate-pulse font-onest">
                {errors.email}
              </p>
            )}
          </div>
          <PhoneInput
            countryCode={countryCode}
            setCountryCode={setCountryCode}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm mt-1 animate-pulse font-onest">
              {errors.phoneNumber}
            </p>
          )}
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const droppedFile = e.dataTransfer.files[0];
              setFile(droppedFile);
            }}
            className="border-dashed text-md border-2 rounded-lg p-6 text-center cursor-pointer hover:border-blue-300 transition"
          >
            <p className="text-gray-600">
              {file ? file.name : 'Drag & drop a .jpg file or click to select'}
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".jpg"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>
          {errors.file && (
            <p className="text-red-500 text-sm mt-1 animate-pulse font-onest">
              {errors.file}
            </p>
          )}
          <button
            type="submit"
            className="w-full cursor-pointer bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Add Patient
          </button>
        </form>
      </div>
    </div>
  );
}
