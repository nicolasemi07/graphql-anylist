import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignupInput } from './dto/inputs/signup.input';
import { AuthResponse } from './dto/types/auth-response.type';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  @Mutation(() => AuthResponse, { name: 'signUp' })
  async signup(@Args('signupInput') signupInput: SignupInput): Promise<AuthResponse> {
    return this.authService.signUp(signupInput);
  }

  // @Mutation(, { name: 'login' })
  // async login(): Promise<> {
  //   return this.authService.login();
  // }

  // @Query(, { name: 'revalidate' })
  // revalidateToken() {
  //   return this.authService.revalidateToken();
  // }
}
