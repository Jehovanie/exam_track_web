import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router'; // Importez Router

export const signinGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); // Utilisez 'inject' pour obtenir une instance de Router
  // Vérifiez si l'utilisateur est authentifié (exemple avec localStorage)
  const isAuthenticated = localStorage.getItem('authToken') === "tay";

  if (isAuthenticated) {
    router.navigate(['/dashboard']);
    return false; // Si l'utilisateur est authentifié, autorisez l'accès
  }
  // Si non authentifié, redirigez l'utilisateur vers la page de connexion
  return true; // Empêche l'accès à la route
};
