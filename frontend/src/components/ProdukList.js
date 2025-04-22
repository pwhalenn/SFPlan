const ProdukList = ({ produk, onDelete, onEdit }) => {
  return (
    <div className="d-flex flex-column gap-3 w-100">
      {produk.map((item) => (
        <div
          key={item._id}
          className="p-3 border rounded bg-success-subtle text-dark"
        >
          <div className="d-flex justify-content-between align-items-start">
            <div className="flex-grow-1">
              <h5 className="mb-2">{item.nama}</h5>
              <p><strong>Resep:</strong> {item.resep}</p>
              <p><strong>Cara Buat:</strong> {item.cara_buat}</p>
            </div>
            <div className="d-flex gap-2">
              <button
                className="btn btn-primary btn-sm"
                onClick={() => onEdit(item)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => onDelete(item._id)}
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProdukList;