import React, { useEffect, useState } from 'react';
import { Box, Text, Flex, Image, Icon, Divider, Stack, SimpleGrid, HStack, Button } from '@chakra-ui/react';
import {EditIcon} from '@chakra-ui/icons'
import { FaGift } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import {UserContext} from '../context/UserContext';

const RightSidebar = ( {user} ) => {
  const {id} = useParams();
  const [isFollowed, setIsFollowed] = useState(false);
  const selfUser = useContext(UserContext).user;

  const followHandler = async() => {
    try{
        console.log("followuser")
        await axios.put(`http://localhost:3000/api/user/followUser/${id}`, {userId : selfUser._id});
        setIsFollowed(!isFollowed);
        console.log("followed successfully")
    }catch(err){
      console.log("error while following => ", err)
    }
  }

  const unfollowHandler = async() => {
    try{
        await axios.put(`http://localhost:3000/api/user/unfollowUser/${id}`, {userId : selfUser._id});
        setIsFollowed(!isFollowed);
        console.log("unfollowed successfully")
    }catch(err){
      console.log("error while unfollowing => ", err)
    }
  }

  useEffect(()=>{
    const fetchUser = async() => {
      console.log('use effect called -=============>')
      if(id){
        try {
          const response = await axios.get(`http://localhost:3000/api/user/getUser/${id}`);
          const nextUser = response.data.data;

          if(user.followings.includes(nextUser._id)){
            setIsFollowed(false);
          }else{
            setIsFollowed(true);
          }
        } catch (err) {
          console.log("Error fetching user data:", err);
          window.location.href = '/nopage'; // Redirect if error occurs
        } 
      }
    }
    fetchUser();
  },[id])

  const homePageComponent = () => {
    return (
      <>
        {/* Birthdays Section */}
        <Flex align="center" mb="4">
          <Icon as={FaGift} color="red.400" boxSize="5" />
          <Text ml="2" fontSize="lg" fontWeight="bold">
            Pola Foster and 3 other friends have a birthday today.
          </Text>
        </Flex>

        {/* Ad Section */}
        <Box mb="6">
          <Image
            src="https://adlersden.com/wp-content/uploads/2021/07/Rakhi-Toon-Gift-Box-For-Kids.jpg"
            alt="Advertisement"
            borderRadius="md"
          />
        </Box>

        {/* Divider */}
        <Divider />

        {/* Online Friends Section */}
        <Box mt="6">
          <Text fontSize="md" fontWeight="bold" mb="4">
            Online Friends
          </Text>

          {/* Repeat for online friends */}
          <Flex align="center" mb="3">
            <Image
              boxSize="40px"
              borderRadius="full"
              src="https://bit.ly/prosper-baba"
              alt="Safak Kocaoglu"
            />
            <Box ml="3">
              <Text fontWeight="bold" fontSize="sm">
                Safak Kocaoglu
              </Text>
              <Box as="span" color="green.400" boxSize="3" borderRadius="50%" bg="green.400" />
            </Box>
          </Flex>
          <Flex align="center" mb="3">
            <Image
              boxSize="40px"
              borderRadius="full"
              src="https://bit.ly/prosper-baba"
              alt="Safak Kocaoglu"
            />
            <Box ml="3">
              <Text fontWeight="bold" fontSize="sm">
                Safak Kocaoglu
              </Text>
              <Box as="span" color="green.400" boxSize="3" borderRadius="50%" bg="green.400" />
            </Box>
          </Flex>
          <Flex align="center" mb="3">
            <Image
              boxSize="40px"
              borderRadius="full"
              src="https://bit.ly/prosper-baba"
              alt="Safak Kocaoglu"
            />
            <Box ml="3">
              <Text fontWeight="bold" fontSize="sm">
                Safak Kocaoglu
              </Text>
              <Box as="span" color="green.400" boxSize="3" borderRadius="50%" bg="green.400" />
            </Box>
          </Flex>
          <Flex align="center" mb="3">
            <Image
              boxSize="40px"
              borderRadius="full"
              src="https://bit.ly/prosper-baba"
              alt="Safak Kocaoglu"
            />
            <Box ml="3">
              <Text fontWeight="bold" fontSize="sm">
                Safak Kocaoglu
              </Text>
              <Box as="span" color="green.400" boxSize="3" borderRadius="50%" bg="green.400" />
            </Box>
          </Flex>
          <Flex align="center" mb="3">
            <Image
              boxSize="40px"
              borderRadius="full"
              src="https://bit.ly/prosper-baba"
              alt="Safak Kocaoglu"
            />
            <Box ml="3">
              <Text fontWeight="bold" fontSize="sm">
                Safak Kocaoglu
              </Text>
              <Box as="span" color="green.400" boxSize="3" borderRadius="50%" bg="green.400" />
            </Box>
          </Flex>
          <Flex align="center" mb="3">
            <Image
              boxSize="40px"
              borderRadius="full"
              src="https://bit.ly/prosper-baba"
              alt="Safak Kocaoglu"
            />
            <Box ml="3">
              <Text fontWeight="bold" fontSize="sm">
                Safak Kocaoglu
              </Text>
              <Box as="span" color="green.400" boxSize="3" borderRadius="50%" bg="green.400" />
            </Box>
          </Flex>
          <Flex align="center" mb="3">
            <Image
              boxSize="40px"
              borderRadius="full"
              src="https://bit.ly/prosper-baba"
              alt="Safak Kocaoglu"
            />
            <Box ml="3">
              <Text fontWeight="bold" fontSize="sm">
                Safak Kocaoglu
              </Text>
              <Box as="span" color="green.400" boxSize="3" borderRadius="50%" bg="green.400" />
            </Box>
          </Flex>

          
        </Box>
      </>
    );
  };

  const profilePageComponent = () => {
    return (
      <>
        <Stack borderBottom={'white 1px solid'} pb={3}> 
          <HStack>
            <Text fontSize={'2xl'}>User Information: </Text>   
            {!id ? <EditIcon onClick={()=>{window.location.href = '/editDetails'}}/> :
                      (isFollowed ? 
                      <Button colorScheme='teal' variant='outline' onClick={unfollowHandler} >Unfollow</Button> : 
                        <Button colorScheme='teal' variant='outline' onClick={followHandler} >Follow</Button>)
            }             
          </HStack>
          <Box>
            <Text> Location : {user.location}  </Text>
            <Text> Followers : {user.followers ? user.followers.length : 0} </Text>
            <Text> Followings : {user.followings ? user.followings.length : 0}</Text>
          </Box>
        </Stack>

        <Stack mt={3}>
          <Text fontSize={'2xl'}>User Friends: </Text>

          {/* Grid for Rectangular Images */}
          <SimpleGrid columns={3} spacing={5}>
            {/* Repeat Image block for each friend */}
            <Box textAlign="center">
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS4HUkcYlV9504oJAIFAuoXwTzG5IziwRjmQ&s"
                alt="Mrunal Thakur"
                height="120px"  // Custom height to make it rectangular
                width="100px"   // Custom width to make it rectangular
                objectFit="cover"
                borderRadius="md"
                _hover={{ cursor: 'pointer' }}  // Hand icon on hover
              />
              <Text fontSize={18} mt={1}>Mrunal Thakur</Text>
            </Box>
            <Box textAlign="center">
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS4HUkcYlV9504oJAIFAuoXwTzG5IziwRjmQ&s"
                alt="Mrunal Thakur"
                height="120px"  // Custom height to make it rectangular
                width="100px"   // Custom width to make it rectangular
                objectFit="cover"
                borderRadius="md"
                _hover={{ cursor: 'pointer' }}  // Hand icon on hover
              />
              <Text fontSize={18} mt={1}>Mrunal Thakur</Text>
            </Box>
            <Box textAlign="center">
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS4HUkcYlV9504oJAIFAuoXwTzG5IziwRjmQ&s"
                alt="Mrunal Thakur"
                height="120px"  // Custom height to make it rectangular
                width="100px"   // Custom width to make it rectangular
                objectFit="cover"
                borderRadius="md"
                _hover={{ cursor: 'pointer' }}  // Hand icon on hover
              />
              <Text fontSize={18} mt={1}>Mrunal Thakur</Text>
            </Box>
            <Box textAlign="center">
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS4HUkcYlV9504oJAIFAuoXwTzG5IziwRjmQ&s"
                alt="Mrunal Thakur"
                height="120px"  // Custom height to make it rectangular
                width="100px"   // Custom width to make it rectangular
                objectFit="cover"
                borderRadius="md"
                _hover={{ cursor: 'pointer' }}  // Hand icon on hover
              />
              <Text fontSize={18} mt={1}>Mrunal Thakur</Text>
            </Box>
            <Box textAlign="center">
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS4HUkcYlV9504oJAIFAuoXwTzG5IziwRjmQ&s"
                alt="Mrunal Thakur"
                height="120px"  // Custom height to make it rectangular
                width="100px"   // Custom width to make it rectangular
                objectFit="cover"
                borderRadius="md"
                _hover={{ cursor: 'pointer' }}  // Hand icon on hover
              />
              <Text fontSize={18} mt={1}>Mrunal Thakur</Text>
            </Box>
            <Box textAlign="center">
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS4HUkcYlV9504oJAIFAuoXwTzG5IziwRjmQ&s"
                alt="Mrunal Thakur"
                height="120px"  // Custom height to make it rectangular
                width="100px"   // Custom width to make it rectangular
                objectFit="cover"
                borderRadius="md"
                _hover={{ cursor: 'pointer' }}  // Hand icon on hover
              />
              <Text fontSize={18} mt={1}>Mrunal Thakur</Text>
            </Box>
            <Box textAlign="center">
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS4HUkcYlV9504oJAIFAuoXwTzG5IziwRjmQ&s"
                alt="Mrunal Thakur"
                height="120px"  // Custom height to make it rectangular
                width="100px"   // Custom width to make it rectangular
                objectFit="cover"
                borderRadius="md"
                _hover={{ cursor: 'pointer' }}  // Hand icon on hover
              />
              <Text fontSize={18} mt={1}>Mrunal Thakur</Text>
            </Box>
            <Box textAlign="center">
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS4HUkcYlV9504oJAIFAuoXwTzG5IziwRjmQ&s"
                alt="Mrunal Thakur"
                height="120px"  // Custom height to make it rectangular
                width="100px"   // Custom width to make it rectangular
                objectFit="cover"
                borderRadius="md"
                _hover={{ cursor: 'pointer' }}  // Hand icon on hover
              />
              <Text fontSize={18} mt={1}>Mrunal Thakur</Text>
            </Box>
            <Box textAlign="center">
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS4HUkcYlV9504oJAIFAuoXwTzG5IziwRjmQ&s"
                alt="Mrunal Thakur"
                height="120px"  // Custom height to make it rectangular
                width="100px"   // Custom width to make it rectangular
                objectFit="cover"
                borderRadius="md"
                _hover={{ cursor: 'pointer' }}  // Hand icon on hover
              />
              <Text fontSize={18} mt={1}>Mrunal Thakur</Text>
            </Box>
            <Box textAlign="center">
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS4HUkcYlV9504oJAIFAuoXwTzG5IziwRjmQ&s"
                alt="Mrunal Thakur"
                height="120px"  // Custom height to make it rectangular
                width="100px"   // Custom width to make it rectangular
                objectFit="cover"
                borderRadius="md"
                _hover={{ cursor: 'pointer' }}  // Hand icon on hover
              />
              <Text fontSize={18} mt={1}>Mrunal Thakur</Text>
            </Box>

            {/* Repeat similar blocks for other friends */}
          </SimpleGrid>
        </Stack>
      </>
    );
  };

  return (
    <Box
      width="450px"
      p="4"
      borderLeft="1px"
      borderColor="gray.200"
      top="16"
      height="100vh"
    >
      {user ? profilePageComponent() : homePageComponent()}  
    </Box>
  );
};

export default RightSidebar;
