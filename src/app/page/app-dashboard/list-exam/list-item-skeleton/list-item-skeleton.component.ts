import { Component } from '@angular/core';

@Component({
  selector: 'app-list-item-skeleton',
  imports: [],
  template: `
    <div
      class="grid grid-cols-5 rounded-md border border-gray-200 bg-white px-6 py-3 my-2 animate-pulse"
    >
      <!-- Utilisateur -->
      <div class="flex items-center space-x-2">
        <div class="mr-3 h-4 w-4 rounded-full bg-gray-200"></div>
        <div class="h-4 w-24 rounded bg-gray-200"></div>
      </div>

      <!-- Statut (location) -->
      <div class="flex items-center space-x-2">
        <div class="mr-3 h-4 w-4 rounded-full bg-gray-200"></div>
        <div class="h-4 w-20 rounded bg-gray-200"></div>
      </div>

      <!-- Date -->
      <div class="flex items-center space-x-2">
        <div class="mr-3 h-4 w-4 rounded-full bg-gray-200"></div>
        <div class="h-4 w-28 rounded bg-gray-200"></div>
      </div>

      <!-- Heure -->
      <div class="flex items-center justify-center space-x-2">
        <div class="mr-3 h-4 w-4 rounded-full bg-gray-200"></div>
        <div class="h-4 w-12 rounded bg-gray-200"></div>
      </div>

      <!-- Badge statut -->
      <div class="flex items-center justify-center space-x-2">
        <div class="h-6 w-20 rounded-md bg-gray-200"></div>
      </div>
    </div>
  `,
  styles: ``,
})
export class ListItemSkeletonComponent {}
