function ArtistList({ artists, onEdit, onDelete }) {
  if (artists.length === 0) {
    return <p className="text-muted">Nessun artista presente.</p>;
  }

  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered">
        <thead className="table-primary">
          <tr>
            <th>Nome</th>
            <th>Genere</th>
            <th>Nazionalità</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {artists.map((artist) => (
            <tr key={artist.id}>
              <td>{artist.name}</td>
              <td>{artist.genre}</td>
              <td>{artist.nationality}</td>
              <td>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => onEdit(artist)}
                  >
                    <i className="bi bi-pencil"></i> Modifica
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => onDelete(artist.id)}
                  >
                    <i className="bi bi-trash"></i> Elimina
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ArtistList;
