import React, { useState } from 'react';
import { Box, Button, Input, Stack, Text, FormControl, useToast } from '@chakra-ui/react';
import axios from 'axios';

const RegisterPage = () => {
  const toast = useToast();
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent the default form submission behavior
    
    if (user.password !== confirmPassword || confirmPassword === "") {
      toast({
        title: 'Password Mismatch',
        description: "Ensure to enter the same password.",
        status: 'error',
        duration: 7000,
        isClosable: false,
      });
      return;
    }

    try {
      // Send a POST request to your backend
      const response = await axios.post('http://localhost:3000/api/auth/register', user); // Update with your actual API endpoint
      console.log(response);

      // Show success toast if the request is successful
      toast({
        title: 'Account created.',
        description: "We've created your account for you.",
        status: 'success',
        duration: 7000,
        isClosable: true,
      });
    } catch (error) {
      // Show error toast if the request fails
      toast({
        title: 'Error creating account',
        description: error.response?.data?.message || "An error occurred while creating your account.",
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bg="gray.900"
    >
      <Stack direction="row" spacing={10} align="center">
        {/* Left Section with Branding */}
        <Box>
          <Text fontSize="5xl" fontWeight="bold" color="teal.400">
            ShareFun
          </Text>
          <Text fontSize="2xl" mt="4" color="gray.300">
            Connect with friends and the world around you on Lamasocial.
          </Text>
        </Box>

        {/* Right Section with Register Form */}
        <Box
          p={8}
          rounded="md"
          shadow="2xl"
          width="400px"
          bg="gray.800"
        >
          <Text fontSize={'2xl'} color="teal.400">
            Fill the below details:
          </Text>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              {/* Username */}
              <FormControl id="UserName">
                <Input
                  type="text"
                  placeholder="User Name"
                  value={user.username}
                  onChange={(e) => setUser({ ...user, username: e.target.value })}
                  bg="gray.700"
                  color="gray.300"
                />
              </FormControl>

              {/* Email Input */}
              <FormControl id="email">
                <Input
                  type="email"
                  placeholder="Email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  required
                  bg="gray.700"
                  color="gray.300"
                />
              </FormControl>

              {/* Password Input */}
              <FormControl id="password">
                <Input
                  type="password"
                  placeholder="Password"
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  minLength={6} required
                  bg="gray.700"
                  color="gray.300"
                />
              </FormControl>

              {/* Confirm Password Input */}
              <FormControl id="confirmPassword">
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  minLength={'6'} required
                  bg="gray.700"
                  color="gray.300"
                />
              </FormControl>

              {/* Create Account Button */}
              <Button type="submit" colorScheme="green" size="md" width="full">
                Create a New Account
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Box>
  );
};

export default RegisterPage;
