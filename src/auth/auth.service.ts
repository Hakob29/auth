import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { DataRegisterInputs } from './inputs/data-register.inputs';
import { DataLoginInputs } from './inputs/login-data.inputs';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService
    ){}

// REGISTER USER
    async register(dataRegisterInputs: DataRegisterInputs){

        const existedUser = await this.userRepository.findOne({where: {email: dataRegisterInputs.email}});
        if(existedUser) throw new Error("A user with this email already exists");
        const newUser: User = this.userRepository.create(dataRegisterInputs);
        return await this.userRepository.save(newUser);
    }

//LOGIN USER
    async login(dataLoginInputs: DataLoginInputs){
        const expectedUser: User = await this.userRepository.findOne({where: {
            email: dataLoginInputs.email
        }})

        if(!expectedUser){
            throw new Error('User Not Found...');
        }
        if(!await bcrypt.compare(expectedUser.password, dataLoginInputs.password)){
            throw new Error('Wrong Password...');
        }
        return await this.userSign(expectedUser.id, expectedUser.email, "User");
    }

    async userSign(userId: number, email: string, type: string): Promise<string>{
        return await this.jwtService.sign({
          sub: userId,
          email: email,
          type: type,
        });
      }
}
