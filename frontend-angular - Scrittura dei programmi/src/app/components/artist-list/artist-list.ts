import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Artist } from '../../models/Artist';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.html',
})
export class ArtistListComponent {
  @Input() artists: Artist[] = [];
  @Output() edit = new EventEmitter<Artist>();
  @Output() delete = new EventEmitter<number>();
}
