// components/ProductCard.jsx
import React from "react";
import { Pressable } from "react-native";
import { Box, VStack, Text, Image, HStack, Badge, BadgeText } from "@gluestack-ui/themed";

const ProductCard = ({ 
  item, 
  cardBg = "white",
  borderRadius = 16,
  width = "100%",
  onPress,      
  ...props 
}) => {
  return (
    <Pressable onPress={onPress}>
      <Box
        bg={cardBg}
        borderRadius={borderRadius}
        padding={12}
        width={width}
        {...props}
      >
        {/* Product Image */}
        <Box 
          position="relative" 
          alignItems="center" 
          marginBottom={8}
        >
          <Image
            source={{ uri: item.image }}
            alt={item.name}
            width="100%"
            height={140}
            borderRadius={12}
            resizeMode="cover"
          />
          <Badge 
            position="absolute" 
            top={8} 
            right={8}
            bg="#2651dcff"
            borderRadius={999}       
            size={20}              
          >
            <BadgeText color="white" fontSize={12}> 
              {item.rating} ★
            </BadgeText>
          </Badge>
        </Box>

        {/* Product Info */}
        <VStack space={4}>
          <Text 
            fontSize={14}         
            fontWeight="600"       
            color="#1e293b"
            numberOfLines={2}
            height={40}
          >
            {item.name}
          </Text>
          
          <Text fontSize={18} fontWeight="bold" color="#2651dcff"> 
            Rp {item.price.toLocaleString('id-ID')}
          </Text>
          
          <HStack alignItems="center" space={4}>
            <Box 
              width={16} 
              height={16} 
              borderRadius={999}  // ganti $full
              bg={item.stock > 10 ? "#10b981" : "#f59e0b"}
            />
            <Text fontSize={12} color="#64748b">
              {item.stock > 10 ? "Tersedia" : "Stok Terbatas"} {/* ganti $xs */}
            </Text>
          </HStack>
        </VStack>
      </Box>
    </Pressable>
  );
};

export default ProductCard;
