import type { Patient } from '../domain/Patient';

export function searchPatients(patients: Patient[], term: string): Patient[] {
  if (!term.trim()) return patients;

  const lowerTerm = term.toLowerCase();

  return patients.filter(
    (p) =>
      p.fullName.toLowerCase().includes(lowerTerm) ||
      p.email.toLowerCase().includes(lowerTerm)
  );
}
