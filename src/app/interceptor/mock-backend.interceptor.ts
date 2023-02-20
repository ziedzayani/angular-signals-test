import { HttpEvent, HttpHandlerFn, HttpRequest, HttpResponse } from "@angular/common/http";
import { delay, Observable, of } from "rxjs";
import { Movie } from "../models/movie";

const MOVIES : Movie[] = [
    { name :  "Titanic",      releaseYear: 1997 },
    { name :  "Spiderman",    releaseYear: 2002 },
    { name :  "The Avengers", releaseYear: 2012 },
    { name :  "Aquaman",      releaseYear: 2018 },
];


export function mockBackendInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    //console.log(`Request is on its way to ${req.url}`);
  
    return of(new HttpResponse({ status: 200, body: MOVIES })).pipe(delay(2000));
  }
