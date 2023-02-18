import { HttpClient } from '@angular/common/http';
import { Injectable,inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';


@Injectable({
  providedIn: 'root'
})
export class MovieService {

  http = inject(HttpClient);

  getMovies(){
    return this.http.get<Movie[]>("movies");
  }


}
