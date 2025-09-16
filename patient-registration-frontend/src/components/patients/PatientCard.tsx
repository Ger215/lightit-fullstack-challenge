import { useState } from 'react';
import type { Patient } from '../../domain/Patient';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

export function PatientCard({ patient }: { patient: Patient }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-5 cursor-pointer"
      onClick={() => setExpanded((prev) => !prev)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={`http://localhost:3000/uploads/${patient.documentPhoto}`}
            alt="Document"
            className="w-16 h-16 rounded-full object-cover border-2 border-blue-200 shadow-sm"
          />
          <h2 className="font-semibold text-xl text-gray-800">
            {patient.fullName}
          </h2>
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setExpanded((prev) => !prev);
          }}
          className="cursor-pointer text-blue-600 hover:text-blue-800 transition-colors duration-500 flex items-center gap-1"
        >
          {expanded ? (
            <>
              <ChevronUpIcon className="w-5 h-5" />
            </>
          ) : (
            <>
              <ChevronDownIcon className="w-5 h-5" />
            </>
          )}
        </button>
      </div>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          expanded ? 'max-h-40 mt-4 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="text-md text-gray-700 space-y-2">
          <p>
            <span className="font-semibold">Email:</span> {patient.email}
          </p>
          <p>
            <span className="font-semibold">Phone:</span> ({patient.countryCode}
            ) {patient.phoneNumber}
          </p>
          <p>
            <span className="font-semibold">Registration Date:</span>{' '}
            {new Date(patient.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
