import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';
import { AuthService } from './auth.service';
import { DataRegisterInputs } from './inputs/data-register.inputs';
import { DataLoginInputs } from './inputs/login-data.inputs';

@Resolver()
export class AuthResolver {
    constructor(
        private readonly authService: AuthService
    ){}

    @Mutation(() => User)
    async register(@Args('register') dataRegisterInputs: DataRegisterInputs){
        return await this.authService.register(dataRegisterInputs);
    }

    @Mutation(() => User)
    async login(@Args('login') dataLoginInputs: DataLoginInputs){
        return await this.authService.login(dataLoginInputs);
    }
}
