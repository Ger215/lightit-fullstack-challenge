import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientsModule } from './patients/patients.module';
import { DatabaseModule } from './database/database.module';
import { AppMailerModule } from './mailer/mailer.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    PatientsModule,
    DatabaseModule,
    AppMailerModule,
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
