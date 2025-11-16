import { View, StyleSheet } from "react-native";
import { Box, Text, VStack, HStack } from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons";

export default function TrackingTimeline({ history }) {
  return (
    <VStack space="lg">
      {history.map((event, index) => (
        <HStack key={index} space="md" alignItems="flex-start">
          {/* Timeline Line */}
          <VStack alignItems="center">
            {/* Dot */}
            <Box
              width={16}
              height={16}
              rounded="$full"
              bg={index === 0 ? "$blue500" : "$gray300"}
              borderWidth={3}
              borderColor={index === 0 ? "$blue500" : "$gray200"}
            />
            {/* Line */}
            {index !== history.length - 1 && (
              <Box
                width={2}
                height={60}
                bg="$gray200"
                my="$2"
              />
            )}
          </VStack>

          {/* Event Details */}
          <VStack flex={1} pt="$1">
            <Text size="sm" bold color="$gray900" textTransform="capitalize">
              {event.status.replace('-', ' ')}
            </Text>
            <Text size="xs" color="$gray600" mt="$1">
              {event.timestamp}
            </Text>
            {event.location && (
              <Text size="xs" color="$gray600" mt="$1">
                📍 {event.location}
              </Text>
            )}
          </VStack>
        </HStack>
      ))}
    </VStack>
  );
}

const styles = StyleSheet.create({});
