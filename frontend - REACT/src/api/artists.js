import { Artist } from '../models/Artist.js';

const API_URL = 'http://localhost:3000/api/artists';

async function handleResponse(response) {
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.error || 'Errore HTTP: ' + response.status);
  }
  return await response.json();
}

export async function getArtists() {
  const response = await fetch(API_URL);
  const data = await handleResponse(response);
  return data.map((obj) => Artist.fromJSON(obj));
}

export async function createArtist(plain) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(plain),
  });
  const data = await handleResponse(response);
  return Artist.fromJSON(data);
}

export async function updateArtist(id, plain) {
  const response = await fetch(API_URL + '/' + id, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(plain),
  });
  const data = await handleResponse(response);
  return Artist.fromJSON(data);
}

export async function deleteArtist(id) {
  const response = await fetch(API_URL + '/' + id, { method: 'DELETE' });
  return await handleResponse(response);
}
