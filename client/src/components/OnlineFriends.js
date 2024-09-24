import React from 'react'
import { Box, Text, Flex, Image, Icon, Divider, Stack, SimpleGrid, HStack, Button } from '@chakra-ui/react';

const OnlineFriends = (user) => {
  return (
    <Flex align="center" mb="3">
    <Image
      boxSize="40px"
      borderRadius="full"
      src={user.profilePicture}
      alt="Safak Kocaoglu"
    />
    <Box ml="3">
      <Text fontWeight="bold" fontSize="sm">
        {user.name}
      </Text>
      <Box as="span" color="green.400" boxSize="3" borderRadius="50%" bg="green.400" />
    </Box>
  </Flex>
  )
}

export default OnlineFriends