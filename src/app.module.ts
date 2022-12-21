import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrmConfig } from 'ormconfig';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/strategy/jwt-strategy';
import { UserModule } from './user/user.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(OrmConfig.options),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      sortSchema: true,
      autoSchemaFile: 'schema.gql'
    }),
    AuthModule,
    UserModule
  ],
  controllers: [],
  providers: [JwtStrategy],
})
export class AppModule { }
