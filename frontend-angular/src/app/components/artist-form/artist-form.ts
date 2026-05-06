import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Artist } from '../../models/Artist';
import { ArtistInput } from '../../models/ArtistInput';

const emptyForm = (): ArtistInput => ({ name: '', genre: '', nationality: '' });

@Component({
  selector: 'app-artist-form',
  imports: [FormsModule],
  templateUrl: './artist-form.html',
})
export class ArtistFormComponent implements OnChanges {
  @Input() initialArtist: Artist | null = null;
  @Output() save = new EventEmitter<ArtistInput>();
  @Output() cancel = new EventEmitter<void>();

  formData: ArtistInput = emptyForm();
  isSubmitting = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['initialArtist']) {
      const a = this.initialArtist;
      if (a) {
        this.formData = { name: a.name, genre: a.genre, nationality: a.nationality };
      } else {
        this.formData = emptyForm();
      }
    }
  }

  get isValid(): boolean {
    return (
      this.formData.name.trim() !== '' &&
      this.formData.genre.trim() !== '' &&
      this.formData.nationality.trim() !== ''
    );
  }

  onSubmit() {
    if (!this.isValid) return;
    this.isSubmitting = true;
    this.save.emit({
      name:        this.formData.name.trim(),
      genre:       this.formData.genre.trim(),
      nationality: this.formData.nationality.trim(),
    });
    this.formData = emptyForm();
    this.isSubmitting = false;
  }
}
