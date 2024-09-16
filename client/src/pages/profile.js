import React from 'react';
import Navbar from '../components/Navbar';
import { Box, Flex, Image, Avatar, Text } from '@chakra-ui/react';
import SideBar from '../components/SideBar';
import Feed from '../components/Feed';
import RightBar from '../components/RightBar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState({})
  const { id } = useParams(); 
  useEffect(()=>{
    const fetchUsers = async () => {
      const res = await axios.get(`http://localhost:3000/api/user/getUser/${id}`)
      setUser(res.data.data)
    }
    fetchUsers()
  },[id])
  return (
    <Box>
      <Navbar />
      <Flex>
        <SideBar />
        <Box flex={1} flexDirection="column">
          {/* Banner Image */}
          <Box position="relative" height={400}>
            <Image
              src= {user.coverPicture ? user.coverPitcher :  'https://www.shutterstock.com/image-photo/panoramic-view-grand-teton-range-260nw-440789620.jpg'}
              width={'100%'}
              objectFit="cover"
              height={305}
            />
            {/* Avatar and Bio - Centered */}
            <Flex 
              position="absolute"
              bottom={-21}
              width="100%" 
              justifyContent="center" 
              alignItems="center"
              flexDirection="column"
            >
              <Avatar
                size="2xl"
                name={user.name}
                src={user.profilePicture ? user.profilePicture : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS4HUkcYlV9504oJAIFAuoXwTzG5IziwRjmQ&s"
                border="4px solid white`}
              />
              <Text fontSize="2xl" fontWeight="bold">
              {user.name}
              </Text>
              <Text fontSize="md">{user.bio}</Text>
            </Flex>
          </Box>

          {/* Main Content (Feed + RightBar) */}
          <Flex mt={6} px={6}>
            <Feed userId={user._id}/>
            <RightBar user = {user}/>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Profile;
