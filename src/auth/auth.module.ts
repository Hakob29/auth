import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from "dotenv";
import { User } from 'src/user/user.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';


dotenv.config();

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PAYMENT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.AMQP_URL],
          queue: 'main_queue',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET
    })
  ],
  providers: [AuthResolver, AuthService]
})
export class AuthModule { }
