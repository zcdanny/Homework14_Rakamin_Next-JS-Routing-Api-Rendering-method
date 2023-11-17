import {
  Center,
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Button,
  Heading,
  Text,
  useToast,
  VStack,
  Wrap,
  WrapItem,
  InputLeftElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { MdOutlineEmail } from "react-icons/md";
import { BsPerson } from "react-icons/bs";
import { RiLockPasswordLine } from "react-icons/ri";
import { registerUser } from "@/modules/fetch";
import { useRouter } from "next/router";
import Navbar from "@/components/navbar";

const Register = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return;
    }
    try {
      await registerUser(e.target.name.value, e.target.email.value, password);
      toast({
        title: "Registered",
        description: "You have successfully registered.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      router.push("/");
    } catch (e) {
      const error = new Error(e);
      toast({
        title: "An error occurred.",
        description: error?.message || "An error occurred. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setError(error?.message || "An error occurred");
  };
  return (
    <ChakraProvider>
      <Navbar />
      <Center>
        <Flex maxW="4xl">
          <Box
            bg="#6d9773"
            color="white"
            borderRadius="lg"
            m={{ sm: 4, md: 16, lg: 10 }}
            p={{ sm: 5, md: 5, lg: 16 }}
          >
            <Box p={4}>
              <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
                <WrapItem>
                  <Box>
                    <Heading mt="80%">Register</Heading>
                    <Text mt={{ sm: 3, md: 3, lg: 5 }} color="white">
                      Fill up the form to register
                    </Text>
                  </Box>
                </WrapItem>
                <WrapItem>
                  <Box bg="white" borderRadius="lg">
                    <Box m={8} color="#0B0E3F">
                      <VStack spacing={5}>
                        <form onSubmit={handleSubmit}>
                          {error && (
                            <Box color="red.500" mb={4}>
                              {error}
                            </Box>
                          )}
                          <FormControl>
                            <FormLabel>Name</FormLabel>
                            <InputGroup borderColor="#E0E1E7">
                              <InputLeftElement pointerEvents="none">
                                <BsPerson color="gray.800" />
                              </InputLeftElement>
                              <Input type="name" name="name" size="md" />
                            </InputGroup>
                          </FormControl>
                          <FormControl>
                            <FormLabel mt={5}>Mail</FormLabel>
                            <InputGroup borderColor="#E0E1E7">
                              <InputLeftElement pointerEvents="none">
                                <MdOutlineEmail color="gray.800" />
                              </InputLeftElement>
                              <Input type="email" name="email" size="md" />
                            </InputGroup>
                          </FormControl>
                          <FormControl>
                            <FormLabel mt={5}>Password</FormLabel>
                            <InputGroup borderColor="#E0E1E7">
                              <InputLeftElement pointerEvents="none">
                                <RiLockPasswordLine color="gray.800" />
                              </InputLeftElement>
                              <Input
                                type="password"
                                name="password"
                                size="md"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                              />
                            </InputGroup>
                          </FormControl>
                          <FormControl>
                            <FormLabel mt={5}> Confirm Password</FormLabel>
                            <InputGroup borderColor="#E0E1E7">
                              <InputLeftElement pointerEvents="none">
                                <RiLockPasswordLine color="gray.800" />
                              </InputLeftElement>
                              <Input
                                type="password"
                                name="confirmPassword"
                                size="md"
                                value={confirmPassword}
                                onChange={(e) =>
                                  setConfirmPassword(e.target.value)
                                }
                              />
                            </InputGroup>
                          </FormControl>
                          {password !== confirmPassword && (
                            <Text fontSize="xs" color="red.500">
                              The password does not match
                            </Text>
                          )}
                          <FormControl id="name" float="right">
                            <Button
                              mt={5}
                              loadingText="Submitting"
                              variant="solid"
                              colorScheme="teal"
                              _hover={{}}
                              type="submit"
                            >
                              Sign Up
                            </Button>
                          </FormControl>
                        </form>
                      </VStack>
                    </Box>
                  </Box>
                </WrapItem>
              </Wrap>
            </Box>
          </Box>
        </Flex>
      </Center>
    </ChakraProvider>
  );
};

export default Register;
