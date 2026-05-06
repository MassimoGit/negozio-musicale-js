export class Album {
  #id;
  #title;
  #year;
  #price;
  #artist_id;
  #artist_name;

  constructor(id, title, year, price, artist_id, artist_name) {
    if (typeof title !== 'string' || title.trim() === '')
      throw new Error('title deve essere una stringa non vuota');
    if (typeof year !== 'number' || year < 1900)
      throw new Error('year deve essere un numero >= 1900');
    if (typeof price !== 'number' || price < 0)
      throw new Error('price deve essere un numero >= 0');
    if (typeof artist_id !== 'number' || artist_id <= 0)
      throw new Error('artist_id deve essere un numero positivo');

    this.#id          = id;
    this.#title       = title.trim();
    this.#year        = year;
    this.#price       = price;
    this.#artist_id   = artist_id;
    this.#artist_name = artist_name ?? '';
  }

  get id()          { return this.#id; }
  get title()       { return this.#title; }
  get year()        { return this.#year; }
  get price()       { return this.#price; }
  get artist_id()   { return this.#artist_id; }
  get artist_name() { return this.#artist_name; }

  toJSON() {
    return {
      id:          this.#id,
      title:       this.#title,
      year:        this.#year,
      price:       this.#price,
      artist_id:   this.#artist_id,
      artist_name: this.#artist_name,
    };
  }

  static fromJSON(obj) {
    return new Album(
      obj.id,
      obj.title,
      Number(obj.year),
      Number(obj.price),
      obj.artist_id,
      obj.artist_name
    );
  }
}
