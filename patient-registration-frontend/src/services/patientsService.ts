import type { Patient } from '../domain/Patient';

const API_URL = 'http://localhost:3000/patients';

export async function getPatients(): Promise<Patient[]> {
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error('Failed to fetch patients');
  }
  return res.json();
}
