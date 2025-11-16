import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  ButtonText,
  ScrollView,
  Pressable,
} from "@gluestack-ui/themed";
import { Image } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import products from "../data/products";

const ProductDetail = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const product = products.find((p) => p.id === Number(id));

  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] ?? "");
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] ?? "");

  if (!product) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <Text fontSize="$lg" color="$gray600">Product not found.</Text>
      </Box>
    );
  }

  const formatPrice = (price) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);

  return (
    <Box flex={1} bg="$white">
      
      {/* HEADER */}
      <HStack
        p="$4"
        alignItems="center"
        borderBottomWidth={1}
        borderBottomColor="$gray200"
      >
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color="#374151" />
        </Pressable>

        <Heading ml="$3" fontSize="$lg" color="$gray800">
          Product Detail
        </Heading>
      </HStack>

      {/* CONTENT */}
      <ScrollView>
        <Image
          source={{ uri: product.image }}
          style={{ width: '100%', height: 300 }}
          resizeMode="cover"
        />

        <Box p="$4">

          <Heading fontSize="$2xl" color="$gray900">
            {product.name}
          </Heading>

          <Text fontSize="$xl" color="$indigo600" fontWeight="bold" mt="$1">
            {formatPrice(product.price)}
          </Text>

          <Text mt="$3" color="$gray600">
            {product.description}
          </Text>

          <HStack mt="$4" justifyContent="space-between">
            <Text color="$gray500">Category: {product.category}</Text>
            <Text color="$gray500">Stock: {product.stock}</Text>
          </HStack>

          {/* SIZE SELECTOR */}
          <Heading fontSize="$lg" mt="$5" mb="$2" color="$gray800">
            Select Size
          </Heading>

          <HStack space="$md" flexWrap="wrap">
            {product.sizes.map((size) => (
              <Pressable
                key={size}
                onPress={() => setSelectedSize(size)}
                bg={selectedSize === size ? "$indigo600" : "$gray200"}
                px="$3"
                py="$2"
                borderRadius={10}
              >
                <Text
                  color={selectedSize === size ? "$white" : "$gray700"}
                  fontWeight="bold"
                >
                  {size}
                </Text>
              </Pressable>
            ))}
          </HStack>

          {/* COLOR SELECTOR */}
          <Heading fontSize="$lg" mt="$5" mb="$2" color="$gray800">
            Select Color
          </Heading>

          <HStack space="$md" flexWrap="wrap">
            {product.colors.map((color) => (
              <Pressable
                key={color}
                onPress={() => setSelectedColor(color)}
                bg={selectedColor === color ? "$indigo600" : "$gray200"}
                px="$3"
                py="$2"
                borderRadius={10}
              >
                <Text
                  color={selectedColor === color ? "$white" : "$gray700"}
                  fontWeight="bold"
                >
                  {color}
                </Text>
              </Pressable>
            ))}
          </HStack>

        </Box>
      </ScrollView>

      {/* ADD TO CART BUTTON */}
      <Box
        p="$4"
        borderTopWidth={1}
        borderTopColor="$gray200"
        bg="$white"
      >
        <Button
          bg="$indigo600"
          borderRadius={25}
          size="lg"
          onPress={() => {
            alert(
              `Added to cart:\n\n${product.name}\nSize: ${selectedSize}\nColor: ${selectedColor}`
            );
          }}
        >
          <HStack alignItems="center" space="$sm">
            <Ionicons name="cart" size={20} color="white" />
            <ButtonText fontWeight="bold" fontSize="$md">
              Add to Cart
            </ButtonText>
          </HStack>
        </Button>
      </Box>

    </Box>
  );
};

export default ProductDetail;
