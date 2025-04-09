// frontend/src/components/produkForm.js
import React, { useEffect, useState } from "react";
import { Box, FormControl, FormLabel, Input, Textarea, Button, VStack } from "@chakra-ui/react";

const ProdukForm = ({ onSubmit, initialProduk = null }) => {
  const [nama, setNama] = useState("");
  const [resep, setResep] = useState("");
  const [caraBuat, setCaraBuat] = useState("");

  useEffect(() => {
    if (initialProduk) {
      setNama(initialProduk.nama || "");
      setResep(initialProduk.resep || "");
      setCaraBuat(initialProduk.cara_buat || "");
    } else {
      setNama("");
      setResep("");
      setCaraBuat("");
    }
  }, [initialProduk]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      nama,
      resep,
      cara_buat: caraBuat,
      _id: initialProduk ? initialProduk._id : undefined,
    });
  };

  return (
    <Box as="form" onSubmit={handleSubmit} p={4} borderWidth={1} borderRadius="md">
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Nama Produk</FormLabel>
          <Input value={nama} onChange={(e) => setNama(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Resep</FormLabel>
          <Textarea value={resep} onChange={(e) => setResep(e.target.value)} rows={3} />
        </FormControl>
        <FormControl>
          <FormLabel>Cara Buat</FormLabel>
          <Textarea value={caraBuat} onChange={(e) => setCaraBuat(e.target.value)} rows={3} />
        </FormControl>
        <Button colorScheme="green" type="submit" width="full">
          {initialProduk ? "Update Produk" : "Tambah Produk"}
        </Button>
      </VStack>
    </Box>
  );
};

export default ProdukForm;