import { Injectable } from '@nestjs/common';
import { UsersService } from './../users/users.service';
import { SignupInput } from './dto/inputs/signup.input';
import { AuthResponse } from './dto/types/auth-response.type';

@Injectable()
export class AuthService {

  constructor(private readonly usersService: UsersService) { }

  async signUp(signupInput: SignupInput): Promise<AuthResponse> {
    const user = await this.usersService.create(signupInput);

    const token = 'ABC123';

    return { token, user };
  }

  login(): any {
    throw new Error('Method not implemented.');
  }

  revalidateToken() {
    throw new Error('Method not implemented.');
  }

}
