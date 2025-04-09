import React, { useEffect, useState, useCallback } from "react";
import { Container, VStack, Heading, useToast } from "@chakra-ui/react";
import PesananForm from "../components/pesananForm";
import PesananList from "../components/pesananList";
import * as pesananService from "../services/pesananService";

const PesananPage = () => {
  const [pesanan, setPesanan] = useState([]);
  const [editingPesanan, setEditingPesanan] = useState(null);
  const toast = useToast();

  const fetchPesanan = useCallback(async () => {
    try {
      const data = await pesananService.getPesanan();
      setPesanan(data);
    } catch {
      toast({ title: "Gagal mengambil pesanan", status: "error", isClosable: true });
    }
  }, [toast]);

  useEffect(() => {
    fetchPesanan();
  }, [fetchPesanan]);

  const handleAddOrUpdate = async (data) => {
    try {
      let updated;
      if (data._id) {
        updated = await pesananService.updatePesanan(data._id, data);
        setPesanan((prev) => prev.map((p) => (p._id === data._id ? updated : p)));
        toast({ title: "Pesanan diperbarui", status: "success", isClosable: true });
      } else {
        updated = await pesananService.createPesanan(data);
        setPesanan((prev) => [updated, ...prev]);
        toast({ title: "Pesanan ditambahkan", status: "success", isClosable: true });
      }
      setEditingPesanan(null);
    } catch {
      toast({ title: "Gagal menyimpan pesanan", status: "error", isClosable: true });
    }
  };

  const handleDelete = async (id) => {
    try {
      await pesananService.deletePesanan(id);
      setPesanan((prev) => prev.filter((p) => p._id !== id));
      toast({ title: "Pesanan dihapus", status: "success", isClosable: true });
    } catch {
      toast({ title: "Gagal menghapus pesanan", status: "error", isClosable: true });
    }
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={8}>
        <Heading>Manajemen Pesanan</Heading>
        <PesananForm onSubmit={handleAddOrUpdate} initialPesanan={editingPesanan} />
        <PesananList pesanan={pesanan} onEdit={setEditingPesanan} onDelete={handleDelete} />
      </VStack>
    </Container>
  );
};

export default PesananPage;