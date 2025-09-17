import { useEffect, useState } from 'react';
import { PatientCard } from '../components/patients/PatientCard';
import { AddPatientForm } from '../components/patients/AddPatientForm';
import { SuccessModal } from '../../common/SuccessModal';
import { FailureModal } from '../../common/FailureModal';
import type { Patient } from '../domain/Patient';
import { getPatients } from '../services/patientsService';
import {
  paginate,
  goToNextPage,
  goToPreviousPage,
} from '../services/paginationService';
import { searchPatients } from '../services/searchService';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import {
  ExclamationCircleIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

export function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);
  const [failureMessage, setFailureMessage] = useState('');

  const patientsPerPage = 5;

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

  useEffect(() => {
    fetchPatients();
  }, []);

  const filteredPatients = searchPatients(patients, searchTerm);

  const { paginatedData: paginatedPatients, totalPages } = paginate(
    filteredPatients,
    currentPage,
    patientsPerPage
  );

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="w-16 h-16 border-4 border-blue-300 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-600 text-lg mt-4 font-medium font-onest">
          Loading Patients...
        </p>
      </div>
    );
  }

  if (!loading && patients.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-blue-100 text-center">
        <ExclamationCircleIcon className="h-16 w-16 text-gray-400 mb-4" />
        <p className="text-gray-700 text-xl font-semibold font-onest mb-2">
          No patients found
        </p>
        <p className="text-gray-500 mb-6 font-onest">
          Add your first patient to get started.
        </p>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium font-onest shadow hover:bg-blue-700 transition"
        >
          + Add Patient
        </button>

        {showForm && (
          <AddPatientForm
            onClose={() => setShowForm(false)}
            onSuccess={() => {
              setShowForm(false);
              fetchPatients();
              setShowSuccess(true);
            }}
            onFailure={(msg) => {
              setFailureMessage(msg);
              setShowFailure(true);
            }}
          />
        )}

        {showSuccess && <SuccessModal onClose={() => setShowSuccess(false)} />}
        {showFailure && (
          <FailureModal
            message={failureMessage}
            onClose={() => setShowFailure(false)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="w-full max-w-4xl mx-auto px-4 pt-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-medium font-onest tracking-tight text-gray-800">
            Patients
          </h1>
          <button
            onClick={() => setShowForm(true)}
            className="cursor-pointer font-medium font-onest bg-blue-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            + Add Patient
          </button>
        </div>

        <div className="relative mb-6 max-w-md">
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search Patient"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-12 pr-4 font-onest py-3 rounded-xl bg-white shadow-md border border-gray-200 placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
          />
        </div>

        <div
          className={`grid gap-4 ${
            filteredPatients.length >= 4
              ? 'max-h-[600px] overflow-y-auto pr-2 rounded-lg'
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

            <span className="text-gray-700 font-semibold font-onest">
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

        {showForm && (
          <AddPatientForm
            onClose={() => setShowForm(false)}
            onSuccess={() => {
              setShowForm(false);
              fetchPatients();
              setShowSuccess(true);
            }}
            onFailure={(msg) => {
              setFailureMessage(msg);
              setShowFailure(true);
            }}
          />
        )}

        {showSuccess && <SuccessModal onClose={() => setShowSuccess(false)} />}
        {showFailure && (
          <FailureModal
            message={failureMessage}
            onClose={() => setShowFailure(false)}
          />
        )}
      </div>
    </div>
  );
}
