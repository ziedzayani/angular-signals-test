import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MovieService } from './service/movie.service';
import { LoadingService } from './service/loading.service';
import { computed, signal, Signal } from './signals';
import { Movie } from './models/movie';
import { effect } from './signals/src/effect';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatButtonModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  //inject services
  movieService = inject(MovieService);
  loadingService = inject(LoadingService);
  // data model signals
  moviesSig = signal<Movie[]>([]);
  urlsMapSig!: Signal<Map<string, boolean>>;
  isLoadingSig!: Signal<boolean>;

  ngOnInit(): void {
    this.urlsMapSig = this.loadingService.urlsNotResolvedSignal;
    //creates a memoizing signal, which calculates its value from the values of some number of input signals
    //we can use this in the template, i added this ligne just for show you how using computed
    this.isLoadingSig = computed(() => this.urlsMapSig().size > 0);
    effect(() =>
      console.log(
        `oops the list of the Urls of ongoing http calls in execution is modified : 
        urls = [${Array.from(this.urlsMapSig().keys())}]`
      )
    );
  }

  getMovies() {
    this.movieService.getMovies().subscribe((movies) => {
      this.moviesSig.set(movies);
    });
  }

  clearMOvies() {
    this.moviesSig.set([]);
  }
}
