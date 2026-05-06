const albumsRepository = require('../repositories/albumsRepository');
const artistsRepository = require('../repositories/artistsRepository');

async function getAll() {
  return await albumsRepository.findAll();
}

async function create(data) {
  const { title, year, price, artist_id } = data;
  if (!title || typeof title !== 'string' || title.trim() === '') {
    const err = new Error('Il campo "title" è obbligatorio');
    err.statusCode = 400;
    throw err;
  }
  if (!year || !Number.isInteger(Number(year)) || Number(year) < 1900) {
    const err = new Error('Il campo "year" deve essere un anno valido (>= 1900)');
    err.statusCode = 400;
    throw err;
  }
  if (price === undefined || price === null || isNaN(Number(price)) || Number(price) < 0) {
    const err = new Error('Il campo "price" deve essere un numero >= 0');
    err.statusCode = 400;
    throw err;
  }
  if (!artist_id || !Number.isInteger(Number(artist_id)) || Number(artist_id) <= 0) {
    const err = new Error('Il campo "artist_id" deve essere un intero positivo');
    err.statusCode = 400;
    throw err;
  }

  const artist = await artistsRepository.findById(Number(artist_id));
  if (!artist) {
    const err = new Error('Artista associato non trovato');
    err.statusCode = 404;
    throw err;
  }

  const insertId = await albumsRepository.create({
    title: title.trim(),
    year: Number(year),
    price: Number(price),
    artist_id: Number(artist_id),
  });
  return await albumsRepository.findById(insertId);
}

async function update(id, data) {
  const album = await albumsRepository.findById(id);
  if (!album) {
    const err = new Error('Album non trovato');
    err.statusCode = 404;
    throw err;
  }

  const { title, year, price, artist_id } = data;
  if (!title || typeof title !== 'string' || title.trim() === '') {
    const err = new Error('Il campo "title" è obbligatorio');
    err.statusCode = 400;
    throw err;
  }
  if (!year || !Number.isInteger(Number(year)) || Number(year) < 1900) {
    const err = new Error('Il campo "year" deve essere un anno valido (>= 1900)');
    err.statusCode = 400;
    throw err;
  }
  if (price === undefined || price === null || isNaN(Number(price)) || Number(price) < 0) {
    const err = new Error('Il campo "price" deve essere un numero >= 0');
    err.statusCode = 400;
    throw err;
  }
  if (!artist_id || !Number.isInteger(Number(artist_id)) || Number(artist_id) <= 0) {
    const err = new Error('Il campo "artist_id" deve essere un intero positivo');
    err.statusCode = 400;
    throw err;
  }

  const artist = await artistsRepository.findById(Number(artist_id));
  if (!artist) {
    const err = new Error('Artista associato non trovato');
    err.statusCode = 404;
    throw err;
  }

  await albumsRepository.update(id, {
    title: title.trim(),
    year: Number(year),
    price: Number(price),
    artist_id: Number(artist_id),
  });
  return await albumsRepository.findById(id);
}

async function remove(id) {
  const album = await albumsRepository.findById(id);
  if (!album) {
    const err = new Error('Album non trovato');
    err.statusCode = 404;
    throw err;
  }
  await albumsRepository.remove(id);
}

module.exports = { getAll, create, update, remove };
