

import {
  Box,
  HStack,
  VStack,
  Text,
  Pressable,
} from "@gluestack-ui/themed";
import { Image } from "react-native"; 
import Ionicons from "@expo/vector-icons/Ionicons";

const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => {
  const formatPrice = (price) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);

  return (
    <Box
      bg="$white"
      borderWidth={1}
      borderColor="$gray200"
      borderRadius={12}
      p="$3"
      mb="$3"
    >
      <HStack alignItems="center" space="$md">
        
     
        <Image
          source={{ uri: item.image }}
          style={{
            width: 70,
            height: 70,
            borderRadius: 10,
          }}
        />

        <VStack flex={1}>
          <Text fontSize="$md" fontWeight="bold" color="$gray800">
            {item.name}
          </Text>

          <Text fontSize="$sm" color="$gray600" mt="$1">
            Size: {item.selectedSize} | Color: {item.selectedColor}
          </Text>

          <Text fontSize="$md" color="$indigo600" fontWeight="bold" mt="$2">
            {formatPrice(item.price * item.quantity)}
          </Text>
        </VStack>

        <VStack alignItems="center" space="$xs">
          <Pressable onPress={() => onIncrease(item.id)}>
            <Ionicons name="add-circle-outline" size={26} color="#4F46E5" />
          </Pressable>

          <Text fontSize="$md" fontWeight="bold">
            {item.quantity}
          </Text>

          <Pressable onPress={() => onDecrease(item.id)}>
            <Ionicons name="remove-circle-outline" size={26} color="#4F46E5" />
          </Pressable>
        </VStack>

        <Pressable onPress={() => onRemove(item.id)}>
          <Ionicons name="trash-outline" size={26} color="#DC2626" />
        </Pressable>
      </HStack>
    </Box>
  );
};

export default CartItem;
