import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { User } from './entities/user.entity';

@Module({
  providers: [UsersResolver, UsersService],
  imports: [
    // Acá declaramos todas las entidades que van a estar en la BD
    TypeOrmModule.forFeature([
      User,
    ])
  ],
  exports: [
    UsersService // ! Exporto el UsersService para que el módulo de Autenticación lo pueda usar (dentro de auth.service.ts)
  ]
})
export class UsersModule { }
