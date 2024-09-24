import React, { useState, useEffect, useContext, useRef } from 'react';
import { Box, Flex, HStack, IconButton, Button, useDisclosure, Heading, Input, Avatar, Text, VStack, Popover, PopoverTrigger, PopoverContent, PopoverBody, useColorModeValue } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, SearchIcon, SunIcon, MoonIcon } from "@chakra-ui/icons";
import { Link, useColorMode } from '@chakra-ui/react';
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [allUsers, setAllUsers] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const { user } = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState("");
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("blue.500", "blue.800");
  const textColor = useColorModeValue("white", "gray.200");
  const inputBg = useColorModeValue("white", "gray.700");
  const searchRef = useRef();

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/user/getAllUsers');
      setAllUsers(response.data.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  }

  const updateSuggestions = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length > 0) {
      const filtered = allUsers.filter((user) =>
        user.username.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  }

  const handleSuggestionClick = (userId) => {
    user._id === userId ? window.location.href = `/profile` : window.location.href = `/profile/${userId}`;
    setSuggestions([]);
    setSearchTerm("");
  }

  const logoutHandler = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  }

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <Box bg={bgColor} px={4} position="sticky" top="0" zIndex="999" boxShadow="md">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Open Menu"
          display={{ base: "flex", md: "none" }}
          onClick={isOpen ? onClose : onOpen}
          variant="ghost"
          color={textColor}
        />
        <Link href="/" _hover={{ textDecoration: 'none' }}>
          <Heading color={textColor} fontWeight="bold" fontSize={{ base: "xl", md: "2xl" }}>ShareFun</Heading>
        </Link>

        <HStack spacing={8} alignItems="center" flex={1} justifyContent="center">
          <Popover placement="bottom" isOpen={suggestions.length > 0}>
            <PopoverTrigger>
              <Box position="relative" width={{ base: "full", md: "500px" }}>
                <Input
                  placeholder='Search for friend, post or video'
                  value={searchTerm}
                  onChange={updateSuggestions}
                  bg={inputBg}
                  borderRadius="full"
                  pl={10}
                  ref={searchRef}
                />
                <SearchIcon color="gray.500" position="absolute" left={3} top="50%" transform="translateY(-50%)" />
              </Box>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverBody p={0}>
                <VStack align="stretch" spacing={0}>
                  {suggestions.map((user) => (
                    <MotionBox
                      key={user._id}
                      p={2}
                      // _hover={{ bg: "gray.100" }}
                      cursor="pointer"
                      onClick={() => handleSuggestionClick(user._id)}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <HStack spacing={3}>
                        <Avatar size="sm" name={user.name} src={user.profilePicture} />
                        <Text fontWeight="medium">{user.username}</Text>
                      </HStack>
                    </MotionBox>
                  ))}
                </VStack>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </HStack>

        <HStack spacing={4}>
          <IconButton
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            variant="ghost"
            color={textColor}
            aria-label="Toggle color mode"
          />
          {user && (
            <Link href="/profile">
              <Avatar size="sm" name={user.name} src={user.profilePicture} />
            </Link>
          )}
          <Button onClick={logoutHandler} colorScheme="red" size="sm">
            Logout
          </Button>
        </HStack>
      </Flex>

      {isOpen && (
        <Box pb={4} display={{ md: "none" }}>
          <VStack as="nav" spacing={4}>
            <Button w="full" variant="ghost" color={textColor}>Home</Button>
            <Button w="full" variant="ghost" color={textColor}>About</Button>
            <Button w="full" variant="ghost" color={textColor}>Contact</Button>
          </VStack>
        </Box>
      )}
    </Box>
  );
}