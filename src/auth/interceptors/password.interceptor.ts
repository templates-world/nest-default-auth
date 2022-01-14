import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class PasswordInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (data instanceof Array) {
          return data.map(this.removePassword);
        } else if (typeof data === 'object') {
          return this.removePassword(data);
        }
      }),
    );
  }

  removePassword(data: any) {
    const { password, ...rest } = data;
    return rest;
  }
}
