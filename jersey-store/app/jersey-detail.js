// app/jersey-detail.js

import React, { useContext, useState } from "react";
import { ScrollView, Image, Pressable } from "react-native";
import {
  Box,
  Heading,
  Text,
  HStack,
  Button,
  ButtonText,
  Icon,
} from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";

// Import Cart Context
import { CartContext } from "./_layout";

export default function JerseyDetail() {
  const router = useRouter();
  const { addToCart } = useContext(CartContext);

  const params = useLocalSearchParams();
  const { id, name, image, price, club, league, description } = params;

  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (!id || !name || !price) {
      alert("Data jersey tidak valid!");
      return;
    }

    addToCart(
      {
        id,
        name,
        image,
        price: Number(price),
        category: club,
      },
      quantity
    );

    alert("Jersey berhasil ditambahkan ke keranjang!");
  };

  return (
    <ScrollView>
      {/* Banner */}
      <Box position="relative">
        <Image
          source={{ uri: image }}
          style={{ width: "100%", height: 330, resizeMode: "cover" }}
        />

        {/* Back Button */}
        <Pressable
          onPress={() => router.back()}
          style={{
            position: "absolute",
            top: 50,
            left: 20,
            backgroundColor: "rgba(0,0,0,0.4)",
            padding: 8,
            borderRadius: 50,
          }}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </Pressable>
      </Box>

      {/* Content */}
      <Box p="$4">
        <Heading size="xl" color="#111827">
          {name}
        </Heading>

        <HStack space="$4" mt="$3">
          <Text fontWeight="$bold">{club}</Text>
          <Text color="#6b7280">{league}</Text>
        </HStack>

        <Text color="#dc2626" fontWeight="bold" fontSize="$xl" mt="$3">
          Rp {Number(price).toLocaleString("id-ID")}
        </Text>

        <Text mt="$4" color="#475569">
          {description || "Deskripsi tidak tersedia"}
        </Text>

        {/* Quantity */}
        <Heading size="md" mt="$8">
          Jumlah
        </Heading>

        <HStack
          mt="$2"
          width={150}
          borderRadius={999}
          bg="#f0fdf4"
          px="$4"
          py="$2"
          justifyContent="space-between"
          alignItems="center"
        >
          <Pressable onPress={() => setQuantity(Math.max(1, quantity - 1))}>
            <Icon as={Ionicons} name="remove-circle" size="xl" color="#10b981" />
          </Pressable>

          <Text fontSize="$lg" fontWeight="$bold">{quantity}</Text>

          <Pressable onPress={() => setQuantity(quantity + 1)}>
            <Icon as={Ionicons} name="add-circle" size="xl" color="#10b981" />
          </Pressable>
        </HStack>

        {/* Add to Cart Button */}
        <Button mt="$6" bg="#10b981" borderRadius={999} onPress={handleAddToCart}>
          <ButtonText color="#fff" fontWeight="bold">
            Tambah ke Keranjang
          </ButtonText>
        </Button>
      </Box>

      <Box height={40} />
    </ScrollView>
  );
}
