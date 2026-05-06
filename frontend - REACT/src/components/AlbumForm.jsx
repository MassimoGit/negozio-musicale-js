import { useEffect, useState } from 'react';

const emptyForm = { title: '', year: '', price: '', artist_id: '' };

function AlbumForm({ artists, initialAlbum, onSave, onCancel }) {
  const [formData, setFormData] = useState(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialAlbum) {
      setFormData({
        title:     initialAlbum.title,
        year:      String(initialAlbum.year),
        price:     String(initialAlbum.price),
        artist_id: String(initialAlbum.artist_id),
      });
      return;
    }
    setFormData(emptyForm);
  }, [initialAlbum]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const isValid =
    formData.title.trim() !== '' &&
    formData.year !== '' &&
    Number(formData.year) >= 1900 &&
    formData.price !== '' &&
    Number(formData.price) >= 0 &&
    formData.artist_id !== '';

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isValid) return;
    setIsSubmitting(true);
    try {
      await onSave({
        title:     formData.title.trim(),
        year:      Number(formData.year),
        price:     Number(formData.price),
        artist_id: Number(formData.artist_id),
      });
      setFormData(emptyForm);
    } catch (err) {
      alert('Errore: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-header">
        <h5 className="mb-0">{initialAlbum ? 'Modifica album' : 'Nuovo album'}</h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label fw-bold">Titolo</label>
              <input
                className="form-control"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>
            <div className="col-md-2">
              <label className="form-label fw-bold">Anno</label>
              <input
                className="form-control"
                type="number"
                name="year"
                min="1900"
                max="2099"
                value={formData.year}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>
            <div className="col-md-2">
              <label className="form-label fw-bold">Prezzo (€)</label>
              <input
                className="form-control"
                type="number"
                name="price"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>
            <div className="col-md-2">
              <label className="form-label fw-bold">Artista</label>
              <select
                className="form-select"
                name="artist_id"
                value={formData.artist_id}
                onChange={handleChange}
                disabled={isSubmitting}
              >
                <option value="">Seleziona artista</option>
                {artists.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="d-flex gap-2 mt-3">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!isValid || isSubmitting}
            >
              {isSubmitting ? 'Salvataggio...' : initialAlbum ? 'Modifica' : 'Salva'}
            </button>
            {initialAlbum && (
              <button type="button" className="btn btn-secondary" onClick={onCancel}>
                <i className="bi bi-backspace-fill me-2"></i> Torna alla creazione
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default AlbumForm;
