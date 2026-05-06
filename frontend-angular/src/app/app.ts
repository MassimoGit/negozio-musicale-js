import { Component, OnInit, inject, signal } from '@angular/core';
import { ArtistListComponent } from './components/artist-list/artist-list';
 import { ArtistFormComponent } from './components/artist-form/artist-form';
import { AlbumListComponent } from './components/album-list/album-list';
import { AlbumFormComponent } from './components/album-form/album-form';
import { ArtistService } from './services/artist.service';
import { AlbumService } from './services/album.service';
import { Artist } from './models/Artist';
import { Album } from './models/Album';
import { ArtistInput } from './models/ArtistInput';
import { AlbumInput } from './models/AlbumInput';

type View = 'artists' | 'albums';

@Component({
  selector: 'app-root',
  imports: [ArtistListComponent, ArtistFormComponent, AlbumListComponent, AlbumFormComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private artistService = inject(ArtistService);
  private albumService  = inject(AlbumService);

  view           = signal<View>('albums');
  artists        = signal<Artist[]>([]);
  albums         = signal<Album[]>([]);
  editingArtist  = signal<Artist | null>(null);
  editingAlbum   = signal<Album | null>(null);

  ngOnInit() {
    this.loadArtists();
    this.loadAlbums();
  }

  setView(v: View) {
    this.view.set(v);
    this.editingArtist.set(null);
    this.editingAlbum.set(null);
  }

  // ── Artisti ───────────────────────────────────────────────────────────────

  loadArtists() {
    this.artistService.getAll().subscribe({
      next: (data) => this.artists.set(data),
      error: (err) => console.error('Errore caricamento artisti:', err),
    });
  }

  onSaveArtist(data: ArtistInput) {
    const editing = this.editingArtist();
    if (editing) {
      this.artistService.update(editing.id, data).subscribe({
        next: () => { this.editingArtist.set(null); this.loadArtists(); },
        error: (err) => alert('Errore aggiornamento: ' + err.message),
      });
    } else {
      this.artistService.create(data).subscribe({
        next: () => this.loadArtists(),
        error: (err) => alert('Errore inserimento: ' + err.message),
      });
    }
  }

  onEditArtist(artist: Artist) {
    this.editingArtist.set(artist);
  }

  onDeleteArtist(id: number) {
    if (!confirm('Eliminare questo artista? Verranno eliminati anche i suoi album.')) return;
    this.artistService.delete(id).subscribe({
      next: () => { this.loadArtists(); this.loadAlbums(); },
      error: (err) => alert('Errore eliminazione: ' + err.message),
    });
  }

  onCancelArtist() {
    this.editingArtist.set(null);
  }

  // ── Album ─────────────────────────────────────────────────────────────────

  loadAlbums() {
    this.albumService.getAll().subscribe({
      next: (data) => this.albums.set(data),
      error: (err) => console.error('Errore caricamento album:', err),
    });
  }

  onSaveAlbum(data: AlbumInput) {
    const editing = this.editingAlbum();
    if (editing) {
      this.albumService.update(editing.id, data).subscribe({
        next: () => { this.editingAlbum.set(null); this.loadAlbums(); },
        error: (err) => alert('Errore aggiornamento: ' + err.message),
      });
    } else {
      this.albumService.create(data).subscribe({
        next: () => this.loadAlbums(),
        error: (err) => alert('Errore inserimento: ' + err.message),
      });
    }
  }

  onEditAlbum(album: Album) {
    this.editingAlbum.set(album);
  }

  onDeleteAlbum(id: number) {
    if (!confirm('Eliminare questo album?')) return;
    this.albumService.delete(id).subscribe({
      next: () => this.loadAlbums(),
      error: (err) => alert('Errore eliminazione: ' + err.message),
    });
  }

  onCancelAlbum() {
    this.editingAlbum.set(null);
  }
}
