import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from '../../users/entities/user.entity';
import { IJwtPayload } from "../../interfaces/jwt-payload.interface";
import { AuthService } from "../auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(configService: ConfigService, private readonly authService: AuthService) {
    super({
      secretOrKey: configService.get('JWT_SECRET'), // La semilla que se va a usar
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() // De dónde se va a sacar el JWT
    });
  }

  async validate(payload: IJwtPayload): Promise<User> {
    const { id } = payload;
    return await this.authService.validateUser(id);
  }

}
