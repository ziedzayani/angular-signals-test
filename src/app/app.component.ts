import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MovieService } from './service/movie.service';
import { LoadingService } from './service/loading.service';
import { signal, Signal } from './signals';
import { Movie } from './models/movie';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,MatToolbarModule,MatProgressBarModule,MatButtonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  //inject services
  movieService = inject(MovieService);
  loadingService = inject(LoadingService);
  // data model signals
  moviesSig = signal<Movie[]>([]);
  urlsMapSig! : Signal<Map<string, boolean>>;

  ngOnInit(): void {
    this.urlsMapSig = this.loadingService.urlsNotResolvedSignal;
  }

  getMovies(){
    this.movieService.getMovies().subscribe(movies => {
      console.log(movies);
      this.moviesSig.set(movies);
    });
  }

  clearMOvies(){
    this.moviesSig.set([]);
  }
}
