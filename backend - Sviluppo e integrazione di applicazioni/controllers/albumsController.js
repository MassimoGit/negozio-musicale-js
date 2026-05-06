const albumsService = require('../services/albumsService');

async function getAll(req, res) {
  try {
    const albums = await albumsService.getAll();
    res.json(albums);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Errore nel recupero degli album' });
  }
}

async function create(req, res) {
  try {
    const album = await albumsService.create(req.body);
    res.status(201).json(album);
  } catch (err) {
    console.error(err.message);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
}

async function update(req, res) {
  try {
    const album = await albumsService.update(parseInt(req.params.id), req.body);
    res.json(album);
  } catch (err) {
    console.error(err.message);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
}

async function remove(req, res) {
  try {
    await albumsService.remove(parseInt(req.params.id));
    res.json({ message: 'Album eliminato' });
  } catch (err) {
    console.error(err.message);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
}

module.exports = { getAll, create, update, remove };
