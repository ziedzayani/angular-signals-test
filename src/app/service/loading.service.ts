import { Injectable } from '@angular/core';
import { Signal, signal } from '../signals';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _urlsNotResolved = signal<Map<string, boolean>>(new Map<string, boolean>());

  /**
     * Getter for show
     */
  get urlsNotResolvedSignal() {
    return this._urlsNotResolved;
  }


  /**
   * Sets the loading status on the given url
   *
   * @param status
   * @param url
   */
  updateUrls(status: boolean, url: string): void {
    // Return if the url was not provided
    if (!url) {
      console.error('The request URL must be provided!');
      return;
    }

    if (status === true) {
      this._urlsNotResolved.update(urls => urls.set(url, status));
    }
    else if (status === false && this._urlsNotResolved().has(url)) {
      this._urlsNotResolved.update(urls => {urls.delete(url); return urls});
    }
  }
}
