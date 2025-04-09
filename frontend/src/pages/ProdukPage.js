import React, { useEffect, useState, useCallback } from "react";
import { Container, VStack, Heading, useToast } from "@chakra-ui/react";
import ProdukForm from "./components/ProdukForm";
import ProdukList from "./components/ProdukList";
import * as produkService from "../services/produkService";

const ProdukPage = () => {
  const [produk, setProduk] = useState([]);
  const [editingProduk, setEditingProduk] = useState(null);
  const toast = useToast();

  const fetchProduk = useCallback(async () => {
    try {
      const data = await produkService.getProduk();
      setProduk(data);
    } catch (error) {
      toast({
        title: "Gagal mengambil produk",
        status: "error",
        isClosable: true,
      });
    }
  }, [toast]);

  useEffect(() => {
    fetchProduk();
  }, [fetchProduk]);

  const handleAddOrUpdate = async (data) => {
    try {
      let updatedProduk;
      if (data._id) {
        updatedProduk = await produkService.updateProduk(data._id, data);
        setProduk((prev) => prev.map((p) => (p._id === data._id ? updatedProduk : p)));
        toast({ title: "Produk diperbarui", status: "success", isClosable: true });
      } else {
        updatedProduk = await produkService.createProduk(data);
        setProduk((prev) => [updatedProduk, ...prev]);
        toast({ title: "Produk ditambahkan", status: "success", isClosable: true });
      }
      setEditingProduk(null);
    } catch {
      toast({ title: "Gagal menyimpan produk", status: "error", isClosable: true });
    }
  };

  const handleDelete = async (id) => {
    try {
      await produkService.deleteProduk(id);
      setProduk((prev) => prev.filter((p) => p._id !== id));
      toast({ title: "Produk dihapus", status: "success", isClosable: true });
    } catch {
      toast({ title: "Gagal menghapus produk", status: "error", isClosable: true });
    }
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={8}>
        <Heading>Manajemen Produk</Heading>
        <ProdukForm onSubmit={handleAddOrUpdate} initialProduk={editingProduk} />
        <ProdukList produk={produk} onEdit={setEditingProduk} onDelete={handleDelete} />
      </VStack>
    </Container>
  );
};

export default ProdukPage;