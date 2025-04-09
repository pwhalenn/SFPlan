import React, { useEffect, useState, useCallback } from "react";
import { Container, VStack, Heading, useToast } from "@chakra-ui/react";
import JadwalProduksiForm from "../components/jadwalProduksiForm";
import JadwalProduksiList from "../components/jadwalProduksiList";
import * as jadwalService from "../services/jadwalService";

const JadwalProduksiPage = () => {
  const [jadwal, setJadwal] = useState([]);
  const [editingJadwal, setEditingJadwal] = useState(null);
  const toast = useToast();

  const fetchJadwal = useCallback(async () => {
    try {
      const data = await jadwalService.getJadwalProduksi();
      setJadwal(data);
    } catch {
      toast({ title: "Gagal mengambil jadwal", status: "error", isClosable: true });
    }
  }, [toast]);

  useEffect(() => {
    fetchJadwal();
  }, [fetchJadwal]);

  const handleAddOrUpdate = async (data) => {
    try {
      let updated;
      if (data._id) {
        updated = await jadwalService.updateJadwalProduksi(data._id, data);
        setJadwal((prev) => prev.map((j) => (j._id === data._id ? updated : j)));
        toast({ title: "Jadwal diperbarui", status: "success", isClosable: true });
      } else {
        updated = await jadwalService.createJadwalProduksi(data);
        setJadwal((prev) => [updated, ...prev]);
        toast({ title: "Jadwal ditambahkan", status: "success", isClosable: true });
      }
      setEditingJadwal(null);
    } catch {
      toast({ title: "Gagal menyimpan jadwal", status: "error", isClosable: true });
    }
  };

  const handleDelete = async (id) => {
    try {
      await jadwalService.deleteJadwalProduksi(id);
      setJadwal((prev) => prev.filter((j) => j._id !== id));
      toast({ title: "Jadwal dihapus", status: "success", isClosable: true });
    } catch {
      toast({ title: "Gagal menghapus jadwal", status: "error", isClosable: true });
    }
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={8}>
        <Heading>Jadwal Produksi</Heading>
        <JadwalProduksiForm onSubmit={handleAddOrUpdate} initialJadwal={editingJadwal} />
        <JadwalProduksiList jadwal={jadwal} onEdit={setEditingJadwal} onDelete={handleDelete} />
      </VStack>
    </Container>
  );
};

export default JadwalProduksiPage;