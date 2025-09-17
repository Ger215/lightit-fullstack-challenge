export type PatientFormData = {
  fullName: string;
  email: string;
  phoneNumber: string;
  file: File | null;
};

export function validatePatientForm(data: PatientFormData) {
  const errors: { [key: string]: string } = {};

  if (!/^[a-zA-Z\s]+$/.test(data.fullName)) {
    errors.fullName = 'Full Name must contain only letters.';
  }
  if (!/^[\w.+-]+@gmail\.com$/.test(data.email)) {
    errors.email = 'Only @gmail.com addresses are allowed.';
  }
  if (!data.phoneNumber.match(/^\d+$/)) {
    errors.phoneNumber = 'Phone number must contain only digits.';
  }
  if (!data.file) {
    errors.file = 'Please upload a document photo.';
  } else if (!data.file.name.endsWith('.jpg')) {
    errors.file = 'Only .jpg files are allowed.';
  }

  return errors;
}
