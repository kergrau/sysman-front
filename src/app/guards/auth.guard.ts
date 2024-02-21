import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const tokenService: TokenService = inject(TokenService);
  if (tokenService.hasToken()) return true;

  router.navigate(['/login']);
  return false;
};
