import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
  VStack,
  Container,
  Box,
  Heading,
  Wrap,
  WrapItem,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import Link from "next/link";
import { loginUser } from "../modules/fetch";
import { useRouter } from "next/router";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLogin, setIsLogin] = useState(false);
  const toast = useToast();
  const router = useRouter();

  return (
    <Flex
      w="full"
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      bg="#222222"
      color="#bb8a52"
    >
      <Link href="/">
        <Flex align="center" mr={5} cursor="pointer">
          <Text fontSize="xl" fontWeight="bold">
            <Container>My Book Collection</Container>
          </Text>
        </Flex>
      </Link>

      <HStack>
        {isLogin && (
          <Link href="/newbook">
            <Button colorScheme="teal">Add Book</Button>
          </Link>
        )}
        {!isLogin ? (
          <Button onClick={onOpen} colorScheme="orange">
            Login
          </Button>
        ) : (
          <Button
            colorScheme="orange"
            onClick={() => {
              setIsLogin(false);
              router.push("/");
            }}
          >
            Logout
          </Button>
        )}
      </HStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <form
          id="login-form"
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              const token = await loginUser(
                e.target.email.value,
                e.target.password.value
              );
              router.push("/");
              onClose();
            } catch (err) {
              toast({
                title: "Error",
                description: err.message,
                status: "error",
                duration: 3000,
                isClosable: true,
              });
            }
          }}
        >
          <ModalOverlay />
          <ModalContent maxW="4xl">
            <Container
              bg="#6D9773"
              maxW="full"
              mt={0}
              centerContent
              overflow="hidden"
            >
              <Flex>
                <Box
                  bg="#0C3B2E"
                  color="white"
                  borderRadius="lg"
                  m={{ sm: 4, md: 16, lg: 10 }}
                  p={{ sm: 5, md: 5, lg: 16 }}
                >
                  <Box p={4}>
                    <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
                      <WrapItem>
                        <Box>
                          <Heading mt="40%">Log In</Heading>
                          <Text mt={{ sm: 3, md: 3, lg: 5 }} color="gray.500">
                            Doesn't Have Account? <br />
                            <Link href="/register" onClick={onClose}>
                              <Button
                                colorScheme="teal"
                                variant="solid"
                                color="white"
                                _hover={{}}
                                mt="10%"
                              >
                                Register here
                              </Button>
                            </Link>
                          </Text>
                        </Box>
                      </WrapItem>

                      <WrapItem>
                        <Box bg="white" borderRadius="lg">
                          <Box m={8} color="#0B0E3F">
                            <VStack spacing={5}>
                              <FormControl id="email">
                                <FormLabel>Mail</FormLabel>
                                <InputGroup borderColor="#E0E1E7">
                                  <InputLeftElement pointerEvents="none">
                                    <MdOutlineEmail color="gray.800" />
                                  </InputLeftElement>
                                  <Input size="md" name="email" type="email" />
                                </InputGroup>
                              </FormControl>

                              <FormControl id="password">
                                <FormLabel>Password</FormLabel>
                                <InputGroup borderColor="#E0E1E7">
                                  <InputLeftElement pointerEvents="none">
                                    <RiLockPasswordLine color="gray.800" />
                                  </InputLeftElement>
                                  <Input
                                    type="password"
                                    name="password"
                                    size="md"
                                  />
                                </InputGroup>
                              </FormControl>

                              <FormControl id="name" float="right">
                                <Button
                                  variant="solid"
                                  colorScheme="teal"
                                  color="white"
                                  _hover={{}}
                                  type="submit"
                                >
                                  Log In
                                </Button>
                              </FormControl>
                            </VStack>
                          </Box>
                        </Box>
                      </WrapItem>
                    </Wrap>
                  </Box>
                </Box>
              </Flex>
            </Container>
          </ModalContent>
        </form>
      </Modal>
    </Flex>
  );
};

export default Navbar;
