

import {
  Box,
  HStack,
  Heading,
  Pressable,
  Text,
} from "@gluestack-ui/themed";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";

const Header = ({ title = "FashionHub", cartCount }) => {
  const router = useRouter();

  return (
    <Box
      bg="$white"
      py="$4"
      px="$4"
      borderBottomWidth={1}
      borderBottomColor="$gray200"
    >
      <HStack justifyContent="space-between" alignItems="center">
        
        {/* TITLE */}
        <Heading fontSize="$xl" color="$gray800">
          {title}
        </Heading>

        {/* CART ICON */}
        {cartCount !== undefined && (
          <Pressable onPress={() => router.push("/(tabs)/cart")}>
            <Box position="relative">
              <Ionicons name="cart-outline" size={26} color="#374151" />

              {/* BADGE */}
              {cartCount > 0 && (
                <Box
                  position="absolute"
                  top={-6}
                  right={-8}
                  bg="$red600"
                  borderRadius={10}
                  justifyContent="center"
                  alignItems="center"
                  style={{
                    width: 20,
                    height: 20,
                  }}
                >
                  <Text
                    fontSize="$xs"
                    color="$white"
                    fontWeight="bold"
                    textAlign="center"
                  >
                    {cartCount}
                  </Text>
                </Box>
              )}
            </Box>
          </Pressable>
        )}
      </HStack>
    </Box>
  );
};

export default Header;
