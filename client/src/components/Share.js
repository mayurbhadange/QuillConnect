import React from 'react';
import { Box, Flex, Input, Avatar, Button, Text, Icon } from '@chakra-ui/react';
import { FaCamera, FaTag, FaMapMarkerAlt, FaSmile } from 'react-icons/fa';

const Share = () => {
  return (
    <Box maxWidth="550px" borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} mt={3}>
      <Flex alignItems="center" mb={4}>
        <Avatar size="md" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS4HUkcYlV9504oJAIFAuoXwTzG5IziwRjmQ&s" mr={3} />
        <Input placeholder="What's in your mind Mrunal?" variant="unstyled" />
      </Flex>
      <Flex justifyContent="space-between" alignItems="center">
        <Flex>
          <Button leftIcon={<Icon as={FaCamera} />} variant="ghost" colorScheme="red" size="sm" mr={2}>
            <Text fontSize="sm">Photo or Video</Text>
          </Button>
          <Button leftIcon={<Icon as={FaTag} />} variant="ghost" colorScheme="blue" size="sm" mr={2}>
            <Text fontSize="sm">Tag</Text>
          </Button>
          <Button leftIcon={<Icon as={FaMapMarkerAlt} />} variant="ghost" colorScheme="green" size="sm" mr={2}>
            <Text fontSize="sm">Location</Text>
          </Button>
          <Button leftIcon={<Icon as={FaSmile} />} variant="ghost" colorScheme="yellow" size="sm">
            <Text fontSize="sm">Feelings</Text>
          </Button>
        </Flex>
        <Button colorScheme="green" size="sm" ml={2}>
          Share
        </Button>
      </Flex>
    </Box>
  );
};

export default Share;