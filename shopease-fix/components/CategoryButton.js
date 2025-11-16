import React from "react";
import { Pressable } from "react-native";
import { HStack, Text, Icon } from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons";

const CategoryButton = ({ category, isActive, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <HStack
        alignItems="center"
        bg={isActive ? "$violet600" : "$gray200"}
        px="$4"
        py="$2"
        borderRadius="$full"
        mr="$2"
      >
        {category?.icon && (
          <Icon
            as={Ionicons}
            name={category.icon}
            size="sm"
            color={isActive ? "$white" : "$black"}
            mr="$1"
          />
        )}

        <Text
          color={isActive ? "$white" : "$black"}
          fontWeight="$bold"
          fontSize="$sm"
        >
          {category?.name ?? "Unknown"}
        </Text>
      </HStack>
    </Pressable>
  );
};

export default CategoryButton;
