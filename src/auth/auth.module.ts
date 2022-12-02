import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from "dotenv";

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forFeature(),
    JwtModule.register({
      secret: process.env.JWT_SECRET
    })
  ],
  providers: [AuthResolver, AuthService]
})
export class AuthModule {}
