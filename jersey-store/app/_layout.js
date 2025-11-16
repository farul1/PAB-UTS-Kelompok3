// app/_layout.js
import React, { createContext, useState } from "react";
import { Stack } from "expo-router";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";

// CONTEXT CART
export const CartContext = createContext();

export default function RootLayout() {
  const [cartItems, setCartItems] = useState([]);

  // Fungsi untuk menambahkan item ke keranjang
  const addToCart = (item, quantity) => {
    setCartItems(prev => {
      const exist = prev.find(x => x.id === item.id);
      if (exist) {
        return prev.map(x =>
          x.id === item.id ? { ...x, qty: x.qty + quantity } : x
        );
      }
      return [...prev, { ...item, qty: quantity }];
    });
  };

  // Fungsi untuk menghapus item dari keranjang
  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(x => x.id !== id));
  };

  return (
    <GluestackUIProvider config={config}>
      <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
        {/* Stack untuk navigasi */}
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </CartContext.Provider>
    </GluestackUIProvider>
  );
}
