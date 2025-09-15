import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('patients')
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  countryCode: string;

  @Column()
  phoneNumber: string;

  @Column()
  documentPhoto: string;

  @CreateDateColumn()
  createdAt: Date;
}
