CREATE DATABASE IF NOT EXISTS music_store;

USE music_store;

CREATE TABLE artist (
  id         INT AUTO_INCREMENT,
  name       VARCHAR(150) NOT NULL,
  genre      VARCHAR(100) NOT NULL,
  nationality VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE album (
  id         INT AUTO_INCREMENT,
  title      VARCHAR(200) NOT NULL,
  year       INT          NOT NULL,
  price      DECIMAL(8,2) NOT NULL,
  artist_id  INT          NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (artist_id) REFERENCES artist(id) ON DELETE CASCADE
);

-- ── Dati di esempio ──────────────────────────────────────────────────────────

INSERT INTO artist (name, genre, nationality) VALUES
  ('The Beatles',       'Rock',          'British'),
  ('Miles Davis',       'Jazz',          'American'),
  ('Daft Punk',         'Elettronica',   'Francese'),
  ('Fabrizio De André', 'Cantautorato',  'Italiana'),
  ('Taylor Swift',      'Pop',           'American'),
  ('Kendrick Lamar',    'Hip-Hop',       'American');

INSERT INTO album (title, year, price, artist_id) VALUES
  ('Abbey Road',                   1969,  9.99, 1),
  ('Sgt. Pepper''s',               1967, 11.99, 1),
  ('Kind of Blue',                 1959, 12.99, 2),
  ('In a Silent Way',              1969, 11.99, 2),
  ('Random Access Memories',       2013, 14.99, 3),
  ('Discovery',                    2001,  9.99, 3),
  ('Crêuza de mä',                 1984, 10.99, 4),
  ('Non al denaro non all''amore né al cielo', 1971, 10.99, 4),
  ('The Tortured Poets Department',2024, 13.99, 5),
  ('Midnights',                    2022, 12.99, 5),
  ('GNX',                          2024, 13.99, 6),
  ('Mr. Morale & the Big Steppers',2022, 12.99, 6);
