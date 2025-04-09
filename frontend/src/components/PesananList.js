import React from "react";
import { Box, VStack, Heading, Text, IconButton, HStack, Checkbox } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

const PesananList = ({ pesanan, onDelete, onEdit }) => {
  return (
    <VStack spacing={4} width="full">
      {pesanan.map((item) => (
        <Box key={item._id} width="full" p={4} background="blue.100" borderWidth={1} borderRadius="md">
          <HStack justifyContent="space-between" alignItems="start">
            <Box flex={1}>
              <Heading size="md" mb={2}>{item.produk}</Heading>
              <Text><strong>Spesifikasi:</strong> {item.spesifikasi}</Text>
              <Text><strong>Waktu Siap:</strong> {item.waktu_siap}</Text>
              <Text><strong>Waktu Antar:</strong> {item.waktu_antar}</Text>
              <Text><strong>Tipe Packaging:</strong> {item.tipe_packaging}</Text>
              <Text>
                <strong>Kartu Nama:</strong>{" "}
                <Checkbox isChecked={item.perlu_kartu_nama} isReadOnly />
              </Text>
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

export default PesananList;