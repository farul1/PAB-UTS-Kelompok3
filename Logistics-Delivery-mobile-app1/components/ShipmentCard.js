import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Box, Text, HStack, VStack, Badge } from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons";
import { getStatusColor, getStatusIcon } from "../utils/helpers";

export default function ShipmentCard({ shipment }) {
  const statusColor = getStatusColor(shipment.status);
  const statusIcon = getStatusIcon(shipment.status);

  return (
    <TouchableOpacity activeOpacity={0.7}>
      <Box bg="$white" p="$4" rounded="$lg" borderWidth={1} borderColor="$gray200" mb="$3">
        {/* Header */}
        <HStack justifyContent="space-between" alignItems="flex-start" mb="$3">
          <VStack flex={1}>
            <Text size="sm" bold color="$gray900">No. Resi</Text>
            <Text size="xs" color="$gray600">{shipment.trackingNumber}</Text>
          </VStack>
          <Badge bg={statusColor} rounded="$full" px="$3" py="$1">
            <Text size="xs" bold color="$white" textTransform="capitalize">
              {shipment.status.replace('-', ' ')}
            </Text>
          </Badge>
        </HStack>

        <Box borderBottomWidth={1} borderBottomColor="$gray200" my="$3" />

        {/* Details */}
        <VStack space="md">
          {/* From */}
          <HStack space="md" alignItems="flex-start">
            <Ionicons name="location" size={18} color="#0052CC" />
            <VStack flex={1}>
              <Text size="xs" bold color="$gray600">Dari</Text>
              <Text size="sm">{shipment.origin}</Text>
            </VStack>
          </HStack>

          {/* Arrow */}
          <Ionicons name="arrow-down" size={16} color="#999" style={{ marginLeft: 9 }} />

          {/* To */}
          <HStack space="md" alignItems="flex-start">
            <Ionicons name="location" size={18} color="#FF6B35" />
            <VStack flex={1}>
              <Text size="xs" bold color="$gray600">Ke</Text>
              <Text size="sm">{shipment.destination}</Text>
            </VStack>
          </HStack>
        </VStack>

        <Box borderBottomWidth={1} borderBottomColor="$gray200" my="$3" />

        {/* Footer */}
        <HStack justifyContent="space-between" alignItems="center">
          <VStack>
            <Text size="xs" bold color="$gray600">Kurir</Text>
            <Text size="sm" bold color="$gray900">{shipment.courier}</Text>
          </VStack>
          <VStack alignItems="flex-end">
            <Text size="xs" bold color="$gray600">Tujuan Pengiriman</Text>
            <Text size="sm" bold color="$gray900">{shipment.estimatedDelivery}</Text>
          </VStack>
        </HStack>
      </Box>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
