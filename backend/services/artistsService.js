const artistsRepository = require('../repositories/artistsRepository');

async function getAll() {
  return await artistsRepository.findAll();
}

async function create(data) {
  const { name, genre, nationality } = data;
  if (!name || typeof name !== 'string' || name.trim() === '') {
    const err = new Error('Il campo "name" è obbligatorio');
    err.statusCode = 400;
    throw err;
  }
  if (!genre || typeof genre !== 'string' || genre.trim() === '') {
    const err = new Error('Il campo "genre" è obbligatorio');
    err.statusCode = 400;
    throw err;
  }
  if (!nationality || typeof nationality !== 'string' || nationality.trim() === '') {
    const err = new Error('Il campo "nationality" è obbligatorio');
    err.statusCode = 400;
    throw err;
  }

  const insertId = await artistsRepository.create({
    name: name.trim(),
    genre: genre.trim(),
    nationality: nationality.trim(),
  });
  return await artistsRepository.findById(insertId);
}

async function update(id, data) {
  const artist = await artistsRepository.findById(id);
  if (!artist) {
    const err = new Error('Artista non trovato');
    err.statusCode = 404;
    throw err;
  }

  const { name, genre, nationality } = data;
  if (!name || typeof name !== 'string' || name.trim() === '') {
    const err = new Error('Il campo "name" è obbligatorio');
    err.statusCode = 400;
    throw err;
  }
  if (!genre || typeof genre !== 'string' || genre.trim() === '') {
    const err = new Error('Il campo "genre" è obbligatorio');
    err.statusCode = 400;
    throw err;
  }
  if (!nationality || typeof nationality !== 'string' || nationality.trim() === '') {
    const err = new Error('Il campo "nationality" è obbligatorio');
    err.statusCode = 400;
    throw err;
  }

  await artistsRepository.update(id, {
    name: name.trim(),
    genre: genre.trim(),
    nationality: nationality.trim(),
  });
  return await artistsRepository.findById(id);
}

async function remove(id) {
  const artist = await artistsRepository.findById(id);
  if (!artist) {
    const err = new Error('Artista non trovato');
    err.statusCode = 404;
    throw err;
  }
  await artistsRepository.remove(id);
}

module.exports = { getAll, create, update, remove };
