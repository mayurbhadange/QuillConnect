import React from 'react';
import Navbar from '../components/Navbar';
import { Box, Flex, Image, Avatar, Text } from '@chakra-ui/react';
import SideBar from '../components/SideBar';
import Feed from '../components/Feed';
import RightBar from '../components/RightBar';
// import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const Profile = () => {
  const { user } = useContext(UserContext);
  console.log('profile data : ',user.name);
  return (
    <Box>
      <Navbar />
      <Flex>
        <SideBar />
        <Box flex={1} flexDirection="column">
          {/* Banner Image */}
          <Box position="relative" height={400}>
            <Image
              src= { 'https://www.shutterstock.com/image-photo/panoramic-view-grand-teton-range-260nw-440789620.jpg'}
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
                src={ `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS4HUkcYlV9504oJAIFAuoXwTzG5IziwRjmQ&s"
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
