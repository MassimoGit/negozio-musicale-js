const pool = require('../config/database');

async function findAll() {
  const [rows] = await pool.execute(
    'SELECT id, name, genre, nationality FROM artist ORDER BY name'
  );
  return rows;
}

async function findById(id) {
  const [rows] = await pool.execute(
    'SELECT id, name, genre, nationality FROM artist WHERE id = ?',
    [id]
  );
  return rows[0] || null;
}

async function create(artist) {
  const [result] = await pool.execute(
    'INSERT INTO artist (name, genre, nationality) VALUES (?, ?, ?)',
    [artist.name, artist.genre, artist.nationality]
  );
  return result.insertId;
}

async function update(id, artist) {
  const [result] = await pool.execute(
    'UPDATE artist SET name = ?, genre = ?, nationality = ? WHERE id = ?',
    [artist.name, artist.genre, artist.nationality, id]
  );
  return result.affectedRows > 0;
}

async function remove(id) {
  const [result] = await pool.execute(
    'DELETE FROM artist WHERE id = ?',
    [id]
  );
  return result.affectedRows > 0;
}

module.exports = { findAll, findById, create, update, remove };
