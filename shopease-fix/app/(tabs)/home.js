import React, { useState, useContext } from "react";
import { FlatList, ScrollView as RNScrollView } from "react-native"; 
import {
  Box,
  Heading,
  Input,
  InputField,
  InputSlot,
  InputIcon,
  HStack,
  Text,
} from "@gluestack-ui/themed";
import Ionicons from "@expo/vector-icons/Ionicons";

import Header from "../../components/Header";
import ProductCard from "../../components/ProductCard";
import CategoryButton from "../../components/CategoryButton";
import { products, categories } from "../../data/products";
import { CartContext } from "./_layout";

const Home = () => {
  const { cartCount } = useContext(CartContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Header title="ShopEase" cartCount={cartCount} />

      <Box flex={1} bg="$gray50">
        
        {/* SEARCH BAR */}
        <Box p="$4" bg="$white">
          <Input
            variant="outline"
            size="md"
            borderRadius="$full"
            borderColor="$gray300"
          >
            <InputSlot pl="$3">
              <InputIcon as={Ionicons} name="search-outline" />
            </InputSlot>

            <InputField
              placeholder="Search products..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </Input>
        </Box>

        {/* CATEGORIES */}
        <Box bg="$white" pb="$4" mb="$2">
          <HStack px="$4" pt="$4" pb="$2" justifyContent="space-between">
            <Heading size="md">Categories</Heading>
          </HStack>

          <RNScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ paddingHorizontal: 10 }}
          >
            <CategoryButton
              category={{ name: "All", icon: "grid-outline" }}
              isActive={activeCategory === "All"}
              onPress={() => setActiveCategory("All")}
            />

            {categories.map((category) => (
              <CategoryButton
                key={category.id}
                category={category}
                isActive={activeCategory === category.name}
                onPress={() => setActiveCategory(category.name)}
              />
            ))}
          </RNScrollView>
        </Box>

        {/* PRODUCTS */}
        <Box flex={1} px="$2">
          <HStack
            px="$2"
            pt="$2"
            pb="$2"
            justifyContent="space-between"
            alignItems="center"
          >
            <Heading size="md">
              {activeCategory === "All" ? "All Products" : activeCategory}
            </Heading>

            <Text fontSize="$sm" color="$gray600">
              {filteredProducts.length} items
            </Text>
          </HStack>

          {filteredProducts.length > 0 ? (
            <FlatList
              data={filteredProducts}
              renderItem={({ item }) => <ProductCard item={item} />}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          ) : (
            <Box flex={1} justifyContent="center" alignItems="center">
              <Ionicons name="search-outline" size={64} color="#d1d5db" />
              <Text fontSize="$lg" color="$gray500" mt="$4">
                No products found
              </Text>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Home;