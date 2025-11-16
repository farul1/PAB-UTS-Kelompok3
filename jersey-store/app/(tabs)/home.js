// app/(tabs)/home.js

import React, { useState } from "react";
import { ScrollView, Dimensions } from "react-native";
import { Box, Heading, HStack, VStack, Text } from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import { Header, ProductCard, CategoryButton } from "../../components";
import { jerseys, categories } from "../../data/jerseys";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 32 - 12) / 2; // 32 padding, 12 gap

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("Premier League");
  const router = useRouter();

  const filtered = jerseys.filter(item => item.category === activeCategory);

  const handleProductPress = (item) => {
    // navigasi ke jersey-detail dengan parameter
    router.push({
      pathname: "/jersey-detail",
      params: {
        id: item.id,
        name: item.name,
        image: item.image,
        price: item.price,
        club: item.category,
        league: item.league || "Liga",
        description: item.description || "Deskripsi jersey tidak tersedia",
      },
    });
  };

  return (
    <Box flex={1} bg="#f8fafc">
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* HEADER SECTION */}
        <Box 
          bg="white" 
          pt={32} 
          pb={16} 
          px={16} 
          shadow="sm" 
          borderBottomWidth={1} 
          borderBottomColor="#f1f5f9"
        >
          <Header title="JerseyStore" />
          <Text fontSize={14} color="#64748b" mt={4}>
            Sport Apparel Shop - Temukan jersey favorit Anda di sini
          </Text>
        </Box>

        {/* CATEGORIES SECTION */}
        <Box px={16} pt={24} pb={8} bg="white" marginTop={8}>
          <Heading size="lg" mb={16} color="#1e293b" fontWeight="bold">
            Kategori Liga
          </Heading>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 16 }}
          >
            <HStack space={12}>
              {categories.map((cat) => (
                <CategoryButton
                  key={cat.id}
                  category={cat}
                  isActive={activeCategory === cat.name}
                  onPress={() => setActiveCategory(cat.name)}
                  activeColor="#dc2626"
                  inactiveColor="#64748b"
                  variant={activeCategory === cat.name ? "solid" : "outline"}
                  size="md"
                />
              ))}
            </HStack>
          </ScrollView>
        </Box>

        {/* PRODUCTS SECTION */}
        <Box px={16} pt={24} pb={8}>
          <HStack justifyContent="space-between" alignItems="center" mb={16}>
            <VStack>
              <Heading size="xl" color="#1e293b" fontWeight="bold">
                Jersey {activeCategory}
              </Heading>
              <Text fontSize={14} color="#64748b" mt={4}>
                {filtered.length} produk tersedia
              </Text>
            </VStack>
          </HStack>

          {/* PRODUCT GRID */}
          <Box 
            flexDirection="row" 
            flexWrap="wrap" 
            justifyContent="space-between"
            style={{ gap: 12 }}
          >
            {filtered.map((item) => (
              <Box 
                key={item.id}
                width={CARD_WIDTH}
                marginBottom={16}
              >
                <ProductCard
                  item={item}
                  cardBg="white"
                  borderRadius={16}
                  shadowColor="#000"
                  shadowOpacity={0.08}
                  shadowRadius={12}
                  elevation={3}
                  borderWidth={1}
                  borderColor="#f8fafc"
                  overflow="hidden"
                  onPress={() => handleProductPress(item)} // <-- tambahkan ini
                />
              </Box>
            ))}
          </Box>

          {/* EMPTY STATE */}
          {filtered.length === 0 && (
            <VStack alignItems="center" justifyContent="center" py={64}>
              <Box bg="#f1f5f9" p={24} borderRadius={999} mb={16}>
                <Text color="#64748b" fontSize={32}>🏃‍♂️</Text>
              </Box>
              <Text fontWeight="500" color="#475569" mb={4}>
                Jersey tidak ditemukan
              </Text>
              <Text fontSize={14} color="#64748b" textAlign="center">
                Coba pilih kategori lain untuk melihat lebih banyak jersey
              </Text>
            </VStack>
          )}
        </Box>
      </ScrollView>
    </Box>
  );
}
