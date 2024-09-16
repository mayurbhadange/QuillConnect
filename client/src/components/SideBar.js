import React from 'react';
import {
  VStack,
  HStack,
  Text,
  Button,
  Divider,
  Avatar,
  Box,
  Icon,
} from '@chakra-ui/react';
import {
  FiRss,
  FiMessageSquare,
  FiVideo,
  FiUsers,
  FiBookmark,
  FiHelpCircle,
  FiBriefcase,
  FiCalendar,
  FiBook,
} from 'react-icons/fi';

const MenuItem = ({ icon, children }) => (
  <HStack spacing={4} align="center" py={2}>
    <Icon as={icon} boxSize={5} />
    <Text fontSize="md">{children}</Text>
  </HStack>
);

const Sidebar = () => {
  return (
    <Box
      width="250px"
      height="100vh"
      boxShadow="md"
      position="sticky"
      top="16"
      pl={5}
      
    >
      <Box
        overflowY="auto"
        height="100%"
        pr={4}
        pl={4}
        pb={4}
        css={{
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            width: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'gray.300',
            borderRadius: '24px',
          },
        }}
      >
        <VStack align="stretch" spacing={3} pt={4}>
          <MenuItem icon={FiRss}>Feed</MenuItem>
          <MenuItem icon={FiMessageSquare}>Chats</MenuItem>
          <MenuItem icon={FiVideo}>Videos</MenuItem>
          <MenuItem icon={FiUsers}>Groups</MenuItem>
          <MenuItem icon={FiBookmark}>Bookmarks</MenuItem>
          <MenuItem icon={FiHelpCircle}>Questions</MenuItem>
          <MenuItem icon={FiBriefcase}>Jobs</MenuItem>
          <MenuItem icon={FiCalendar}>Events</MenuItem>
          <MenuItem icon={FiBook}>Courses</MenuItem>
          
          <Button colorScheme="gray" variant="outline" size="sm" mt={2}>
            Show More
          </Button>
          
          <Divider my={4} />
          
          <HStack spacing={3}>
            <Avatar size="sm" name="Jane Doe" src="https://bit.ly/broken-link" />
            <Text fontWeight="medium">Jane Doe</Text>
          </HStack>

          {/* Additional items to demonstrate scrolling */}
          {[...Array(10)].map((_, i) => (
            <MenuItem key={i} icon={FiRss}>Additional Item {i + 1}</MenuItem>
          ))}
        </VStack>
      </Box>
    </Box>
  );
};

export default Sidebar;