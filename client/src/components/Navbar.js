// src/components/Navbar.js
import { Box, Flex, HStack, IconButton, Button, useDisclosure, Stack, Heading, Input, Avatar } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, SearchIcon } from "@chakra-ui/icons";
import { FaUser } from "react-icons/fa";
import { FaRegComment, FaEnvelope } from 'react-icons/fa';
import { Link } from '@chakra-ui/react';

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg="blue.500" px={4} position={"sticky"} top="0" zIndex={"999"}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        {/* this just below part is for mobile app responciveness */}
        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
       <Link href="/" _hover={{ textDecoration: 'none' }}>
        <Heading color="white" fontWeight="bold" marginLeft={12}>ShareFun</Heading>
        </Link>

        <Input 
            placeholder='Search for friend, post or video' 
            width={650} 
            border="2px solid"       // This sets the border style and width
            borderColor="gray.300"   // This sets the border color
            _placeholder={{ color: "gray.600", fontWeight: "bold" }} 
        />
        <IconButton>
            <SearchIcon/>
        </IconButton>
        

        <HStack >
            <Button>homepage</Button>
            <Button>timeline</Button>
        </HStack>
        
        <HStack spacing={5} >
            <FaUser/>  
            <FaRegComment />  
            <FaEnvelope />  
        </HStack>
        
        <Flex alignItems="center" width={10}>
          <Avatar
          size="sm" // small size
          name="John Doe" // fallback initials will be "JD"
          src="https://bit.ly/ryan-florence" // image source
          />
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as="nav" spacing={4}>
            <Button variant="link" color="white">Home</Button>
            <Button variant="link" color="white">About</Button>
            <Button variant="link" color="white">Contact</Button>
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}
