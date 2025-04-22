const PesananList = ({ pesanan, onDelete, onEdit }) => {
  return (
    <div className="d-flex flex-column gap-3 w-100">
      {pesanan.map((item) => (
        <div
          key={item._id}
          className="border rounded bg-light p-3"
          style={{ backgroundColor: "#cfe2ff" }}
        >
          <div className="d-flex justify-content-between align-items-start">
            <div className="flex-grow-1">
              <h5 className="mb-2">{item.produk}</h5>
              <p><strong>Spesifikasi:</strong> {item.spesifikasi}</p>
              <p><strong>Waktu Siap:</strong> {item.waktu_siap}</p>
              <p><strong>Waktu Antar:</strong> {item.waktu_antar}</p>
              <p><strong>Tipe Packaging:</strong> {item.tipe_packaging}</p>
              <p>
                <strong>Kartu Nama:</strong>{" "}
                <input type="checkbox" checked={item.perlu_kartu_nama} disabled />
              </p>
            </div>
            <div className="d-flex flex-column gap-2">
              <button
                className="btn btn-sm btn-primary"
                onClick={() => onEdit(item)}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-danger"
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

export default PesananList;