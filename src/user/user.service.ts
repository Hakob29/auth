import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DataUpdateInputs } from './inputs/data-update.inputs';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { DataExistedInputs } from './inputs/data-existed.inputs';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}


    //GET ALL USERS
    async getAllUser(){
        return await this.userRepository.find();
    } 

    //GET USER BY EMAIL
    async getUserByEmail(email: string){
        const existedUser = await this.userRepository.findOne({where: {email: email}});
        if(!existedUser) throw new Error('User Not Found...');
        return existedUser;
    }

    //UPDATE USER 
    async updateUser(dataExistedInputs: DataExistedInputs, dataUpdateInputs: DataUpdateInputs){
        const existedUser = await this.userRepository.findOne({where:{email: dataExistedInputs.email}})
         if(!existedUser) throw new Error('User Not Found...');
         if(!await bcrypt.compare(dataExistedInputs.password, existedUser.password)) throw new Error('Wrong Password...');
         await this.userRepository.update(existedUser.id, {
            id: existedUser.id,
            name: dataUpdateInputs.name,
            email: dataUpdateInputs.email,
            password: await bcrypt.hash(dataUpdateInputs.password, 10)
        });
        return await this.getUserByEmail(dataUpdateInputs.email);
    }

    //DELETE USER
    async deleteUser(dataExistedInputs: DataExistedInputs){
        const existedUser = await this.userRepository.findOne({where:{email: dataExistedInputs.email}})
        if(!existedUser) throw new Error('User Not Found...');
        if(!await bcrypt.compare(dataExistedInputs.password, existedUser.password)) throw new Error('Wrong Password...');
        return await this.userRepository.delete(existedUser.id);
    }
}
