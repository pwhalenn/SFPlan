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
              <h5 className="mb-2">
                {item.nama_produk?.nama_produk || "Nama Produk Tidak Ditemukan"}
              </h5>
              <p><strong>Kuantitas:</strong> {item.kuantitas}</p>
              <p><strong>Waktu Mulai Buat:</strong> {item.waktu_mulai_buat || "-"}</p>
              <p><strong>Catatan:</strong> {item.catatan || "-"}</p>
              <p><strong>Nama Pelanggan:</strong> {item.nama_pelanggan || "-"}</p>
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