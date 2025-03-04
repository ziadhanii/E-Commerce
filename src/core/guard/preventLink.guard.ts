import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const preventLinkGuard: CanActivateFn = (route, state) => {
  let router: Router = inject(Router);

  if (typeof localStorage !== 'undefined' && localStorage.getItem('token') !== null) {
    router.navigate(['/home']);
    return false;
  }

  return true;
};
