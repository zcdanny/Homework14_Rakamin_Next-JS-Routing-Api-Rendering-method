"use client";

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Center,
  Text,
  Stack,
  Container,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { login } from "@/fetch/auth";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      await login({ email, password });

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "You have successfully logged in to your account.",
        showConfirmButton: false,
        timer: 1000,
      });

      router.push("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid email or password. Please try again.",
        showConfirmButton: false,
        showCloseButton: true,
      });
    }
  };
  return (
    <Container
      borderRadius="4%"
      boxShadow="xl"
      w="300px"
      px="30px"
      pt="30px"
      pb="25px"
      my="40px"
    >
      <Stack>
        <Text
          bgGradient="linear(to-l, black, blue.400)"
          bgClip="text"
          fontFamily="sans-serif"
          fontSize="3xl"
          fontWeight="bold"
          textAlign="center"
        >
          Sign In
        </Text>
        <FormControl>
          <Stack>
            <FormLabel mb={0}>Email</FormLabel>
            <Input type="email" onChange={(e) => setEmail(e.target.value)} />
            <FormLabel mt={2} mb={0}>
              Password
            </FormLabel>
            <Input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Stack>
          <Center>
            <Button
              bgGradient="linear(to-l, black, blue.500)"
              boxShadow="sm"
              color="white"
              w="80px"
              mt={3}
              onClick={handleSubmit}
            >
              Sign In
            </Button>
          </Center>
          <Text fontWeight="medium" align="center" pt="20px">
            Don't have an account?{" "}
            <Link color="blue.400" href="/register">
              Register
            </Link>
          </Text>
        </FormControl>
      </Stack>
    </Container>
  );
}
