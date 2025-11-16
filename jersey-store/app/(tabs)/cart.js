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
  Badge,
  BadgeText,
} from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons";

import { CartContext } from "../_layout";

export default function Cart() {
  const { cartItems, removeFromCart, addToCart } = useContext(CartContext);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const clearCart = () => {
    cartItems.forEach(item => removeFromCart(item.id));
  };

  const handleCheckout = () => {
    Alert.alert("Sukses", "Pembelian berhasil! Terima kasih!");
    clearCart();
  };

  const updateQuantity = (item, change) => {
    const newQty = item.qty + change;
    
    if (newQty === 0) {
      removeFromCart(item.id);
      return;
    }
    
    // Untuk update quantity, kita remove dulu lalu add dengan quantity baru
    removeFromCart(item.id);
    addToCart(item, newQty);
  };

  const renderItem = ({ item }) => (
    <Box
      bg="white"
      padding={16}
      marginBottom={12}
      borderRadius={16}
      borderWidth={1}
      borderColor="#f1f5f9"
      shadowColor="#000"
      shadowOpacity={0.05}
      shadowRadius={10}
      elevation={2}
    >
      <HStack space={16} alignItems="center">
        <Box position="relative">
          <Image
            source={{ uri: item.image }}
            style={{ 
              width: 80, 
              height: 80, 
              borderRadius: 12,
              backgroundColor: "#f8fafc"
            }}
          />
          <Badge 
            position="absolute" 
            top={-6} 
            right={-6}
            bg="#2641dcff"
            borderRadius="$full"
            size="sm"
            zIndex={1}
          >
            <BadgeText color="white" fontSize="$xs">
              {item.qty}
            </BadgeText>
          </Badge>
        </Box>

        <VStack flex={1} space="xs">
          <Text fontWeight="bold" fontSize={14} color="#1e293b" numberOfLines={2}>
            {item.name}
          </Text>
          <Text fontSize={16} fontWeight="bold" color="#2660dcff">
            Rp {item.price.toLocaleString("id-ID")}
          </Text>
          
          {/* Quantity Controls */}
          <HStack alignItems="center" space="md" marginTop={8}>
            <HStack 
              alignItems="center" 
              space="sm" 
              bg="#f8fafc" 
              borderRadius={8}
              padding={4}
            >
              <Button
                size="xs"
                bg={item.qty === 1 ? "#fecaca" : "#fee2e2"}
                borderRadius={6}
                onPress={() => updateQuantity(item, -1)}
                disabled={item.qty === 1}
              >
                <Icon 
                  as={Ionicons} 
                  name="remove-outline" 
                  color={item.qty === 1 ? "#ef4444" : "#dc2626"} 
                  size={14} 
                />
              </Button>
              
              <Text fontSize={14} fontWeight="medium" color="#1e293b" minWidth={20} textAlign="center">
                {item.qty}
              </Text>
              
              <Button
                size="xs"
                bg="#fee2e2"
                borderRadius={6}
                onPress={() => updateQuantity(item, 1)}
              >
                <Icon as={Ionicons} name="add-outline" color="#dc2626" size={14} />
              </Button>
            </HStack>
            
            <Text fontSize={14} color="#475569" fontWeight="medium">
              Rp {(item.price * item.qty).toLocaleString("id-ID")}
            </Text>
          </HStack>
        </VStack>

        <Button
          size="sm"
          bg="#fef2f2"
          borderRadius={10}
          padding={8}
          onPress={() => removeFromCart(item.id)}
        >
          <Icon as={Ionicons} name="trash-outline" color="#dc2626" size={18} />
        </Button>
      </HStack>
    </Box>
  );

  return (
    <Box flex={1} bg="#f8fafc">
      {/* Header */}
      <Box bg="white" pt="$8" pb="$4" px="$4" shadow="sm" borderBottomWidth={1} borderColor="#f1f5f9">
        <HStack justifyContent="space-between" alignItems="center">
          <VStack>
            <Heading size="xl" color="#1e293b" fontWeight="bold">
              Keranjang
            </Heading>
            <Text size="sm" color="#64748b" mt="$1">
              {cartItems.length} item di keranjang
            </Text>
          </VStack>
          
          {cartItems.length > 0 && (
            <Button
              size="sm"
              bg="#fef2f2"
              borderRadius={10}
              onPress={clearCart}
            >
              <Icon as={Ionicons} name="trash-bin-outline" color="#dc2626" size={16} />
              <Text color="#dc2626" fontSize={12} fontWeight="medium" marginLeft={4}>
                Hapus Semua
              </Text>
            </Button>
          )}
        </HStack>
      </Box>

      {/* Cart Items */}
      <Box flex={1} px="$4" pt="$4">
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <VStack alignItems="center" justifyContent="center" py="$20" space="md">
              <Box 
                bg="#f1f5f9" 
                p="$8" 
                borderRadius="$full"
                borderWidth={2}
                borderColor="#e2e8f0"
                borderStyle="dashed"
              >
                <Icon as={Ionicons} name="cart-outline" size={48} color="#94a3b8" />
              </Box>
              <VStack alignItems="center" space="xs">
                <Text fontWeight="bold" fontSize={18} color="#475569">
                  Keranjang Kosong
                </Text>
                <Text fontSize={14} color="#64748b" textAlign="center">
                  Yuk tambahkan jersey favorit kamu{'\n'}ke keranjang belanja
                </Text>
              </VStack>
              <Button 
                bg="#2647dcff" 
                borderRadius={12} 
                marginTop={16}
                paddingHorizontal={24}
              >
                <Text color="white" fontWeight="medium">
                  Jelajahi Jersey
                </Text>
              </Button>
            </VStack>
          }
        />
      </Box>

      {/* Checkout Section */}
      {cartItems.length > 0 && (
        <Box 
          bg="white" 
          padding={16}
          borderTopWidth={1} 
          borderColor="#f1f5f9"
          shadow="lg"
        >
          <VStack space="md">
            <HStack justifyContent="space-between" alignItems="center">
              <VStack>
                <Text fontSize={14} color="#64748b">
                  Total Belanja
                </Text>
                <Text fontWeight="bold" fontSize={20} color="#dc2626">
                  Rp {total.toLocaleString("id-ID")}
                </Text>
              </VStack>
              
              <Badge bg="#10b981" borderRadius="$full" size="md">
                <BadgeText color="white" fontSize="$xs">
                  {cartItems.length} items
                </BadgeText>
              </Badge>
            </HStack>

            <Button
              bg="#dc2626"
              padding={9}
              borderRadius={14}
              onPress={handleCheckout}
              shadowColor="#dc2626"
              shadowOpacity={0.3}
              shadowRadius={10}
              elevation={5}
            >
              <HStack alignItems="center" space="sm">
                <Icon as={Ionicons} name="card-outline" color="white" size={20} />
                <Text color="white" fontWeight="bold" fontSize={16}>
                  Checkout Sekarang
                </Text>
              </HStack>
            </Button>
          </VStack>
        </Box>
      )}
    </Box>
  );
}