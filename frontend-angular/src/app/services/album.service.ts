import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Album } from '../models/Album';
import { AlbumInput } from '../models/AlbumInput';

@Injectable({ providedIn: 'root' })
export class AlbumService {
  private http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/api/albums';

  getAll(): Observable<Album[]> {
    return this.http.get<Album[]>(this.apiUrl);
  }

  create(album: AlbumInput): Observable<Album> {
    return this.http.post<Album>(this.apiUrl, album);
  }

  update(id: number, album: AlbumInput): Observable<Album> {
    return this.http.put<Album>(`${this.apiUrl}/${id}`, album);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
