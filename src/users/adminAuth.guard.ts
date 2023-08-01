import { JwtService } from '@nestjs/jwt';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from './auth.guard';
 
@Injectable()
export class AdminAuthGuard extends AuthGuard {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const canActivate = await super.canActivate(context); // Call the parent canActivate method

    if (!canActivate) {
      return false; // If the parent canActivate returns false, no need to proceed
    }

    const request = context.switchToHttp().getRequest();
    const payload = request['user_data']; // Access the payload stored in the request

    if (payload && payload.role) {
      const role = payload.role;

      if (role === 'admin') {
        return true; // Allow access for admin role
      }
    }

    return false; // Reject access for other roles or if role property is missing
  }
}