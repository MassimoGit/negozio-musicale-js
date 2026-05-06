import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Album } from '../../models/Album';

@Component({
  selector: 'app-album-list',
  imports: [DecimalPipe],
  templateUrl: './album-list.html',
})
export class AlbumListComponent {
  @Input() albums: Album[] = [];
  @Output() edit = new EventEmitter<Album>();
  @Output() delete = new EventEmitter<number>();
}
