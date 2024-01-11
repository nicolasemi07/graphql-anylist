import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule // ! Lo importo para poder usar el UsersService en el auth.service.ts
  ],
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}
