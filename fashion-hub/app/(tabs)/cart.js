import { useState } from "react";
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  ButtonText,
  ScrollView,
  Divider
} from "@gluestack-ui/themed";
import { Alert } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Header, CartItem } from "../../components";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Casual White T-Shirt",
      price: 150000,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
      quantity: 2,
      selectedSize: "L",
      selectedColor: "White",
    },
    {
      id: 2,
      name: "Denim Jacket",
      price: 350000,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400",
      quantity: 1,
      selectedSize: "M",
      selectedColor: "Blue",
    },
    {
      id: 3,
      name: "Hoodie Premium",
      price: 275000,
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400",
      quantity: 1,
      selectedSize: "XL",
      selectedColor: "Black",
    },
  ]);

  const formatPrice = (price) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);

  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleIncreaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecreaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    Alert.alert("Remove Item", "Remove this item from the cart?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: () => {
          setCartItems((prev) => prev.filter((item) => item.id !== id));
        },
      },
    ]);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert("Empty Cart", "Your cart is empty.");
      return;
    }

    const total = calculateTotal();
    const items = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    Alert.alert(
      "Checkout",
      `Total Items: ${items}\nTotal Amount: ${formatPrice(total)}\n\nProceed to payment?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Proceed",
          onPress: () => {
            Alert.alert("Success", "Order placed successfully!");
            setCartItems([]);
          },
        },
      ]
    );
  };

  const totalAmount = calculateTotal();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <Header title="Shopping Cart" cartCount={totalItems} />

      <Box flex={1} bg="$gray50">
        {cartItems.length === 0 ? (
          <Box flex={1} justifyContent="center" alignItems="center" p="$6">
            <Ionicons name="cart-outline" size={100} color="#9ca3af" />
            <Heading size="lg" color="$gray600" mt="$4">
              Your cart is empty
            </Heading>
            <Text color="$gray500" mt="$2">
              Start shopping and add items to your cart
            </Text>
          </Box>
        ) : (
          <>
            <ScrollView
              flex={1}
              contentContainerStyle={{ padding: 16 }}
            >
              <HStack justifyContent="space-between" alignItems="center" mb="$3">
                <Text fontSize="$md" color="$gray600">
                  {totalItems} {totalItems === 1 ? "item" : "items"} in cart
                </Text>

                <Button
                  size="sm"
                  variant="outline"
                  borderColor="$red500"
                  onPress={handleRemoveItem}
                >
                  <ButtonText color="$red500" fontSize="$sm">
                    Clear All
                  </ButtonText>
                </Button>
              </HStack>

              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onIncrease={handleIncreaseQuantity}
                  onDecrease={handleDecreaseQuantity}
                  onRemove={handleRemoveItem}
                />
              ))}
            </ScrollView>

            <Box bg="$white" p="$4" borderTopWidth={1} borderTopColor="$gray200">
              <VStack space="$sm">
                <HStack justifyContent="space-between">
                  <Text fontSize="$md" color="$gray600">
                    Subtotal:
                  </Text>
                  <Text fontSize="$md" fontWeight="bold">
                    {formatPrice(totalAmount)}
                  </Text>
                </HStack>

                <HStack justifyContent="space-between">
                  <Text fontSize="$md" color="$gray600">
                    Shipping:
                  </Text>
                  <Text fontSize="$md" color="$green600" fontWeight="bold">
                    FREE
                  </Text>
                </HStack>

                <Box my="$2">
                  <Divider />
                </Box>

                <HStack justifyContent="space-between">
                  <Text fontSize="$lg" fontWeight="bold">
                    Total:
                  </Text>
                  <Text fontSize="$xl" color="$indigo600" fontWeight="bold">
                    {formatPrice(totalAmount)}
                  </Text>
                </HStack>

                <Button
                  size="lg"
                  bg="$indigo600"
                  borderRadius={25}
                  mt="$2"
                  onPress={handleCheckout}
                >
                  <HStack space="$sm" alignItems="center">
                    <ButtonText fontSize="$md" fontWeight="bold">
                      Proceed to Checkout
                    </ButtonText>
                    <Ionicons name="arrow-forward" size={20} color="white" />
                  </HStack>
                </Button>
              </VStack>
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default Cart;
