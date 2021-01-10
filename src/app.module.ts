import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { MeetingsModule } from './meetings/meetings.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/clinic', {useFindAndModify: false}),
    UsersModule,
    AuthModule,
    MeetingsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService
  ]
})
export class AppModule {}
