const artistsService = require('../services/artistsService');

async function getAll(req, res) {
  try {
    const artists = await artistsService.getAll();
    res.json(artists);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Errore nel recupero degli artisti' });
  }
}

async function create(req, res) {
  try {
    const artist = await artistsService.create(req.body);
    res.status(201).json(artist);
  } catch (err) {
    console.error(err.message);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
}

async function update(req, res) {
  try {
    const artist = await artistsService.update(parseInt(req.params.id), req.body);
    res.json(artist);
  } catch (err) {
    console.error(err.message);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
}

async function remove(req, res) {
  try {
    await artistsService.remove(parseInt(req.params.id));
    res.json({ message: 'Artista eliminato' });
  } catch (err) {
    console.error(err.message);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
}

module.exports = { getAll, create, update, remove };
