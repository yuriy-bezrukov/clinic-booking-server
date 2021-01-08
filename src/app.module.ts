import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/clinic'),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService
  ]
})
export class AppModule {}
