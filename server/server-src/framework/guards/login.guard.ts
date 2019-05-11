import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

@Injectable()

export class LoginGuard implements CanActivate {
    public canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        return request.user;
    }
}
