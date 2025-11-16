import React from "react";
import { Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Box, Image, Heading, Text } from "@gluestack-ui/themed";

const formatPrice = (price) => {
  const value = Number(price);
  if (isNaN(value)) return "Rp 0";
  return `Rp ${value.toLocaleString("id-ID")}`;
};

const ProductCard = ({ item }) => {
  const router = useRouter();
  if (!item) return null;

  const handlePress = () => {
    router.push({
      pathname: "/product-detail",
      params: {
        id: item.id || "",
        name: item.name || "",
        price: item.price != null ? Number(item.price) : 0,
        image: item.image || "",
        category: item.category || "",
        description: item.description || "",
        rating: item.rating != null ? Number(item.rating) : 0,
        stock: item.stock != null ? Number(item.stock) : 0,
        features: Array.isArray(item.features)
          ? item.features.join(",")
          : item.features || "",
      },
    });
  };

  return (
    <Pressable onPress={handlePress}>
      <Box
        backgroundColor="#ffffff"
        padding={12}
        margin={8}
        borderRadius={12}
        borderWidth={1}
        borderColor="#e5e7eb"
        alignItems="center"
      >
        <Image
          source={{
            uri: item.image || "https://via.placeholder.com/150",
          }}
          alt={item.name || "Produk"}
          width={100}
          height={100}
          borderRadius={10}
          style={{ resizeMode: "cover" }}
        />

        <Heading
          size="sm"
          marginTop={8}
          textAlign="center"
          color="#6d28d9"
        >
          {item.name}
        </Heading>

        <Text fontSize={12} color="#6b7280">
          {formatPrice(item.price)}
        </Text>
      </Box>
    </Pressable>
  );
};

export default ProductCard;
