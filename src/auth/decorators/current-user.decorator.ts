import { ExecutionContext, ForbiddenException, InternalServerErrorException, createParamDecorator } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

import { ValidRoles } from "../../enums/valid-roles.enum";
import { User } from "../../users/entities/user.entity";

export const CurrentUser = createParamDecorator(
  (roles: ValidRoles[] = [], context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);

    // Esto puede ser nulo porque puede no haber pasado por el Guard que setea el usuario
    const user: User = ctx.getContext().req.user;

    if (!user) {
      throw new InternalServerErrorException(`No user inside the request - make sure to use the AuthGuard`);
    }

    if (!roles.length) return user;

    for (const role of user.roles) {
      // TODO quitar casteo
      if (roles.includes(role as ValidRoles)) {
        return user;
      }
    }

    throw new ForbiddenException(`User ${user.fullName} needs a valid role to execute this Query/Mutation | [${roles}]`);
  });