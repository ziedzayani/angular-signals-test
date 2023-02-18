import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { finalize, Observable } from "rxjs";
import { LoadingService } from "../service/loading.service";



export function loadingInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    let loadingService = inject(LoadingService);
    // Set the loading status to true
    loadingService.updateUrls(true, request.url);

    return next(request).pipe(
        finalize(() => {
            // Set the status to false if there are any errors or the request is completed
            loadingService.updateUrls(false, request.url);
        }));
  }
  

