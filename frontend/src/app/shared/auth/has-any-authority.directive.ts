import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Principal } from './principal.service';

@Directive({
  selector: '[ifyHasAnyAuthority]'
})
export class HasAnyAuthorityDirective {

  private authorities: string[];

  constructor(private principal: Principal, private templateRef: TemplateRef<any>, private viewContainerRef: ViewContainerRef) {}

  @Input()
  set ifyHasAnyAuthority(value: string|string[]) {
    this.authorities = typeof value === 'string' ? [ <string> value ] : <string[]> value;
    this.updateView();
    this.principal.getAuthenticationState().subscribe((identity) => this.updateView());
  }

  private updateView(): void {
    this.principal.hasAnyAuthority(this.authorities).then((result) => {
      this.viewContainerRef.clear();
      if (result) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      }
    });
  }
}
