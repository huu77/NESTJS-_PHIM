import { JwtService } from '@nestjs/jwt';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;

    return this.getTokenFromHeader(authorization)
      .then(token => {
        const secret = this.configService.get<string>('SECRET_TOKEN');
        const payload = this.jwtService.verify(token, { secret });

        request['user_data'] = payload;

        return true;
      })
      .catch(() => false);
  }

  async getTokenFromHeader(authorization: string): Promise<string | undefined> {
    const [type, token] = authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
