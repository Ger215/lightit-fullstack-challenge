import { useState } from 'react';

interface Patient {
  id: string;
  fullName: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  documentPhoto: string;
  createdAt: string;
}

export function PatientCard({ patient }: { patient: Patient }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border rounded-lg shadow-sm p-4 bg-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={`http://localhost:3000/uploads/${patient.documentPhoto}`}
            alt="Document"
            className="w-16 h-16 rounded object-cover border"
          />
          <h2 className="font-bold text-lg">{patient.fullName}</h2>
        </div>
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="text-blue-600 hover:underline"
        >
          {expanded ? 'Hide' : 'Expand'}
        </button>
      </div>

      {expanded && (
        <div className="mt-4 text-sm text-gray-700">
          <p>
            <span className="font-semibold">Email:</span> {patient.email}
          </p>
          <p>
            <span className="font-semibold">Phone:</span> {patient.countryCode}{' '}
            {patient.phoneNumber}
          </p>
          <p>
            <span className="font-semibold">Created At:</span>{' '}
            {new Date(patient.createdAt).toLocaleDateString()}
          </p>
        </div>
      )}
    </div>
  );
}
