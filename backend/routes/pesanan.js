const express = require("express");
const router = express.Router();
const pesananController = require("../controllers/pesananController");

router.post("/", pesananController.createPesanan);
router.get("/", pesananController.getPesanan);
router.put("/:id", pesananController.updatePesanan);
router.delete("/:id", pesananController.deletePesanan);

module.exports = router;
