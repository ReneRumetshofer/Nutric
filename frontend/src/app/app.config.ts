import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import {
  AutoRefreshTokenService,
  createInterceptorCondition,
  INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
  IncludeBearerTokenCondition,
  includeBearerTokenInterceptor,
  provideKeycloak,
  UserActivityService,
  withAutoRefreshToken,
} from 'keycloak-angular';
import { environment } from '../environments/environment';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';

const urlCondition = createInterceptorCondition<IncludeBearerTokenCondition>({
  urlPattern: /^\/api(\/.*)?$/i,
  bearerPrefix: 'Bearer',
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      ripple: true,
      theme: {
        preset: Aura,
        options: {
          // darkModeSelector: 'auto',
        },
      },
    }),
    provideKeycloak({
      config: {
        url: environment.keycloak.url,
        realm: environment.keycloak.realm,
        clientId: environment.keycloak.client,
      },
      initOptions: {
        onLoad: 'login-required',
        checkLoginIframe: true, // Enables silent refresh checks
        silentCheckSsoRedirectUri:
          window.location.origin + '/public/silent-check-sso.html',
      },
      features: [
        withAutoRefreshToken({
          onInactivityTimeout: 'login',
          sessionTimeout: 60000,
        }),
      ],
      providers: [AutoRefreshTokenService, UserActivityService],
    }),
    {
      provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
      useValue: [urlCondition],
    },
    provideHttpClient(withInterceptors([includeBearerTokenInterceptor])),
    MessageService,
  ],
};
