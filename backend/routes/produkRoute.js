const express = require("express");
const router = express.Router();
const produkController = require("../controllers/produkController");

router.post("/", produkController.createProduk);
router.get("/", produkController.getProduk);
router.put("/:id", produkController.updateProduk);
router.delete("/:id", produkController.deleteProduk);

module.exports = router;
