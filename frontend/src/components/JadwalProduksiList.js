import React from "react";
import { Box, VStack, Heading, Text, IconButton, HStack } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

const JadwalProduksiList = ({ jadwal, onDelete, onEdit }) => {
  return (
    <VStack spacing={4} width="full">
      {jadwal.map((item) => (
        <Box key={item._id} width="full" p={4} background="purple.100" borderWidth={1} borderRadius="md">
          <HStack justifyContent="space-between" alignItems="start">
            <Box flex={1}>
              <Heading size="md" mb={2}>{item.produk}</Heading>
              <Text><strong>Waktu Mulai:</strong> {item.waktu_mulai}</Text>
              <Text><strong>Waktu Selesai:</strong> {item.waktu_selesai}</Text>
            </Box>
            <HStack>
              <IconButton icon={<EditIcon />} colorScheme="blue" onClick={() => onEdit(item)} />
              <IconButton icon={<DeleteIcon />} colorScheme="red" onClick={() => onDelete(item._id)} />
            </HStack>
          </HStack>
        </Box>
      ))}
    </VStack>
  );
};

export default JadwalProduksiList;