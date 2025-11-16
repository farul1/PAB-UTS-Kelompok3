import React from "react";
import { Pressable } from "react-native";
import { HStack, Text, Icon } from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons";

export default function CategoryButton({ category, isActive, onPress }) {
  return (
    <Pressable onPress={onPress}>
      <HStack
        alignItems="center"
        px="$4"
        py="$2"
        mr="$2"
        borderRadius={999}
        bg={isActive ? "#3a64edff" : "#e5e7eb"}
      >
        <Icon
          as={Ionicons}
          name={category.icon}
          color={isActive ? "#fff" : "#4b5563"}
          mr="$1"
        />

        <Text
          color={isActive ? "#fff" : "#374151"}
          fontWeight="$bold"
        >
          {category.name}
        </Text>
      </HStack>
    </Pressable>
  );
}
