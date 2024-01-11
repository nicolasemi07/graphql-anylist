import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "../../../users/entities/user.entity";

/**
 * Diferencia entre InputType y ObjectType:
 * El InputType significa que "estoy esperando información de entrada"
 * El ObjectType se usa más para información de retorno de info
 */

@ObjectType()
export class AuthResponse {

  @Field(() => String)
  token: string;

  @Field(() => User)
  user: User;

}
