import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Box, Text, VStack, HStack, Divider, Badge } from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons";
import DeliveryHistoryCard from "../../components/DeliveryHistoryCard";
import { dummyShipments, userData } from "../../data/dummyData";

export default function ProfileScreen() {
  const [filter, setFilter] = useState("all");

  const deliveryHistory = dummyShipments.filter(s =>
    filter === "all" || s.status === filter
  );

  const stats = {
    delivered: dummyShipments.filter(s => s.status === "delivered").length,
    inTransit: dummyShipments.filter(s => s.status === "in-transit").length,
    pending: dummyShipments.filter(s => s.status === "pending").length,
  };

  return (
    <ScrollView style={styles.container}>
      <Box px="$4" py="$4">
        {/* User Profile Section */}
        <Box bg="$blue500" p="$6" rounded="$lg" mb="$6">
          <HStack alignItems="center" space="md">
            <Box bg="$white" width={60} height={60} rounded="$full" alignItems="center" justifyContent="center">
              <Ionicons name="person" size={32} color="#0052CC" />
            </Box>
            <VStack>
              <Text size="lg" bold color="$white">{userData.name}</Text>
              <Text size="sm" color="$white">{userData.email}</Text>
              <Text size="xs" color="$white">{userData.phone}</Text>
            </VStack>
          </HStack>
        </Box>

        {/* Statistics */}
        <Text size="lg" bold mb="$4">Statistik Pengiriman</Text>
        <VStack space="md" mb="$6">
          <Box bg="$green500" p="$4" rounded="$lg" flexDirection="row" justifyContent="space-between" alignItems="center">
            <VStack>
              <Text size="xs" color="$white" mb="$1">Terkirim</Text>
              <Text size="2xl" bold color="$white">{stats.delivered}</Text>
            </VStack>
            <Ionicons name="checkmark-circle" size={40} color="#fff" />
          </Box>

          <Box bg="$orange500" p="$4" rounded="$lg" flexDirection="row" justifyContent="space-between" alignItems="center">
            <VStack>
              <Text size="xs" color="$white" mb="$1">Dalam Perjalanan</Text>
              <Text size="2xl" bold color="$white">{stats.inTransit}</Text>
            </VStack>
            <Ionicons name="navigate" size={40} color="#fff" />
          </Box>

          <Box bg="$yellow400" p="$4" rounded="$lg" flexDirection="row" justifyContent="space-between" alignItems="center">
            <VStack>
              <Text size="xs" color="$gray900" mb="$1">Tertunda</Text>
              <Text size="2xl" bold color="$gray900">{stats.pending}</Text>
            </VStack>
            <Ionicons name="time" size={40} color="#333" />
          </Box>
        </VStack>

        {/* Filter Buttons */}
        <Text size="lg" bold mb="$4">Riwayat Pengiriman</Text>
        <HStack space="md" mb="$6">
          {['all', 'delivered', 'in-transit', 'pending'].map((status) => (
            <TouchableOpacity
              key={status}
              onPress={() => setFilter(status)}
              style={[
                styles.filterButton,
                filter === status && styles.filterButtonActive
              ]}
            >
              <Text
                color={filter === status ? "$white" : "#666"}
                fontWeight={filter === status ? "bold" : "normal"}
                textTransform="capitalize"
              >
                {status === 'all' ? 'Semua' : status === 'delivered' ? 'Delivered' : status === 'in-transit' ? 'In Transit' : 'Pending'}
              </Text>
            </TouchableOpacity>
          ))}
        </HStack>

        {/* History List */}
        <VStack space="md" mb="$8">
          {deliveryHistory.length > 0 ? (
            deliveryHistory.map((shipment) => (
              <DeliveryHistoryCard key={shipment.id} shipment={shipment} />
            ))
          ) : (
            <Box bg="$gray100" p="$6" rounded="$lg" alignItems="center">
              <Text color="$gray600">Tidak ada pengiriman ditemukan</Text>
            </Box>
          )}
        </VStack>
      </Box>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  filterButtonActive: {
    backgroundColor: "#0052CC",
    borderColor: "#0052CC",
  },
});
