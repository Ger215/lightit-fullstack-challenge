import type { Patient } from '../domain/Patient';

const API_URL = 'http://localhost:3000/patients';

export async function postPatient(data: {
  fullName: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  file: File | null;
}): Promise<Patient> {
  const formData = new FormData();
  formData.append('fullName', data.fullName);
  formData.append('email', data.email);
  formData.append('countryCode', data.countryCode);
  formData.append('phoneNumber', data.phoneNumber);

  if (data.file) {
    formData.append('documentPhoto', data.file);
  }

  const res = await fetch(API_URL, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    let errorMessage = 'Failed to create patient';
    try {
      const errorData = await res.json();
      if (Array.isArray(errorData.message)) {
        errorMessage = errorData.message.join(', ');
      } else if (typeof errorData.message === 'string') {
        errorMessage = errorData.message;
      } else if (errorData.error) {
        errorMessage = errorData.error;
      }
    } catch (e) {}
    throw new Error(errorMessage);
  }

  return res.json();
}

export async function getPatients(): Promise<Patient[]> {
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error('Failed to fetch patients');
  }
  return res.json();
}
