import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { setHeaderInterceptor } from '../core/interceptors/setHeader.interceptor';
import { spinnerInterceptor } from '../core/interceptors/spinner.interceptor';
import { errorInterceptor } from '../core/interceptors/error.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideToastr({
      positionClass: 'toast-top-right',
    }),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(), withInterceptors([setHeaderInterceptor, spinnerInterceptor, errorInterceptor])),
    importProvidersFrom(RouterModule, BrowserAnimationsModule, ToastrModule.forRoot())
  ],
};
