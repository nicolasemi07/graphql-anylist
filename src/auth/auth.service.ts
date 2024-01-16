import * as bcrypt from 'bcrypt';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from './../users/users.service';
import { AuthResponse } from './dto/types/auth-response.type';
import { LoginInput, SignupInput } from './dto/inputs';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) { }

  async signUp(signupInput: SignupInput): Promise<AuthResponse> {
    const user = await this.usersService.create(signupInput);
    const token = this.getJwtToken(user.id);
    return { token, user };
  }

  async login(loginInput: LoginInput): Promise<AuthResponse> {
    const user = await this.usersService.findOneByEmail(loginInput.email);
    if (!bcrypt.compareSync(loginInput.password, user.password)) {
      throw new NotFoundException(`${loginInput.email} not found!`);
    }
    const token = this.getJwtToken(user.id);
    return { token, user };
  }

  revalidateToken(user: User): AuthResponse {
    const token = this.getJwtToken(user.id);
    return { token, user };
  }

  private getJwtToken(userId: string) {
    return this.jwtService.sign({ id: userId }); // ! Ya con el ID puedo saber toda la info del usuario más adelante, así que con eso es suficiente!
  }

  async validateUser(id: string): Promise<User> {
    const user = await this.usersService.findOneById(id);
    if (!user.isActive) throw new UnauthorizedException(`User is inactive, please talk with an admin`);

    // Debería ser como esta parte de abajo porque no cambio la estructura del objeto
    // Debería crearse una interfaz de retorno sin el password, para no cambiar su estructura
    // const { password, ...userToReturn } = user;
    // return userToReturn;

    // Esto no cumple con buenas prácticas
    delete user.password;
    return user;
  }

}
