const pool = require('../config/database');

const SELECT_WITH_ARTIST = `
  SELECT
    a.id,
    a.title,
    a.year,
    a.price,
    a.artist_id,
    ar.name AS artist_name
  FROM album a
  INNER JOIN artist ar ON a.artist_id = ar.id
`;

async function findAll() {
  const [rows] = await pool.execute(
    `${SELECT_WITH_ARTIST} ORDER BY ar.name, a.year`
  );
  return rows;
}

async function findById(id) {
  const [rows] = await pool.execute(
    `${SELECT_WITH_ARTIST} WHERE a.id = ?`,
    [id]
  );
  return rows[0] || null;
}

async function create(album) {
  const [result] = await pool.execute(
    'INSERT INTO album (title, year, price, artist_id) VALUES (?, ?, ?, ?)',
    [album.title, album.year, album.price, album.artist_id]
  );
  return result.insertId;
}

async function update(id, album) {
  const [result] = await pool.execute(
    'UPDATE album SET title = ?, year = ?, price = ?, artist_id = ? WHERE id = ?',
    [album.title, album.year, album.price, album.artist_id, id]
  );
  return result.affectedRows > 0;
}

async function remove(id) {
  const [result] = await pool.execute(
    'DELETE FROM album WHERE id = ?',
    [id]
  );
  return result.affectedRows > 0;
}

module.exports = { findAll, findById, create, update, remove };
