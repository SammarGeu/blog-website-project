import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
//import { provideRouter, withServerTransition } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';//
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

import { environment } from './enviroment/enviroment.prod';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { routes } from './app.routes';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
//import { AngularEditorModule } from '@kolkov/angular-editor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideAnimations(),   // Required for animations
    importProvidersFrom(
      //AngularEditorModule,
      ToastrModule.forRoot()
    ),
    // ✅ Add this change:
    provideRouter(routes),

    provideClientHydration(withEventReplay()),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ]
};
