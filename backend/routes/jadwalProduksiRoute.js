const express = require("express");
const router = express.Router();
const jadwalProduksiController = require("../controllers/jadwalProduksiController");

router.post("/", jadwalProduksiController.createJadwalProduksi);
router.get("/", jadwalProduksiController.getJadwalProduksi);
router.put("/:id", jadwalProduksiController.updateJadwalProduksi);
router.delete("/:id", jadwalProduksiController.deleteJadwalProduksi);

module.exports = router;