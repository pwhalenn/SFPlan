import React, { useEffect, useState } from "react";
import { Box, FormControl, FormLabel, Input, Button, VStack } from "@chakra-ui/react";

const JadwalProduksiForm = ({ onSubmit, initialJadwal = null }) => {
  const [produk, setProduk] = useState("");
  const [waktuMulai, setWaktuMulai] = useState("");
  const [waktuSelesai, setWaktuSelesai] = useState("");

  useEffect(() => {
    if (initialJadwal) {
      setProduk(initialJadwal.produk || "");
      setWaktuMulai(initialJadwal.waktu_mulai || "");
      setWaktuSelesai(initialJadwal.waktu_selesai || "");
    } else {
      setProduk("");
      setWaktuMulai("");
      setWaktuSelesai("");
    }
  }, [initialJadwal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      produk,
      waktu_mulai: waktuMulai,
      waktu_selesai: waktuSelesai,
      _id: initialJadwal ? initialJadwal._id : undefined,
    });
  };

  return (
    <Box as="form" onSubmit={handleSubmit} p={4} borderWidth={1} borderRadius="md">
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Produk</FormLabel>
          <Input value={produk} onChange={(e) => setProduk(e.target.value)} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Waktu Mulai</FormLabel>
          <Input type="datetime-local" value={waktuMulai} onChange={(e) => setWaktuMulai(e.target.value)} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Waktu Selesai</FormLabel>
          <Input type="datetime-local" value={waktuSelesai} onChange={(e) => setWaktuSelesai(e.target.value)} />
        </FormControl>
        <Button colorScheme="purple" type="submit" width="full">
          {initialJadwal ? "Update Jadwal" : "Tambah Jadwal"}
        </Button>
      </VStack>
    </Box>
  );
};

export default JadwalProduksiForm;