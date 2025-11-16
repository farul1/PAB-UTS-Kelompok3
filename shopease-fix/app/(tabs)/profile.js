import React from "react";
import { ScrollView as RNScrollView } from "react-native";
import {
  Box,
  Text,
  Heading,
  Avatar,
  HStack,
  VStack,
  Pressable,
  Icon,
} from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons";

const user = {
  name: "Syafarul Priwantoro",
  email: "syafarul@example.com",
  avatar: "https://i.pravatar.cc/300?img=3",
  stats: {
    orders: 12,
    wishlist: 8,
    reviews: 5,
  },
};

const menuItems = [
  {
    id: 1,
    title: "My Orders",
    subtitle: "View your order history",
    icon: "cube-outline",
  },
  {
    id: 2,
    title: "Wishlist",
    subtitle: "Saved items for later",
    icon: "heart-outline",
  },
  {
    id: 3,
    title: "Account Settings",
    subtitle: "Manage your profile & password",
    icon: "settings-outline",
  },
  {
    id: 4,
    title: "Help Center",
    subtitle: "FAQ and support",
    icon: "help-circle-outline",
  },
  {
    id: 5,
    title: "Logout",
    subtitle: "Sign out from your account",
    icon: "log-out-outline",
  },
];

const Profile = () => {
  return (
    <RNScrollView showsVerticalScrollIndicator={false}>
      <Box flex={1} bg="#fafafc" px="$4" py="$5">

        {/* PROFILE HEADER */}
        <VStack alignItems="center" mb="$6">
          <Avatar
            size="2xl"
            source={{ uri: user.avatar }}
            mb="$3"
            borderWidth={3}
            borderColor="#7c3aed"
          />

          <Heading size="lg" color="#4c1d95">
            {user.name}
          </Heading>
          <Text color="#6b7280" fontSize="$sm" mt="$1">
            {user.email}
          </Text>
        </VStack>

        {/* USER STATS */}
        <HStack
          justifyContent="space-between"
          bg="#ede9fe"
          borderRadius="$xl"
          p="$4"
          mb="$6"
        >
          <VStack flex={1} alignItems="center">
            <Heading size="md" color="#6d28d9">
              {user.stats.orders}
            </Heading>
            <Text color="#5b21b6" fontSize="$sm">Orders</Text>
          </VStack>

          <Box width={1} bg="#dcd3fe" mx="$1" />

          <VStack flex={1} alignItems="center">
            <Heading size="md" color="#6d28d9">
              {user.stats.wishlist}
            </Heading>
            <Text color="#5b21b6" fontSize="$sm">Wishlist</Text>
          </VStack>

          <Box width={1} bg="#dcd3fe" mx="$1" />

          <VStack flex={1} alignItems="center">
            <Heading size="md" color="#6d28d9">
              {user.stats.reviews}
            </Heading>
            <Text color="#5b21b6" fontSize="$sm">Reviews</Text>
          </VStack>
        </HStack>

        {/* MENU SECTION */}
        <VStack space="md">
          {menuItems.map((item) => (
            <Pressable
              key={item.id}
              onPress={() => {
                if (item.title === "Logout") {
                  alert("Anda berhasil logout!");
                } else {
                  alert(`Navigasi ke: ${item.title}`);
                }
              }}
            >
              <HStack
                alignItems="center"
                bg="#ffffff"
                p="$4"
                borderRadius="$xl"
                shadowColor="#000"
                shadowOpacity={0.08}
                shadowRadius={4}
                shadowOffset={{ width: 0, height: 2 }}
              >
                <Box
                  bg="#ede9fe"
                  p="$2"
                  borderRadius="$full"
                  mr="$3"
                >
                  <Icon
                    as={Ionicons}
                    name={item.icon}
                    size="lg"
                    color="#6d28d9"
                  />
                </Box>

                <VStack flex={1}>
                  <Text fontWeight="$bold" fontSize="$md" color="#4b5563">
                    {item.title}
                  </Text>
                  <Text color="#6b7280" fontSize="$sm">
                    {item.subtitle}
                  </Text>
                </VStack>

                <Icon
                  as={Ionicons}
                  name="chevron-forward-outline"
                  size="md"
                  color="#9ca3af"
                />
              </HStack>
            </Pressable>
          ))}
        </VStack>
      </Box>
    </RNScrollView>
  );
};

export default Profile;
