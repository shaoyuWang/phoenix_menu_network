import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import _ from "lodash";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }

    public canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const roleIds = this.reflector.get<number[]>("roles", context.getHandler());
        let judget = false;
        _.forEach(request.user.roles, (role) => {
            _.forEach(roleIds, (roleId) => {
                if (role.id === roleId) {
                    judget = true;
                }
            });
        });
        return judget;
    }
}
