import { useEffect, useState } from 'react';
import { PatientCard } from '../components/patients/PatientCard';
import type { Patient } from '../domain/Patient';
import { getPatients } from '../services/patientsService';
import {
  paginate,
  goToNextPage,
  goToPreviousPage,
} from '../services/paginationService';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

export function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const patientsPerPage = 5;

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await getPatients();
        setPatients(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const { paginatedData: paginatedPatients, totalPages } = paginate(
    patients,
    currentPage,
    patientsPerPage
  );

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="w-16 h-16 border-4 border-blue-300 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-600 text-lg mt-4 font-medium">
          Loading Patients...
        </p>
      </div>
    );
  }

  if (!loading && patients.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-blue-100 text-center">
        <ExclamationCircleIcon className="h-16 w-16 text-gray-400 mb-4" />
        <p className="text-gray-700 text-xl font-semibold mb-2">
          No patients found
        </p>
        <p className="text-gray-500 mb-6">
          Add your first patient to get started.
        </p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium shadow hover:bg-blue-700 transition">
          + Add Patient
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="w-full max-w-4xl mx-auto px-4 pt-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Patients</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            + Add Patient
          </button>
        </div>

        <div
          className={`grid gap-4 ${
            patients.length >= 4
              ? 'max-h-[500px] overflow-y-auto pr-2 rounded-lg'
              : ''
          }`}
        >
          {paginatedPatients.map((p) => (
            <PatientCard key={p.id} patient={p} />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-6 mt-8">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => goToPreviousPage(prev))}
              className="cursor-pointer p-2 rounded-full bg-blue-400 text-white shadow hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>

            <span className="text-gray-700 font-semibold">
              Page {currentPage} of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => goToNextPage(prev, totalPages))
              }
              className="cursor-pointer p-2 rounded-full bg-blue-400 text-white shadow hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
