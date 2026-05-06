import { useEffect, useState } from 'react';

const emptyForm = { name: '', genre: '', nationality: '' };

function ArtistForm({ initialArtist, onSave, onCancel }) {
  const [formData, setFormData] = useState(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialArtist) {
      setFormData({
        name:        initialArtist.name,
        genre:       initialArtist.genre,
        nationality: initialArtist.nationality,
      });
      return;
    }
    setFormData(emptyForm);
  }, [initialArtist]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const isValid =
    formData.name.trim() !== '' &&
    formData.genre.trim() !== '' &&
    formData.nationality.trim() !== '';

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isValid) return;
    setIsSubmitting(true);
    try {
      await onSave({
        name:        formData.name.trim(),
        genre:       formData.genre.trim(),
        nationality: formData.nationality.trim(),
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
        <h5 className="mb-0">{initialArtist ? 'Modifica artista' : 'Nuovo artista'}</h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label fw-bold">Nome</label>
              <input
                className="form-control"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label fw-bold">Genere</label>
              <input
                className="form-control"
                type="text"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label fw-bold">Nazionalità</label>
              <input
                className="form-control"
                type="text"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>
          </div>
          <div className="d-flex gap-2 mt-3">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!isValid || isSubmitting}
            >
              {isSubmitting ? 'Salvataggio...' : initialArtist ? 'Modifica' : 'Salva'}
            </button>
            {initialArtist && (
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

export default ArtistForm;
