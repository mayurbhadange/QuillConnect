import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Box, Flex, Image, Avatar, Text } from '@chakra-ui/react';
import SideBar from '../components/SideBar';
import Feed from '../components/Feed';
import RightBar from '../components/RightBar';
import { useParams } from 'react-router-dom'; // Uncommented
import { UserContext } from '../context/UserContext';
import axios from 'axios';

const Profile = () => {
  const { id } = useParams(); // Extract id from URL
  const { user: defaultUser } = useContext(UserContext); // Default user from context
  const [user, setUser] = useState(defaultUser); // State to hold user data
  const [loading, setLoading] = useState(false); // State to handle loading status

  useEffect(() => {
    const fetchUser = async () => {
      if (id) {
        setLoading(true);
        try {
          const response = await axios.get(`http://localhost:3000/api/user/getUser/${id}`);
          setUser(response.data.data); // Set user data from API response
          console.log('============>',response)
        } catch (err) {
          console.log("Error fetching user data:", err);
          window.location.href = '/nopage'; // Redirect if error occurs
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUser(); // Call the function to fetch user data if `id` exists
  }, [id]);

  if (loading) {
    return <Text>Loading...</Text>; // Render loading state while data is being fetched
  }

  if (!user) {
    return <Text>User not found</Text>; // Handle case if user data is not available
  }

  return (
    <Box>
      <Navbar />
      <Flex>
        <SideBar />
        <Box flex={1} flexDirection="column">
          {/* Banner Image */}
          <Box position="relative" height={400}>
            <Image
              src={user.coverPicture}
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
                src={user.profilePicture}
              />
              
              <Text fontSize="2xl" fontWeight="bold">
                {user.name}
              </Text>
              <Text fontSize="md">{user.bio}</Text>
            </Flex>
          </Box>

          {/* Main Content (Feed + RightBar) */}
          <Flex mt={6} px={6}>
            <Feed userId={user._id} />
            <RightBar user={user} />
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Profile;
