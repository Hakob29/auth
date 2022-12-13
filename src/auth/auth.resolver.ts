import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';
import { AuthService } from './auth.service';
import { DataRegisterInputs } from './inputs/data-register.inputs';
import { DataLoginInputs } from './inputs/data-login.inputs';
import { LoggedUserOutput } from './logged-user.output';

@Resolver()
export class AuthResolver {
    constructor(
        private readonly authService: AuthService
    ) { }

    //REGISTER
    @Mutation(() => User)
    async register(@Args('register') dataRegisterInputs: DataRegisterInputs): Promise<User> {
        return await this.authService.register(dataRegisterInputs);
    }

    //LOGIN
    @Mutation(() => LoggedUserOutput)
    async login(@Args('login') dataLoginInputs: DataLoginInputs) {
        return await this.authService.login(dataLoginInputs);
    }
}
