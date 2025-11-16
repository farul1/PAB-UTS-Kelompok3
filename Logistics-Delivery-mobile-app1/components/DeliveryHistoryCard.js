import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Box, Text, HStack, VStack, Badge, Divider } from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons";
import { getStatusColor } from "../utils/helpers";

export default function DeliveryHistoryCard({ shipment }) {
  const statusColor = getStatusColor(shipment.status);

  return (
    <TouchableOpacity activeOpacity={0.7}>
      <Box bg="$white" p="$4" rounded="$lg" borderWidth={1} borderColor="$gray200">
        <HStack justifyContent="space-between" alignItems="center" mb="$3">
          <VStack flex={1}>
            <Text size="sm" bold color="$gray900">No. Resi #</Text>
            <Text size="xs" color="$gray600" mt="$1">{shipment.trackingNumber}</Text>
          </VStack>
          <Badge bg={statusColor} rounded="$full" px="$3" py="$1">
            <Text size="xs" bold color="$white" textTransform="capitalize">
              {shipment.status.replace('-', ' ')}
            </Text>
          </Badge>
        </HStack>

        <Divider my="$3" />

        <VStack space="md">
          <HStack space="md" alignItems="center">
            <Ionicons name="location" size={16} color="#0052CC" />
            <Text size="xs" color="$gray600" flex={1}>{shipment.destination}</Text>
          </HStack>

          <HStack space="md" alignItems="center">
            <Ionicons name="calendar" size={16} color="#FF6B35" />
            <Text size="xs" color="$gray600" flex={1}>Terkirim pada {shipment.estimatedDelivery}</Text>
          </HStack>

          <HStack space="md" alignItems="center">
            <Ionicons name="briefcase" size={16} color="#666" />
            <Text size="xs" color="$gray600" flex={1}>{shipment.courier}</Text>
          </HStack>
        </VStack>
      </Box>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 12,
  },
});
