import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DataUpdateInputs } from './inputs/data-update.inputs';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { DataExistedInputs } from './inputs/data-existed.inputs';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';


@Injectable()
export class UserService extends TypeOrmQueryService<User> {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){
        super(userRepository, { useSoftDelete: true });
    }


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
        return await this.userRepository.softDelete(existedUser.id)
    }

    //RESTORE USER
    async restoreUser(dataExistedInputs: DataExistedInputs){
        const restoredUser = await this.getDeletedUser(dataExistedInputs);
         if(!restoredUser) throw new Error("user Not Found...");
         await this.userRepository.restore(restoredUser.id);
         return await this.getUserByEmail(restoredUser.email)
    }

    //GET DELETED USERS
    async getDeletedUser(dataExistedInputs: DataExistedInputs){
      const deletedUsers = await this.userRepository.createQueryBuilder("user")
                                     .withDeleted()
                                     .where(`user.deletedAt IS NOT NULL`)
                                     .getMany();
        if(!deletedUsers) throw new Error("Deleted users don't found...");
    

        const deletedUser = deletedUsers.map( async (el) => {
            if(el.email === dataExistedInputs.email && await bcrypt.compare(dataExistedInputs.password, el.password)){
                return el
            }
        })
        if(!deletedUser[0]) throw new Error("user Not Found...");
        return deletedUser[0]; 
    }
}
