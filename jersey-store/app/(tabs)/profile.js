import React from "react";
import { Box, Text, Heading, VStack, HStack, Icon, Pressable } from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons";

export default function Profile() {
  const menuItems = [
    { icon: "person-outline", title: "Edit Profil", description: "Ubah data pribadi Anda", color: "#4f46e5" },
    { icon: "card-outline", title: "Pembayaran", description: "Metode pembayaran & riwayat", color: "#059669" },
    { icon: "location-outline", title: "Alamat", description: "Kelola alamat pengiriman", color: "#dc2626" },
    { icon: "settings-outline", title: "Pengaturan", description: "Preferensi aplikasi", color: "#7c3aed" },
  ];

  return (
    <Box flex={1} bg="#f8fafc">
      {/* Header */}
      <Box
        bg={{
          linearGradient: { colors: ["#4f46e5", "#7c3aed"], start: [0, 0], end: [1, 0] }
        }}
        pt={60}
        px={20}
        pb={32}
        borderBottomLeftRadius={30}
        borderBottomRightRadius={30}
      >
        <VStack alignItems="center" space={16}>
          {/* Avatar */}
          <Box bg="white" p={4} borderRadius={9999} shadow="md">
            <Icon as={Ionicons} name="person-circle" size={100} color="#4f46e5" />
          </Box>

          {/* User Info */}
          <VStack alignItems="center" space={4}>
            <Heading size="xl" color="black" fontWeight="bold">Ahmad Ilman Nafia</Heading>
            <HStack alignItems="center" space={8}>
              <Box bg="rgba(0, 0, 0, 0.2)" px={12} py={4} borderRadius={20}>
                <Text color="black" fontSize={14} fontWeight="medium">🏆 Jersey Collector</Text>
              </Box>
              <Text color="#263f8fff" fontSize={14}>Since 2025</Text>
            </HStack>
          </VStack>
        </VStack>
      </Box>

      {/* Account Info Card */}
      <Box
        bg="white"
        mt={-24}
        mx={20}
        p={20}
        borderRadius={20}
        shadow="lg"
        shadowColor="#000"
        shadowOpacity={0.1}
        shadowRadius={15}
        elevation={5}
      >
        <HStack justifyContent="space-between" alignItems="center" mb={16}>
          <Heading size="lg" color="#1e293b">Informasi Akun</Heading>
          <Box bg="#f1f5f9" px={12} py={6} borderRadius={12}>
            <Text color="#4f46e5" fontSize={14} fontWeight="bold">Premium</Text>
          </Box>
        </HStack>

        {/* Email */}
        <HStack alignItems="center" space={16} p={16} bg="#f8fafc" borderRadius={12} mb={12}>
          <Box bg="#4f46e5" p={8} borderRadius={10}>
            <Icon as={Ionicons} name="mail" size={20} color="white" />
          </Box>
          <VStack flex={1}>
            <Text fontSize={16} fontWeight="medium" color="#1e293b">Email</Text>
            <Text fontSize={14} color="#64748b">AhmadIlman@gmail.com</Text>
          </VStack>
        </HStack>

        {/* Membership */}
        <HStack alignItems="center" space={16} p={16} bg="#f8fafc" borderRadius={12}>
          <Box bg="#f59e0b" p={8} borderRadius={10}>
            <Icon as={Ionicons} name="diamond" size={20} color="white" />
          </Box>
          <VStack flex={1}>
            <Text fontSize={16} fontWeight="medium" color="#1e293b">Membership</Text>
            <Text fontSize={14} color="#64748b">Premium - Berlaku hingga Dec 2025
                
            </Text>
          </VStack>
          <Icon as={Ionicons} name="chevron-forward" size={20} color="#94a3b8" />
        </HStack>
      </Box>

      {/* Menu Items */}
      <VStack space={12} mt={24} px={20}>
        <Heading size="md" color="#1e293b" mb={8}>Menu Lainnya</Heading>
        {menuItems.map((item, index) => (
          <Pressable key={index}>
            {({ pressed }) => (
              <HStack
                alignItems="center"
                space={16}
                p={16}
                bg="white"
                borderRadius={16}
                shadow="sm"
                shadowColor="#000"
                shadowOpacity={0.05}
                opacity={pressed ? 0.7 : 1}
              >
                <Box bg={item.color} p={10} borderRadius={12}>
                  <Icon as={Ionicons} name={item.icon} size={20} color="white" />
                </Box>
                <VStack flex={1}>
                  <Text fontSize={16} fontWeight="medium" color="#1e293b">{item.title}</Text>
                  <Text fontSize={14} color="#64748b">{item.description}</Text>
                </VStack>
                <Icon as={Ionicons} name="chevron-forward" size={20} color="#94a3b8" />
              </HStack>
            )}
          </Pressable>
        ))}
      </VStack>

      {/* Logout Button */}
      <Pressable mt={32} px={20}>
        {({ pressed }) => (
          <HStack
            alignItems="center"
            justifyContent="center"
            space={12}
            p={16}
            bg={pressed ? "#fee2e2" : "#446cefff"}
            borderRadius={16}
            mb={20}
          >
            <Icon as={Ionicons} name="log-out-outline" size={20} color="white" />
            <Text fontSize={16} fontWeight="bold" color="white">Keluar Akun</Text>
          </HStack>
        )}
      </Pressable>
    </Box>
  );
}
