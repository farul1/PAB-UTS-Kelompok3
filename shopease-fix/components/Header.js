import React from "react";
import { Pressable } from "react-native";
import {
  Box,
  HStack,
  Heading,
  Text,
  Icon,
  Badge,
  BadgeText,
} from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const Header = ({ cartCount = 0 }) => {
  const router = useRouter();

  return (
    <HStack
      justifyContent="space-between"
      alignItems="center"
      bg="#f5f3ff"
      px={20}
      py={16}
      borderRadius={20}
      mb={16}
      shadowColor="#000"
      shadowOpacity={0.05}
      shadowRadius={6}
      elevation={3}
    >
      {/* LOGO */}
      <Box>
        <Heading size="lg" color="#5b21b6" fontWeight="bold">
          ShopEase
        </Heading>
        <Text fontSize="$xs" color="#7c3aed">
          Your Smart Shopping Partner
        </Text>
      </Box>

      {/* RIGHT ICON GROUP */}
      <HStack alignItems="center" space="lg">
        
        {/* NOTIFICATION ICON */}
        <Pressable onPress={() => alert("Notifikasi belum diimplementasi")}>
          <Icon
            as={Ionicons}
            name="notifications-outline"
            size="xl"
            color="#6d28d9"
          />
        </Pressable>

        {/* CART ICON */}
        <Pressable onPress={() => router.push("/(tabs)/cart")}>
          <Box position="relative">
            <Icon
              as={Ionicons}
              name="cart-outline"
              size="xl"
              color="#6d28d9"
            />

            {/* BADGE COUNT */}
            {cartCount > 0 && (
              <Badge
                bg="#ef4444"
                borderRadius={9999}
                position="absolute"
                top={-4}
                right={-10}
                px={6}
                py={2}
              >
                <BadgeText fontSize={10} color="#fff">
                  {cartCount}
                </BadgeText>
              </Badge>
            )}
          </Box>
        </Pressable>
      </HStack>
    </HStack>
  );
};

export default Header;
