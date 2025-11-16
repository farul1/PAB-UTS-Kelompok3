import { View, ScrollView, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { Box, Text, Button, VStack, HStack } from "@gluestack-ui/themed";
import ShipmentCard from "../../components/ShipmentCard";
import { dummyShipments } from "../../data/dummyData";

export default function HomeScreen() {
  const [shipments, setShipments] = useState([]);
  const [activeCount, setActiveCount] = useState(0);

  useEffect(() => {
    // Simulate loading shipments
    setShipments(dummyShipments);
    setActiveCount(dummyShipments.filter(s => s.status === 'in-transit').length);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Box px="$4" py="$4">
        {/* Header Stats */}
        <HStack space="md" mb="$6">
          <Box flex={1} bg="$blue500" rounded="$lg" p="$4">
            <Text size="xs" color="$white" mb="$2">Pengiriman Aktif</Text>
            <Text size="2xl" bold color="$white">{activeCount}</Text>
          </Box>
          <Box flex={1} bg="$orange500" rounded="$lg" p="$4">
            <Text size="xs" color="$white" mb="$2">Total Hari Ini</Text>
            <Text size="2xl" bold color="$white">{shipments.length}</Text>
          </Box>
        </HStack>

        {/* Shipments List */}
        <VStack space="md">
          <Text size="lg" bold mb="$2">Pengiriman Anda</Text>
          {shipments.map((shipment) => (
            <ShipmentCard key={shipment.id} shipment={shipment} />
          ))}
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
});
