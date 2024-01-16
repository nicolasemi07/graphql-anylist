import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { AuthResponse } from './dto/types/auth-response.type';
import { LoginInput, SignupInput } from './dto/inputs';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { User } from '../users/entities/user.entity';
import { CurrentUser } from './decorators/current-user.decorator';

@Resolver(() => AuthResponse)
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  @Mutation(() => AuthResponse, { name: 'signUp' })
  async signup(@Args('signupInput') signupInput: SignupInput): Promise<AuthResponse> {
    return this.authService.signUp(signupInput);
  }

  @Mutation(() => AuthResponse, { name: 'login' })
  async login(@Args('loginInput') loginInput: LoginInput): Promise<AuthResponse> {
    return this.authService.login(loginInput);
  }

  @Query(() => AuthResponse, { name: 'revalidate' })
  @UseGuards(JwtAuthGuard) // ! Uso de un guard personalizado de rutas (este endpoint me pide un JWT gracias al @UseGuards)
  revalidateToken(
    @CurrentUser(/*[ValidRoles.admin]*/) user: User // ! Uso de un decorador Custom!
  ): AuthResponse {
    return this.authService.revalidateToken(user);
  }
}
