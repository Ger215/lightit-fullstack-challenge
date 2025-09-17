import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsService } from './notifications.service';
import { MailerService } from '@nestjs-modules/mailer';

describe('NotificationService', () => {
  let service: NotificationsService;
  let mailerService: MailerService;

  const mockMailerService = {
    sendMail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationsService,
        {
          provide: MailerService,
          useValue: mockMailerService,
        },
      ],
    }).compile();

    service = module.get<NotificationsService>(NotificationsService);
    mailerService = module.get<MailerService>(MailerService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sendRegistrationConfirmationEmail', () => {
    it('should call mailerService.sendMail with correct params', async () => {
      const to = 'test1234@gmail.com';
      const fullName = 'Test User';

      await service.sendRegistrationConfirmationEmail(to, fullName);

      expect(mailerService.sendMail).toHaveBeenCalledTimes(1);
      expect(mailerService.sendMail).toHaveBeenCalledWith(
        expect.objectContaining({
          to,
          subject: expect.any(String),
        }),
      );
    });
  });
});
