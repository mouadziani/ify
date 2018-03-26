import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Principal } from '../auth/principal.service';

@Injectable()
export class ModeratorResolve implements CanActivate {

  constructor(private principal: Principal) { }

  canActivate() {
    return this.principal.identity().then((account) => this.principal.hasAnyAuthority(['ROLE_MODERATOR']));
  }
}
