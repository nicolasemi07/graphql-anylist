import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UpdateUserInput } from './dto/update-user.input';
import { SignupInput } from '../auth/dto/inputs/signup.input';

@Injectable()
export class UsersService {

  // ! Uso copado de la clase de logs de Nest
  private logger: Logger = new Logger('UsersService');

  constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) { }

  async create(signupInput: SignupInput): Promise<User> {
    try {
      const newUser = this.usersRepository.create({
        ...signupInput,
        password: bcrypt.hashSync(signupInput.password, 10)
      });
      return await this.usersRepository.save(newUser);
    } catch (error) {
      this.handleDbErrors(error);
    }
  }

  async findAll(): Promise<User[]> {
    return [];
  }

  async findOne(id: string): Promise<User> {
    throw new Error("Sin implementar");
  }

  async update(id: string, updateUserInput: UpdateUserInput): Promise<User> {
    throw new Error("Sin implementar");
  }

  async block(id: string): Promise<User> {
    throw new Error("Sin implementar");
  }

  // ! con el "never" indicamos que TODOS los caminos dan excepción solamente, no hay un retorno de nada
  private handleDbErrors(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail.replace('Key ', ''));
    }

    this.logger.error(error);

    throw new InternalServerErrorException('Please check server logs');
  }
}
