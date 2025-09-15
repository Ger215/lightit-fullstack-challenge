import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class CreatePatientDto {
  @IsNotEmpty({ message: 'Full name is required' })
  @Matches(/^[A-Za-z\s]+$/, { message: 'Full name must contain only letters' })
  fullName: string;

  @IsEmail({}, { message: 'Invalid email format' })
  @Matches(/@gmail\.com$/, { message: 'Only @gmail.com emails allowed' })
  email: string;

  @IsNotEmpty({ message: 'Country code is required' })
  countryCode: string;

  @IsNotEmpty({ message: 'Phone number is required' })
  phoneNumber: string;
}
