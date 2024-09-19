import React, { useContext, useState } from 'react';
import {
  Box,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useToast,
  Container,
  Image,
  HStack,
  IconButton,
} from '@chakra-ui/react';
import { Camera, MapPin } from 'lucide-react';
import { UserContext } from '../context/UserContext';
import axios from 'axios';

const EditDetailsPage = () => {
    const {user} = useContext(UserContext);
    console.log(user)
  const [formData, setFormData] = useState({
    name: user.name,
    username: user.username,
    email: user.email,
    location: user.location,
    bio: user.bio,
    profilePicture: user.profilePicture,
    coverPicture: user.coverPicture,
  });

  const toast = useToast();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    try{

        await axios.put(`http://localhost:3000/api/user/updateUser/${user._id}`, formData);

        toast({
            title: 'Profile updated.',
            description: "We've updated your profile for you.",
            status: 'success',
            duration: 3000,
            isClosable: true,
          });

          window.location.href = '/profile'

    }catch(err){
        toast({
            title: 'Profile not updated.',
            description: "Your profile not updated yet.",
            status: 'failure',
            duration: 3000,
            isClosable: false,
          });
    }
    console.log(formData);
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={8} align="stretch">
        <Box position="relative" h="200px" overflow="hidden" borderRadius="lg">
          <Image
            src={formData.coverPicture}
            alt="Cover"
            objectFit="cover"
            w="100%"
            h="100%"
          />
          <IconButton
            icon={<Camera />}
            position="absolute"
            bottom={2}
            right={2}
            colorScheme="blue"
            aria-label="Change cover photo"
          />
        </Box>

        <HStack justify="center" mt="-50px">
          <Box position="relative">
            <Image
              src={formData.profilePicture || "/api/placeholder/150/150"}
              alt="Profile"
              borderRadius="full"
              boxSize="100px"
              objectFit="cover"
              border="4px solid white"
            />
            <IconButton
              icon={<Camera />}
              position="absolute"
              bottom={0}
              right={0}
              size="sm"
              colorScheme="blue"
              aria-label="Change profile photo"
            />
          </Box>
        </HStack>

        <Heading as="h1" size="xl" textAlign="center">
          Edit Your Profile
        </Heading>

        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input name="name" value={formData.name} onChange={handleChange} />
            </FormControl>

            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input name="username" value={formData.username} onChange={handleChange} />
            </FormControl>

            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input readOnly name="email" type="email" value={formData.email} onChange={handleChange} />
            </FormControl>

            <FormControl>
              <FormLabel>Location</FormLabel>
              <Input name="location" value={formData.location} onChange={handleChange} leftIcon={<MapPin />} />
            </FormControl>

            <FormControl>
              <FormLabel>Bio</FormLabel>
              <Textarea name="bio" value={formData.bio} onChange={handleChange} />
            </FormControl>

            <Button type="submit" colorScheme="blue" size="lg" width="full">
              Save Changes
            </Button>
          </VStack>
        </form>
      </VStack>
    </Container>
  );
};

export default EditDetailsPage;