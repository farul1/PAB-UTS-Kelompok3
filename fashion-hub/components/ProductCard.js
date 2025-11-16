import {
  Box,
  HStack,
  VStack,
  Text,
} from "@gluestack-ui/themed";
import { Image } from "react-native";

const ProductCard = ({ product }) => {
  const formatPrice = (price) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);

  return (
    <Box
      bg="$white"
      borderRadius={12}
      borderWidth={1}
      borderColor="$gray200"
      p="$3"
      mb="$3"
    >
      <HStack alignItems="center" space="$md">
        
        {/* IMAGE */}
        <Image
          source={{ uri: product.image }}
          style={{ width: 80, height: 80, borderRadius: 10 }}
        />

        {/* TEXT SECTION */}
        <VStack flex={1}>
          <Text fontSize="$md" fontWeight="bold" color="$gray800">
            {product.name}
          </Text>

          <Text fontSize="$sm" color="$gray500" mt="$1">
            {product.category}
          </Text>

          <Text
            fontSize="$md"
            mt="$2"
            fontWeight="bold"
            color="$indigo600"
          >
            {formatPrice(product.price)}
          </Text>
        </VStack>

      </HStack>
    </Box>
  );
};

export default ProductCard;
