import React from 'react'
import Navbar from '../components/Navbar';
import {Box, Flex} from '@chakra-ui/react';
import SideBar from '../components/SideBar'
import Feed from '../components/Feed';
import RightBar from '../components/RightBar';

const Home = () => {
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