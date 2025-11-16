import React, { useState, useContext } from "react";
import { ScrollView, Alert, Image as RNImage } from "react-native";
import {
  Box,
  Text,
  Heading,
  HStack,
  VStack,
  Button,
  ButtonText,
  Icon,
  Divider,
  Pressable,
} from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { CartContext } from "./_layout";
import { formatPrice } from "../../data/products";

const ProductDetail = () => {
  const { addToCart } = useContext(CartContext);
  const router = useRouter();

  const params = useLocalSearchParams();
  const {
    id = "",
    name = "",
    price = 0,
    image = "",
    rating = "",
    stock = 0,
    description = "",
    features = "",
    category = "",
  } = params;

  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart(
      {
        id,
        name,
        price: parseInt(price, 10) || 0,
        image,
        category,
      },
      quantity
    );

    Alert.alert("Berhasil", "Produk ditambahkan ke keranjang!");
  };

  const featureList =
    typeof features === "string"
      ? features.split(",").map((f) => f.trim())
      : Array.isArray(features)
      ? features
      : [];

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: "#faf7ff" }}>
      
      {/* ======================= IMAGE HEADER ======================= */}
      <Box position="relative">
        <RNImage
          source={{ uri: image || "https://via.placeholder.com/200" }}
          style={{ width: "100%", height: 330, resizeMode: "cover" }}
        />

        {/* Overlay for readability */}
        <Box
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          height={120}
          style={{
            backgroundImage: "linear-gradient(transparent, rgba(0,0,0,0.65))",
          }}
        />

        {/* BACK BUTTON FIX */}
        <Pressable
          position="absolute"
          top={50}
          left={20}
          bg="#fff"
          p="$2"
          borderRadius="$full"
          style={{
            shadowColor: "#000",
            shadowOpacity: 0.2,
            shadowRadius: 5,
            elevation: 5,
          }}
          onPress={() => router.back()}
        >
          <Icon as={Ionicons} name="arrow-back" size="lg" color="#4c1d95" />
        </Pressable>
      </Box>

      {/* ======================= CONTENT ======================= */}
      <Box p="$4">
        
        {/* Title */}
        <Heading size="xl" mb="$2" style={{ color: "#3b0764" }}>
          {name}
        </Heading>

        {/* CATEGORY - RATING - STOCK */}
        <HStack space="md" alignItems="center" mb="$3">
          
          {category ? (
            <Box bg="#ede9fe" px="$3" py="$1" borderRadius={9999}>
              <Text style={{ color: "#5b21b6", fontWeight: "bold" }}>{category}</Text>
            </Box>
          ) : null}

          <HStack alignItems="center">
            <Icon as={Ionicons} name="star" size="sm" color="#fbbf24" />
            <Text ml="$1" style={{ color: "#4b5563", fontWeight: "600" }}>
              {rating}
            </Text>
          </HStack>

          <Text
            style={{
              fontWeight: "700",
              color: stock > 0 ? "#059669" : "#dc2626",
            }}
          >
            {stock > 0 ? `${stock} stok` : "Stok habis"}
          </Text>
        </HStack>

        {/* Price */}
        <Text style={{ fontSize: 22, fontWeight: "bold", color: "#6d28d9" }}>
          {formatPrice(parseInt(price, 10) || 0)}
        </Text>

        <Divider my="$4" />

        {/* Description */}
        <Text style={{ color: "#374151", fontSize: 15, lineHeight: 22 }}>
          {description || "Tidak ada deskripsi produk."}
        </Text>

        {/* FEATURES */}
        {featureList.length > 0 && (
          <>
            <Heading size="md" mt="$5" mb="$2" color="#4c1d95">
              Fitur Produk
            </Heading>

            <VStack space="sm">
              {featureList.map((feature, idx) => (
                <HStack key={idx} alignItems="center">
                  <Icon
                    as={Ionicons}
                    name="checkmark-circle"
                    size="md"
                    color="#6d28d9"
                    mr="$2"
                  />
                  <Text style={{ color: "#374151", fontSize: 15 }}>{feature}</Text>
                </HStack>
              ))}
            </VStack>
          </>
        )}

        {/* QUANTITY */}
        <Heading size="md" mt="$6" mb="$2" color="#4c1d95">
          Jumlah
        </Heading>

        <HStack
          bg="#ede9fe"
          px="$4"
          py="$2"
          borderRadius="$full"
          alignItems="center"
          justifyContent="space-between"
          width={160}
          mb="$6"
        >
          <Pressable onPress={() => setQuantity((q) => Math.max(1, q - 1))}>
            <Icon as={Ionicons} name="remove-circle-outline" size="xl" color="#6d28d9" />
          </Pressable>

          <Text style={{ fontSize: 18, fontWeight: "bold" }}>{quantity}</Text>

          <Pressable onPress={() => setQuantity((q) => q + 1)}>
            <Icon as={Ionicons} name="add-circle-outline" size="xl" color="#6d28d9" />
          </Pressable>
        </HStack>

        {/* ADD TO CART BUTTON */}
        <Button
          bg="#6d28d9"
          borderRadius="$full"
          py="$2"
          onPress={handleAddToCart}
          style={{
            shadowColor: "#6d28d9",
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 6,
          }}
        >
          <ButtonText style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
            Tambahkan ke Keranjang
          </ButtonText>
        </Button>

      </Box>

      <Box height={60} />
    </ScrollView>
  );
};

export default ProductDetail;
