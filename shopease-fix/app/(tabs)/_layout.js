import React, { createContext, useState } from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export const CartContext = createContext();

export default function TabsLayout() {
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const exist = prev.find((i) => i.id === product.id);

      if (exist) {
        return prev.map((i) =>
          i.id === product.id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }

      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((t, i) => t + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, cartCount }}
    >
      <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: "#7c3aed",
          tabBarInactiveTintColor: "#999",
          tabBarStyle: {
            backgroundColor: "white",
            borderTopWidth: 0.3,
            borderTopColor: "#ddd",
            height: 60,
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = "home-outline";

            if (route.name === "home")
              iconName = focused ? "home" : "home-outline";
            else if (route.name === "cart")
              iconName = focused ? "cart" : "cart-outline";
            else if (route.name === "profile")
              iconName = focused ? "person" : "person-outline";

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tabs.Screen name="home" options={{ title: "Home" }} />
        <Tabs.Screen name="cart" options={{ title: "Cart" }} />
        <Tabs.Screen name="profile" options={{ title: "Profile" }} />
      </Tabs>
    </CartContext.Provider>
  );
}
