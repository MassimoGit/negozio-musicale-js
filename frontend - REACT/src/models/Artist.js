export class Artist {
  #id;
  #name;
  #genre;
  #nationality;

  constructor(id, name, genre, nationality) {
    if (typeof name !== 'string' || name.trim() === '')
      throw new Error('name deve essere una stringa non vuota');
    if (typeof genre !== 'string' || genre.trim() === '')
      throw new Error('genre deve essere una stringa non vuota');
    if (typeof nationality !== 'string' || nationality.trim() === '')
      throw new Error('nationality deve essere una stringa non vuota');

    this.#id          = id;
    this.#name        = name.trim();
    this.#genre       = genre.trim();
    this.#nationality = nationality.trim();
  }

  get id()          { return this.#id; }
  get name()        { return this.#name; }
  get genre()       { return this.#genre; }
  get nationality() { return this.#nationality; }

  toJSON() {
    return {
      id:          this.#id,
      name:        this.#name,
      genre:       this.#genre,
      nationality: this.#nationality,
    };
  }

  static fromJSON(obj) {
    return new Artist(obj.id, obj.name, obj.genre, obj.nationality);
  }
}
