import React, { useContext } from "react";
import { Pressable } from "react-native";
import { HStack, Text, Heading, Icon, Box, Badge, BadgeText } from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { CartContext } from "../app/_layout"; // <=== path diperbaiki

export default function Header() {
  const router = useRouter();
  const { cartItems } = useContext(CartContext);

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <HStack
      justifyContent="space-between"
      alignItems="center"
      bg="#e9eefeff"
      px={20}
      py={16}
      borderRadius={20}
      mb={20}
    >
      {/* Logo */}
      <Box>
        <Heading size="lg" color="#185eadff">JerseyStore</Heading>
        <Text fontSize="$xs" color="#185eadff">Sport Apparel Shop</Text>
      </Box>

      {/* Cart */}
      <Pressable onPress={() => router.push("/(tabs)/cart")}>
        <Box position="relative">
          <Icon as={Ionicons} name="cart-outline" size="xl" color="#185eadff" />
          {cartCount > 0 && (
            <Badge
              bg="#ef4444"
              borderRadius={9999}
              position="absolute"
              top={-6}
              right={-10}
              px={6}
              py={2}
            >
              <BadgeText fontSize={10} color="#fff">{cartCount}</BadgeText>
            </Badge>
          )}
        </Box>
      </Pressable>
    </HStack>
  );
}
