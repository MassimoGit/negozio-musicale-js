import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Artist } from '../../models/Artist';
import { Album } from '../../models/Album';
import { AlbumInput } from '../../models/AlbumInput';

const emptyForm = (): AlbumInput => ({ title: '', year: new Date().getFullYear(), price: 0, artist_id: null });

@Component({
  selector: 'app-album-form',
  imports: [FormsModule],
  templateUrl: './album-form.html',
})
export class AlbumFormComponent implements OnChanges {
  @Input() artists: Artist[] = [];
  @Input() initialAlbum: Album | null = null;
  @Output() save = new EventEmitter<AlbumInput>();
  @Output() cancel = new EventEmitter<void>();

  formData: AlbumInput = emptyForm();
  isSubmitting = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['initialAlbum']) {
      const a = this.initialAlbum;
      if (a) {
        this.formData = { title: a.title, year: a.year, price: a.price, artist_id: a.artist_id };
      } else {
        this.formData = emptyForm();
      }
    }
  }

  get isValid(): boolean {
    return (
      this.formData.title.trim() !== '' &&
      this.formData.year >= 1900 &&
      this.formData.price >= 0 &&
      this.formData.artist_id !== null
    );
  }

  onSubmit() {
    if (!this.isValid) return;
    this.isSubmitting = true;
    this.save.emit({
      title:     this.formData.title.trim(),
      year:      Number(this.formData.year),
      price:     Number(this.formData.price),
      artist_id: Number(this.formData.artist_id),
    });
    this.formData = emptyForm();
    this.isSubmitting = false;
  }
}
