const JadwalProduksiList = ({ jadwal, onDelete, onEdit }) => {
  return (
    <div className="d-flex flex-column gap-3">
      {jadwal.map((item) => (
        <div
          key={item._id}
          className="card border-1 bg-light-subtle shadow-sm"
        >
          <div className="card-body d-flex justify-content-between align-items-start">
            <div>
              <h5 className="card-title">{item.produk}</h5>
              <p className="card-text mb-1">
                <strong>Waktu Mulai:</strong> {item.waktu_mulai}
              </p>
              <p className="card-text">
                <strong>Waktu Selesai:</strong> {item.waktu_selesai}
              </p>
            </div>
            <div className="d-flex gap-2">
              <button
                className="btn btn-sm btn-outline-primary"
                onClick={() => onEdit(item)}
              >
                ✏️
              </button>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => onDelete(item._id)}
              >
                🗑️
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JadwalProduksiList;