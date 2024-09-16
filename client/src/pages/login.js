import React, { useState } from 'react';
import { Box, Button, Input, Stack, Text, FormControl, Link, useToast } from '@chakra-ui/react';
import axios from 'axios';

const LoginPage = () => {
  const toast = useToast();

  // State to store the user's email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Submit handler to handle form submission
  const submitHandler = async (e) => {
    e.preventDefault(); // Prevents default form submission

    // Log the email and password to verify the inputs
    console.log("User Info: ", { email, password });

    try {
      // Send login request to the backend
      const response = await axios.post('http://localhost:3000/api/auth/login', { email, password }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Response Data:', response.data);

      // Show success toast if login is successful
      toast({
        title: 'Logged in successfully.',
        description: "Welcome back!",
        status: 'success',
        duration: 7000,
        isClosable: true,
      });

    } catch (error) {
      console.log("Error Response: ", error.response);

      // Show error toast if login fails
      toast({
        title: 'Error logging in',
        description: error.response?.data?.message || "An error occurred while logging in.",
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
      bg="gray.900" // Background color for contrast
    >
      <Stack direction="row" spacing={10} align="center">
        {/* Left Section with Branding */}
        <Box>
          <Text fontSize="5xl" fontWeight="bold" color="teal.400">
            ShareFun
          </Text>
          <Text fontSize="2xl" mt="4" color="gray.300">
            Connect with friends and the world around you on ShareFun.
          </Text>
        </Box>

        {/* Right Section with Login Form */}
        <Box
          p={8}
          pt={5}
          rounded="md"
          shadow="2xl"
          width="350px"
          bg="gray.800" // Background for login box
          textAlign="center"
        >
          <Text fontSize="3xl" fontWeight="bold" color="teal.400">Log In</Text>
          <Text fontSize="xl" color="teal.400">To continue being social</Text>

          <form onSubmit={submitHandler}>
            <Stack spacing={4}>
              {/* Email Input */}
              <FormControl id="email">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email} // Controlled by useState
                  onChange={(e) => setEmail(e.target.value)} // Update state on input change
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
                  value={password} // Controlled by useState
                  onChange={(e) => setPassword(e.target.value)} // Update state on input change
                  required
                  bg="gray.700"
                  color="gray.300"
                />
              </FormControl>

              {/* Log In Button */}
              <Button type="submit" colorScheme="blue" size="md" width="full">
                Log In
              </Button>

              {/* Forgot Password Link */}
              <Link color="blue.400" textAlign="center" fontSize="sm">
                Forgot Password?
              </Link>

              {/* Create Account Button */}
              <Button colorScheme="green" size="md" width="full" onClick={() => window.location.href='/register'}>
                Create a New Account
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Box>
  );
};

export default LoginPage;
