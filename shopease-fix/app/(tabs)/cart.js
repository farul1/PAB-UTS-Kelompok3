import React, { useContext } from "react";
import { Alert, FlatList, Image } from "react-native";
import {
  Box,
  Heading,
  Text,
  Button,
  HStack,
  VStack,
  Icon,
  ButtonText,
} from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons";
import { CartContext } from "./_layout";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (cart.length === 0) {
      return Alert.alert("Keranjang Kosong", "Tambahkan produk dulu!");
    }

    Alert.alert(
      "Konfirmasi Checkout",
      `Total pembayaran: Rp ${totalPrice.toLocaleString("id-ID")}`,
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Proses",
          onPress: () => {
            clearCart();
            Alert.alert("Berhasil", "Pesanan sedang diproses!");
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <Box
      backgroundColor="#fff"
      padding={14}
      marginBottom={14}
      borderRadius={14}
      borderWidth={1}
      borderColor="#e5e7eb"
      style={{ elevation: 2 }}
    >
      <HStack space="md" alignItems="center">
        <Image
          source={{ uri: item.image }}
          style={{
            width: 80,
            height: 80,
            borderRadius: 12,
            backgroundColor: "#f3f4f6",
          }}
        />

        <VStack flex={1}>
          <Text fontWeight="bold" fontSize={16} color="#111827">
            {item.name}
          </Text>

          <Text marginTop={4} color="#6b7280" fontSize={14}>
            Rp {(item.price * item.quantity).toLocaleString("id-ID")}
          </Text>

          <HStack
            justifyContent="space-between"
            alignItems="center"
            marginTop={10}
          >
            <Text fontSize={14} color="#374151">
              Qty: {item.quantity}
            </Text>

            <Button
              size="xs"
              bg="#ef4444"
              borderRadius={20}
              onPress={() => removeFromCart(item.id)}
            >
              <Icon as={Ionicons} name="trash-outline" color="#fff" />
            </Button>
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );

  return (
    <Box flex={1} backgroundColor="#f8fafc">
      {/* Header */}
      <Box padding={16} paddingBottom={6}>
        <Heading size="lg" color="#6d28d9" fontWeight="bold">
          Keranjang Belanja
        </Heading>
      </Box>

      {/* Keranjang Kosong */}
      {cart.length === 0 ? (
        <Box flex={1} alignItems="center" justifyContent="center">
          <Icon as={Ionicons} name="cart-outline" size={55} color="#9ca3af" />
          <Text color="#6b7280" marginTop={10} fontSize={16}>
            Keranjang kamu masih kosong
          </Text>
        </Box>
      ) : (
        <>
          {/* List Produk */}
          <FlatList
            data={cart}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingHorizontal: 16 }}
          />

          {/* Footer Total & Checkout */}
          <Box
            padding={16}
            backgroundColor="#fff"
            borderTopWidth={1}
            borderColor="#e5e7eb"
            style={{
              elevation: 10,
            }}
          >
            <HStack justifyContent="space-between" alignItems="center">
              <Text fontSize={16} fontWeight="bold">
                Total:
              </Text>
              <Text
                fontSize={18}
                fontWeight="bold"
                color="#6d28d9"
              >
                Rp {totalPrice.toLocaleString("id-ID")}
              </Text>
            </HStack>

            <Button
              bg="#6d28d9"
              marginTop={14}
              borderRadius={30}
              py="$2"
              onPress={handleCheckout}
            >
              <ButtonText color="white" fontWeight="bold">
                Checkout
              </ButtonText>
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Cart;
