import { View, StyleSheet } from "react-native";
import { Box, Text, HStack, VStack, Divider } from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons";
import TrackingTimeline from "./TrackingTimeline";
import { getStatusColor } from "../utils/helpers";

export default function TrackingDetails({ shipment }) {
  const currentStatusIndex = shipment.trackingHistory.findIndex(h => h.status === shipment.status);

  return (
    <Box bg="$white" rounded="$lg" p="$4" mb="$4" borderWidth={1} borderColor="$gray200">
      {/* Header */}
      <VStack space="md" mb="$6">
        <VStack>
          <Text size="xs" bold color="$gray600" mb="$1">Nomor Resi</Text>
          <Text size="lg" bold color="$gray900">{shipment.trackingNumber}</Text>
        </VStack>
        
        <Box bg={getStatusColor(shipment.status)} p="$3" rounded="$lg">
          <HStack space="md" alignItems="center">
            <Ionicons name="information-circle" size={20} color="#fff" />
            <Text size="sm" bold color="$white" textTransform="capitalize">
              Status Saat Ini: {shipment.status.replace('-', ' ')}
            </Text>
          </HStack>
        </Box>
      </VStack>

      <Divider my="$4" />

      {/* Shipment Info */}
      <VStack space="lg" mb="$6">
        <Box>
          <Text size="xs" bold color="$gray600" mb="$2">Asal</Text>
          <Box bg="$gray100" p="$3" rounded="$md">
            <Text size="sm">{shipment.origin}</Text>
            <Text size="xs" color="$gray600" mt="$1">{shipment.originAddress}</Text>
          </Box>
        </Box>

        <Box>
          <Text size="xs" bold color="$gray600" mb="$2">Tujuan</Text>
          <Box bg="$gray100" p="$3" rounded="$md">
            <Text size="sm">{shipment.destination}</Text>
            <Text size="xs" color="$gray600" mt="$1">{shipment.destinationAddress}</Text>
          </Box>
        </Box>

        <Box>
          <Text size="xs" bold color="$gray600" mb="$2">Informasi Kurir</Text>
          <HStack space="md" bg="$blue50" p="$3" rounded="$md" alignItems="center">
            <Ionicons name="briefcase" size={24} color="#0052CC" />
            <VStack flex={1}>
              <Text size="sm" bold>{shipment.courier}</Text>
              <Text size="xs" color="$gray600">{shipment.courierPhone}</Text>
            </VStack>
          </HStack>
        </Box>

        <Box>
          <Text size="xs" bold color="$gray600" mb="$2">Perkiraan Pengiriman</Text>
          <Box bg="$orange50" p="$3" rounded="$md">
            <HStack space="md" alignItems="center">
              <Ionicons name="calendar" size={20} color="#FF6B35" />
              <Text size="sm" bold color="$gray900">{shipment.estimatedDelivery}</Text>
            </HStack>
          </Box>
        </Box>
      </VStack>

      <Divider my="$4" />

      {/* Timeline */}
      <VStack space="md">
        <Text size="sm" bold color="$gray900" mb="$2">Riwayat Pelacakan</Text>
        <TrackingTimeline history={shipment.trackingHistory} />
      </VStack>
    </Box>
  );
}

const styles = StyleSheet.create({});
