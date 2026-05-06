import { useEffect, useState } from 'react';
import { getArtists, createArtist, updateArtist, deleteArtist } from './api/artists.js';
import { getAlbums, createAlbum, updateAlbum, deleteAlbum } from './api/albums.js';
import ArtistList from './components/ArtistList.jsx';
import ArtistForm from './components/ArtistForm.jsx';
import AlbumList from './components/AlbumList.jsx';
import AlbumForm from './components/AlbumForm.jsx';

function App() {
  const [view, setView] = useState('albums');
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [editingArtist, setEditingArtist] = useState(null);
  const [editingAlbum, setEditingAlbum] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [artistsData, albumsData] = await Promise.all([
          getArtists(),
          getAlbums(),
        ]);
        setArtists(artistsData);
        setAlbums(albumsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // ── Artisti ───────────────────────────────────────────────────────────────

  const handleSaveArtist = async (data) => {
    if (editingArtist) {
      const updated = await updateArtist(editingArtist.id, data);
      setArtists(artists.map((a) => (a.id === updated.id ? updated : a)));
      setEditingArtist(null);
      return;
    }
    const created = await createArtist(data);
    setArtists([created, ...artists]);
  };

  const handleDeleteArtist = async (id) => {
    if (!confirm('Eliminare questo artista? Verranno eliminati anche i suoi album.')) return;
    await deleteArtist(id);
    setArtists(artists.filter((a) => a.id !== id));
    setAlbums(albums.filter((al) => al.artist_id !== id));
  };

  // ── Album ─────────────────────────────────────────────────────────────────

  const handleSaveAlbum = async (data) => {
    if (editingAlbum) {
      const updated = await updateAlbum(editingAlbum.id, data);
      setAlbums(albums.map((al) => (al.id === updated.id ? updated : al)));
      setEditingAlbum(null);
      return;
    }
    const created = await createAlbum(data);
    setAlbums([created, ...albums]);
  };

  const handleDeleteAlbum = async (id) => {
    if (!confirm('Eliminare questo album?')) return;
    await deleteAlbum(id);
    setAlbums(albums.filter((al) => al.id !== id));
  };

  return (
    <>
      <nav className="navbar navbar-dark mb-4">
        <div className="container-fluid px-4">
          <span className="navbar-brand fw-bold">
            <i className="bi bi-music-note-beamed me-2"></i>Negozio Musicale
          </span>
          <div className="btn-group">
            <button
              className={'btn btn-outline-light' + (view === 'artists' ? ' active' : '')}
              onClick={() => { setView('artists'); setEditingArtist(null); }}
            >
              <i className="bi bi-person-badge me-1"></i>Artisti
            </button>
            <button
              className={'btn btn-outline-light' + (view === 'albums' ? ' active' : '')}
              onClick={() => { setView('albums'); setEditingAlbum(null); }}
            >
              <i className="bi bi-vinyl me-1"></i>Album
            </button>
          </div>
        </div>
      </nav>

      <div className="container mb-5">
        {error && <div className="alert alert-danger">{error}</div>}
        {isLoading && <p className="text-muted">Caricamento...</p>}

        {!isLoading && view === 'artists' && (
          <>
            <ArtistForm
              initialArtist={editingArtist}
              onSave={handleSaveArtist}
              onCancel={() => setEditingArtist(null)}
            />
            <h2 className="mb-3">Artisti</h2>
            <ArtistList
              artists={artists}
              onEdit={setEditingArtist}
              onDelete={handleDeleteArtist}
            />
          </>
        )}

        {!isLoading && view === 'albums' && (
          <>
            <AlbumForm
              artists={artists}
              initialAlbum={editingAlbum}
              onSave={handleSaveAlbum}
              onCancel={() => setEditingAlbum(null)}
            />
            <h2 className="mb-3">Album</h2>
            <AlbumList
              albums={albums}
              onEdit={setEditingAlbum}
              onDelete={handleDeleteAlbum}
            />
          </>
        )}
      </div>
    </>
  );
}

export default App;
