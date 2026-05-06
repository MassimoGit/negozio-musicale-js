import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Artist } from '../models/Artist';
import { ArtistInput } from '../models/ArtistInput';

@Injectable({ providedIn: 'root' })
export class ArtistService {
  private http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/api/artists';

  getAll(): Observable<Artist[]> {
    return this.http.get<Artist[]>(this.apiUrl);
  }

  create(artist: ArtistInput): Observable<Artist> {
    return this.http.post<Artist>(this.apiUrl, artist);
  }

  update(id: number, artist: ArtistInput): Observable<Artist> {
    return this.http.put<Artist>(`${this.apiUrl}/${id}`, artist);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
