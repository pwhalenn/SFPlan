// frontend/src/components/produkList.js
import React from "react";
import { Box, VStack, Heading, Text, IconButton, HStack } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

const ProdukList = ({ produk, onDelete, onEdit }) => {
  return (
    <VStack spacing={4} width="full">
      {produk.map((item) => (
        <Box key={item._id} width="full" p={4} background="green.100" borderWidth={1} borderRadius="md">
          <HStack justifyContent="space-between" alignItems="start">
            <Box flex={1}>
              <Heading size="md" mb={2}>{item.nama}</Heading>
              <Text><strong>Resep:</strong> {item.resep}</Text>
              <Text><strong>Cara Buat:</strong> {item.cara_buat}</Text>
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

export default ProdukList;