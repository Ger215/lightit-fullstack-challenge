import { Test, TestingModule } from '@nestjs/testing';
import { PatientsService } from './patients.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Patient } from '../domain/patient.entity';
import { Repository } from 'typeorm';
import { NotificationsService } from '../notifications/notifications.service';

describe('PatientsService', () => {
  let service: PatientsService;
  let repo: jest.Mocked<Repository<Patient>>;
  let notificationService: NotificationsService;

  const mockRepo = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
  };

  const mockNotificationService = {
    sendRegistrationConfirmationEmail: jest.fn(),
    sendRegistrationConfirmationSms: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PatientsService,
        {
          provide: getRepositoryToken(Patient),
          useValue: mockRepo,
        },
        {
          provide: NotificationsService,
          useValue: mockNotificationService,
        },
      ],
    }).compile();

    service = module.get<PatientsService>(PatientsService);
    repo = module.get(getRepositoryToken(Patient));
    notificationService =
      module.get<NotificationsService>(NotificationsService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createPatient', () => {
    it('should create and save a patient if email does not exist', async () => {
      const dto = {
        fullName: 'Test User',
        email: 'test@example.com',
        countryCode: '+598',
        phoneNumber: '12345678',
      };
      const file = 'photo.jpg';

      mockRepo.findOne.mockResolvedValue(null);
      mockRepo.create.mockReturnValue({ ...dto, documentPhoto: file });
      mockRepo.save.mockResolvedValue({ id: '1', ...dto, documentPhoto: file });

      const result = await service.createPatient(dto, file);

      expect(result).toEqual({ id: '1', ...dto, documentPhoto: file });
      expect(mockRepo.create).toHaveBeenCalledWith({
        ...dto,
        documentPhoto: file,
      });
      expect(mockRepo.save).toHaveBeenCalled();
    });

    it('should throw if email already exists', async () => {
      const dto = {
        fullName: 'Test User',
        email: 'duplicate@example.com',
        countryCode: '+598',
        phoneNumber: '12345678',
      };

      mockRepo.findOne.mockResolvedValue({
        id: '1',
        ...dto,
        documentPhoto: 'x',
      });

      await expect(service.createPatient(dto, 'file.jpg')).rejects.toThrow(
        'Email already registered',
      );
    });
  });

  describe('getAll', () => {
    it('should return an array of patients', async () => {
      const patients = [
        { id: '1', fullName: 'John Doe', email: 'johndoe@gmail.com' },
      ];
      mockRepo.find.mockResolvedValue(patients);

      const result = await service.getAll();

      expect(result).toEqual(patients);
      expect(mockRepo.find).toHaveBeenCalled();
    });
  });
});
