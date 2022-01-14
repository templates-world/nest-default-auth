import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleGuard } from './role.guard';

@Injectable()
export class UserOrRoleGuard extends RoleGuard implements CanActivate {
  constructor(protected readonly reflector: Reflector) {
    super(reflector);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const hasRole = (await super.canActivate(
      context,
    )) as any as Promise<boolean>;
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    const isSameUser = user.id === +req.params.id;
    return hasRole || isSameUser;
  }
}
