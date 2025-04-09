// frontend/src/components/pesananForm.js
import React, { useEffect, useState } from "react";
import { Box, FormControl, FormLabel, Input, Textarea, Button, VStack } from "@chakra-ui/react";

const PesananForm = ({ onSubmit, initialPesanan = null }) => {
  const [produk, setProduk] = useState("");
  const [spesifikasi, setSpesifikasi] = useState("");
  const [waktuSiap, setWaktuSiap] = useState("");
  const [waktuAntar, setWaktuAntar] = useState("");
  const [perluKartuNama, setPerluKartuNama] = useState(false);
  const [tipePackaging, setTipePackaging] = useState("");

  useEffect(() => {
    if (initialPesanan) {
      setProduk(initialPesanan.produk || "");
      setSpesifikasi(initialPesanan.spesifikasi || "");
      setWaktuSiap(initialPesanan.waktu_siap || "");
      setWaktuAntar(initialPesanan.waktu_antar || "");
      setTipePackaging(initialPesanan.tipe_packaging || "");
      setPerluKartuNama(initialPesanan.perlu_kartu_nama || false);
    }
  }, [initialPesanan]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      produk,
      spesifikasi,
      waktu_siap: waktuSiap,
      waktu_antar: waktuAntar,
      tipe_packaging: tipePackaging,
      perlu_kartu_nama: perluKartuNama,
      _id: initialPesanan ? initialPesanan._id : undefined,
    });
  };

  return (
    <Box as="form" onSubmit={handleSubmit} p={4} borderWidth={1} borderRadius="md">
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Produk</FormLabel>
          <Input value={produk} onChange={(e) => setProduk(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Spesifikasi</FormLabel>
          <Textarea value={spesifikasi} onChange={(e) => setSpesifikasi(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Waktu Siap</FormLabel>
          <Input type="datetime-local" value={waktuSiap} onChange={(e) => setWaktuSiap(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Waktu Antar</FormLabel>
          <Input type="datetime-local" value={waktuAntar} onChange={(e) => setWaktuAntar(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Tipe Packaging</FormLabel>
          <Input value={tipePackaging} onChange={(e) => setTipePackaging(e.target.value)} />
        </FormControl>
        <FormControl display="flex" alignItems="center">
          <FormLabel mb="0">Perlu Kartu Nama?</FormLabel>
          <Input type="checkbox" isChecked={perluKartuNama} onChange={(e) => setPerluKartuNama(e.target.checked)} />
        </FormControl>
        <Button colorScheme="blue" type="submit" width="full">
          {initialPesanan ? "Update Pesanan" : "Tambah Pesanan"}
        </Button>
      </VStack>
    </Box>
  );
};

export default PesananForm;