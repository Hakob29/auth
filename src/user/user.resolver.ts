import { Resolver, Query, Args, Mutation, ID} from '@nestjs/graphql';
import { DeleteResult, UpdateResult } from 'typeorm';
import { DataExistedInputs } from './inputs/data-existed.inputs';
import { DataUpdateInputs } from './inputs/data-update.inputs';
import { User } from './user.entity';
import { UserService } from './user.service';


@Resolver()
export class UserResolver{
    constructor(
        private readonly userService: UserService
    ){}

    //GET ALL USERS
    @Query(() => [User])
    async getAllUser(){
        return await this.userService.getAllUser();
    }

    //GET USER BY EMAIL
    @Query(() => User)
    async getUserByEmail(@Args('email') email: string){
        return await this.userService.getUserByEmail(email);
    }

    //UPDATE USER
    @Mutation(() => User)
    async updateUser(
        @Args("existedData") dataExistedInputs: DataExistedInputs, 
        @Args('updatedData') dataUpdateInputs: DataUpdateInputs): Promise<User>{
        return await this.userService.updateUser(dataExistedInputs, dataUpdateInputs);
    }

    //DELETE USER
    @Mutation(()=> User)
    async deleteUser(
        @Args('deleteUser') dataExistedInputs: DataExistedInputs): Promise<DeleteResult>{
        return await this.userService.deleteUser(dataExistedInputs);
    }

    //RESTORE USER
    @Mutation(() => User)
    async restoreUser(
        @Args('restoreUser') dataExistedInputs: DataExistedInputs){
            return await this.userService.restoreUser(dataExistedInputs);
        }

    //GET DELETED USERS
    @Mutation(() => User)
        async getDeletedUser(
            @Args('deletedUser') dataExistedInputs: DataExistedInputs){
            return await this.userService.getDeletedUser(dataExistedInputs);
        }
}
