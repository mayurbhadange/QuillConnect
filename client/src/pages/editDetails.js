import React, { useContext, useRef, useState } from 'react';
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
  Icon
} from '@chakra-ui/react';
import { Camera, MapPin } from 'lucide-react';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase"; // Adjust the import based on your structure
import { FaHome } from "react-icons/fa";

const EditDetailsPage = () => {
    const {user} = useContext(UserContext);
    const CPInputRef = useRef(null);
    const PPInputRef = useRef(null);
    const [CPuploaded, setCPuploaded] = useState(false);
    const [PPuploaded, setPPuploaded] = useState(false);
    const [coverPicture, setCoverPicture] = useState(null);
    const [profilePicture, setProfilePicture] = useState(null);

  const [formData, setFormData] = useState({
    name: user.name,
    username: user.username,
    email: user.email,
    location: user.location,
    bio: user.bio,
    profilePicture: user.profilePicture,
    coverPicture: user.coverPicture,
  });

  const [password, setPassword] = useState('');
  const toast = useToast();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCPClick = () => {
    CPInputRef.current.click();
  }

  const handlePPclick = () => {
    PPInputRef.current.click();
  }

  const coverPictureHandler = (e)=>{
    const file = e.target.files[0];
    setCoverPicture(file);
    setFormData({...formData, coverPicture: file});
    setCPuploaded(true);
    console.log("file: ", file);
  }

  const profilePictureHandler = (e)=>{
    const file = e.target.files[0];
    setProfilePicture(file);
    setFormData({...formData, profilePicture: file});
    setPPuploaded(true);
    console.log("file: ", file);
  }

// hadle three toast manually
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Uploading cover and profile pictures to Firebase Storage
    const uploadImageToFirebase = async (file) => {
      if (file) {
        console.log("file: ", file);
  
        // Create a storage reference
        const storageRef = ref(storage, `media/images/${file.name}`);
        
        // Upload the file
        const snapshot = await uploadBytes(storageRef, file);
        
        // Get the download URL
        const downloadURL = await getDownloadURL(snapshot.ref);
        console.log('File uploaded to:', downloadURL);
        return downloadURL;
      }
      return null;
    };
  
    try {
      // Show loading toast
      toast({
        title: "Updating profile...",
        description: "Please wait while we update your profile.",
        status: "loading",
        duration: null, // This keeps the toast open until manually closed
        isClosable: false,
        id: "loadingToast", // Assign an ID to manage toast state
      });
  
  
      // Upload coverPicture and profilePicture
      const coverPictureURL = await uploadImageToFirebase(coverPicture);
      const profilePictureURL = await uploadImageToFirebase(profilePicture);
  
      // Update formData with the URLs from Firebase
      const updatedFormData = {
        ...formData,
        coverPicture: coverPictureURL || formData.coverPicture,  // Retain old URL if no new file is uploaded
        profilePicture: profilePictureURL || formData.profilePicture,  // Same for profilePicture
      };

      if(password){
        updatedFormData = {
          ...updatedFormData,
          password: password
        };
      }
  
      // Send the updatedFormData to your backend API for saving to MongoDB
      await axios.put(`http://localhost:3000/api/user/updateUser/${user._id}`, updatedFormData);
  
      // Close loading toast
      toast.close("loadingToast");
  
      // Show success toast
      toast({
        title: "Profile updated!",
        description: "Your profile has been successfully updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
  
      window.location.href = "/profile";
    } catch (err) {
      console.error("error:", err);
  
      // Close loading toast if still active
      toast.close("loadingToast");
  
      // Show error toast
      toast({
        title: "Profile update failed.",
        description: "There was an issue updating your profile. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
  
    }
  };
  


  return (
    <Box p={5}>
    <Icon as={FaHome} boxSize={6} size={5} color="white" onClick={()=>window.location.href='/'} />
    <Container maxW="container.md" >
      <VStack spacing={8} align="stretch">
        <Box position="relative" h="200px" overflow="hidden" borderRadius="lg">
          <Image
            src={!CPuploaded ? formData.coverPicture : URL.createObjectURL(formData.coverPicture)}
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
            onClick={handleCPClick}
          />

          <Input type='file' ref={CPInputRef}  onChange={coverPictureHandler}  display={'none'}/>
        </Box>

        <HStack justify="center" mt="-50px">
          <Box position="relative">
            <Image
              src={!PPuploaded ? formData.profilePicture : URL.createObjectURL(formData.profilePicture) }
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
              onClick={handlePPclick}
            />
          </Box>
          <Input type='file' ref={PPInputRef} onChange={profilePictureHandler} display={'none'}/>
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
              <FormLabel>Password</FormLabel>
              <Input  name="password" type="password" minLength={'6'} placeholder='Enter new password...' value={password} onChange={(e)=>setPassword(e.target.value)} />
            </FormControl>

            <FormControl>
              <FormLabel>Location</FormLabel>
              <Input name="location" value={formData.location} onChange={handleChange} leftIcon={<MapPin />} />
            </FormControl>

            <FormControl>
              <FormLabel>Bio</FormLabel>
              <Textarea name="bio" value={formData.bio} onChange={handleChange} />
            </FormControl>

            <Button
               type="submit" colorScheme="blue" size="lg" width="full" >
                Save Changes
              </Button>
          </VStack>
        </form>
      </VStack>
    </Container>
            </Box>
  );
};

export default EditDetailsPage;