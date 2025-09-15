import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router'; // Importez Router

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); // Utilisez 'inject' pour obtenir une instance de Router

  // Vérifiez si l'utilisateur est authentifié (exemple avec localStorage)
  const isAuthenticated = localStorage.getItem('authToken') !== null;

  if (isAuthenticated) {
    return true; // Si l'utilisateur est authentifié, autorisez l'accès
  }

  // Si non authentifié, redirigez l'utilisateur vers la page de connexion
  router.navigate(['/auth/signin']);
  return false; // Empêche l'accès à la route
};
