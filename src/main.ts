import 'zone.js/dist/zone';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { loadingInterceptor } from './app/interceptor/loading.interceptor';
import { mockBackendInterceptor } from './app/interceptor/mock-backend.interceptor';




bootstrapApplication(AppComponent,{
  providers: [
    provideHttpClient(withInterceptors([loadingInterceptor,mockBackendInterceptor])),
    importProvidersFrom(BrowserAnimationsModule)
]
})
  .catch(err => console.error(err));
