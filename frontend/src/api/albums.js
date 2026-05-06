import { Album } from '../models/Album.js';
import { AlbumInput } from '../models/AlbumInput.js';

const API_URL = 'http://localhost:3000/api/albums';

async function handleResponse(response) {
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.error || 'Errore HTTP: ' + response.status);
  }
  return await response.json();
}

export async function getAlbums() {
  const response = await fetch(API_URL);
  const data = await handleResponse(response);
  return data.map((obj) => Album.fromJSON(obj));
}

export async function createAlbum(plain) {
  const input = new AlbumInput(plain.title, plain.year, plain.price, plain.artist_id);
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  const data = await handleResponse(response);
  return Album.fromJSON(data);
}

export async function updateAlbum(id, plain) {
  const input = new AlbumInput(plain.title, plain.year, plain.price, plain.artist_id);
  const response = await fetch(API_URL + '/' + id, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  const data = await handleResponse(response);
  return Album.fromJSON(data);
}

export async function deleteAlbum(id) {
  const response = await fetch(API_URL + '/' + id, { method: 'DELETE' });
  return await handleResponse(response);
}
