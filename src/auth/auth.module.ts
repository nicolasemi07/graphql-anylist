import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UsersModule } from '../users/users.module';

import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule, // ! Para leer las variables de entorno (la "JWT_SECRET")

    PassportModule.register({ defaultStrategy: 'jwt' }), // ! Modo de autenticación

    // ! Registro del modulo de JWT
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        // console.log(configService.get('JWT_SECRET'));  // ! Con esto nos aseguramos que la semilla está levantada
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: '4h'
          }
        }
      }
    }),
    UsersModule, // ! Lo importo para poder usar el UsersService en el auth.service.ts
  ],
  providers: [AuthResolver, AuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule, JwtModule]
})
export class AuthModule { }
