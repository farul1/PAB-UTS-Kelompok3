import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  ButtonText,
} from "@gluestack-ui/themed";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Header } from "../../components";
import { Image } from "react-native"; 

const Profile = () => {
  return (
    <>
      <Header title="My Profile" />

      <Box flex={1} bg="$gray50" p="$4">
        <VStack space="$lg" alignItems="center" mt="$6">

          
          <Image
            source={{ uri: "https://i.pravatar.cc/300?img=12" }}
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
            }}
          />

          <VStack alignItems="center">
            <Heading fontSize="$xl">Rifqi Arif Mahfud</Heading>
            <Text color="$gray600" fontSize="$md" mt="$1">
              Rifqi@example.com
            </Text>
          </VStack>

          <Box
            w="100%"
            p="$4"
            bg="$white"
            borderRadius={12}
            borderWidth={1}
            borderColor="$gray200"
          >
            <VStack space="$md">
              <HStack justifyContent="space-between">
                <Text color="$gray600">Role</Text>
                <Text fontWeight="bold">Customer</Text>
              </HStack>

              <HStack justifyContent="space-between">
                <Text color="$gray600">Member Since</Text>
                <Text fontWeight="bold">2023</Text>
              </HStack>

              <HStack justifyContent="space-between">
                <Text color="$gray600">App Version</Text>
                <Text fontWeight="bold">1.0.0</Text>
              </HStack>
            </VStack>
          </Box>

          <Button
            bg="$red600"
            w="100%"
            mt="$4"
            borderRadius={25}
            size="lg"
            onPress={() => alert("Logged out (dummy)")}
          >
            <HStack space="$sm" alignItems="center">
              <Ionicons name="log-out-outline" size={20} color="white" />
              <ButtonText fontSize="$md" fontWeight="bold">
                Logout
              </ButtonText>
            </HStack>
          </Button>
        </VStack>
      </Box>
    </>
  );
};

export default Profile;
