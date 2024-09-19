import React from 'react'
import Navbar from '../components/Navbar';
import {Box, Flex} from '@chakra-ui/react';
import SideBar from '../components/SideBar'
import Feed from '../components/Feed';
import RightBar from '../components/RightBar';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const Home = () => {
  const {user} = useContext(UserContext);
  if(!user) {
    window.location.href = "/login";
  }
  return (
    <Box>
      <Navbar/>
        <Flex  >
        <SideBar  />
        <Feed />
        <RightBar/>
      </Flex>
    </Box>
  )
}

export default Home