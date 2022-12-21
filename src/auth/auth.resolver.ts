import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';
import { AuthService } from './auth.service';
import { DataRegisterInputs } from './inputs/data-register.inputs';
import { DataLoginInputs } from './inputs/data-login.inputs';
import { LoggedUserOutput } from './outputs/logged-user.output';
import { Inject, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { StripeCustomerOutput } from './outputs/stripe-Customer.output';
import { DataStripeInputs } from './inputs/data-stripe.inputs';
import { CurrentUser } from './strategy/current-user';
import { GqlAuthGuard } from 'src/auth/strategy/jwt-auth.guard';


@Resolver()
export class AuthResolver {
    constructor(
        @Inject('PAYMENT_SERVICE')
        private readonly client: ClientProxy,
        private readonly authService: AuthService,
    ) { }

    //REGISTER
    @Mutation(() => User)
    async register(@Args('register') dataRegisterInputs: DataRegisterInputs): Promise<User> {
        return await this.authService.register(dataRegisterInputs);
    }

    //LOGIN
    @Mutation(() => LoggedUserOutput)
    async login(@Args('login') dataLoginInputs: DataLoginInputs) {
        this.client.emit("hello", "Hello from RabitMQ")
        return await this.authService.login(dataLoginInputs);
    }

    //CREATE STRIPE ACCOUNT
    @Query(() => StripeCustomerOutput)
    @UseGuards(GqlAuthGuard)
    async createStripeAccount(@CurrentUser() user: User) {
        return this.client.emit("createCustomer", user);
    }
}
