import { useState } from "react";
import { useRouter } from "expo-router";
import {
  Box,
  ScrollView,
  Heading,
  Input,
  InputField,
  VStack,
  Text,
  Pressable,   
} from "@gluestack-ui/themed";
import { Header, ProductCard } from "../../components";
import products from "../../data/products";

const Home = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Header title="FashionHub" />

      <Box flex={1} bg="$gray50">
        <Box p="$4" bg="$white" borderBottomWidth={1} borderBottomColor="$gray200">
          <Input bg="$gray100" borderRadius={12}>
            <InputField
              placeholder="Search clothes..."
              value={search}
              onChangeText={(text) => setSearch(text)}
            />
          </Input>
        </Box>

        <ScrollView contentContainerStyle={{ padding: 16 }}>
          <Heading fontSize="$lg" mb="$3" color="$gray700">
            Products
          </Heading>

          {filteredProducts.length === 0 ? (
            <Text textAlign="center" mt="$10" fontSize="$md" color="$gray500">
              No products found
            </Text>
          ) : (
            <VStack space="$4">
              {filteredProducts.map((product) => (
                <Pressable
                  key={product.id}
                  onPress={() =>
                    router.push({
                      pathname: "/product-detail",
                      params: { id: product.id },
                    })
                  }
                >
                  <ProductCard product={product} />
                </Pressable>
              ))}
            </VStack>
          )}
        </ScrollView>
      </Box>
    </>
  );
};

export default Home;
