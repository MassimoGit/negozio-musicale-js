function AlbumList({ albums, onEdit, onDelete }) {
  if (albums.length === 0) {
    return <p className="text-muted">Nessun album presente.</p>;
  }

  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered">
        <thead className="table-primary">
          <tr>
            <th>Titolo</th>
            <th>Anno</th>
            <th>Prezzo (€)</th>
            <th>Artista</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {albums.map((album) => (
            <tr key={album.id}>
              <td>{album.title}</td>
              <td>{album.year}</td>
              <td>{album.price.toFixed(2)}</td>
              <td>{album.artist_name}</td>
              <td>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => onEdit(album)}
                  >
                    <i className="bi bi-pencil"></i> Modifica
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => onDelete(album.id)}
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

export default AlbumList;
