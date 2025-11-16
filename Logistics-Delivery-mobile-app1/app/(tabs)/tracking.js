import { View, ScrollView, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Box, Text, VStack, HStack, Divider } from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons";
import TrackingDetails from "../../components/TrackingDetails";
import { dummyShipments } from "../../data/dummyData";

export default function TrackingScreen() {
  const [searchText, setSearchText] = useState("");
  const [selectedShipment, setSelectedShipment] = useState(null);

  const filteredShipments = dummyShipments.filter(s =>
    s.trackingNumber.toLowerCase().includes(searchText.toLowerCase()) ||
    s.destination.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <ScrollView style={styles.container}>
      <Box px="$4" py="$4">
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by tracking number or destination"
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {selectedShipment ? (
          <Box mt="$4">
            <TouchableOpacity onPress={() => setSelectedShipment(null)}>
              <HStack alignItems="center" mb="$4">
                <Ionicons name="chevron-back" size={24} color="#0052CC" />
                <Text color="#0052CC" fontWeight="bold">Kembali ke Daftar</Text>
              </HStack>
            </TouchableOpacity>
            <TrackingDetails shipment={selectedShipment} />
          </Box>
        ) : (
          <VStack space="md" mt="$6">
            <Text size="lg" bold>Hasil Pencarian ({filteredShipments.length})</Text>
            {filteredShipments.length > 0 ? (
              filteredShipments.map((shipment) => (
                <TouchableOpacity
                  key={shipment.id}
                  onPress={() => setSelectedShipment(shipment)}
                >
                  <Box bg="$white" p="$4" rounded="$lg" borderWidth={1} borderColor="$gray200">
                    <HStack justifyContent="space-between" alignItems="center">
                      <VStack>
                        <Text size="sm" bold>{shipment.trackingNumber}</Text>
                        <Text size="xs" color="$gray600">{shipment.destination}</Text>
                      </VStack>
                      <Ionicons name="chevron-forward" size={20} color="#0052CC" />
                    </HStack>
                  </Box>
                </TouchableOpacity>
              ))
            ) : (
              <Box bg="$gray100" p="$6" rounded="$lg" alignItems="center">
                <Ionicons name="search" size={40} color="#ccc" style={{ marginBottom: 12 }} />
                <Text color="$gray600">Tidak ada pengiriman ditemukan</Text>
              </Box>
            )}
          </VStack>
        )}
      </Box>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    marginTop: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    color: "#333",
  },
});
