import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/users/entities/role.entity';
import { JwtAuthGuard } from './jwt-auth.guard';

@Injectable()
export class RoleGuard extends JwtAuthGuard implements CanActivate {
  constructor(protected readonly reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<Role[]>('roles', context.getHandler());
    const canAct = (await super.canActivate(
      context,
    )) as any as Promise<boolean>;
    const user = context.switchToHttp().getRequest().user;
    const hasRole = !!roles.find((role) => user.role === role);
    return canAct && hasRole;
  }
}
