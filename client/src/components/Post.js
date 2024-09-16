import { useState } from 'react';
import { Box, Image, Text, Avatar, Flex, Icon, keyframes } from '@chakra-ui/react';
import { AiOutlineHeart, AiFillHeart, AiOutlineMessage } from 'react-icons/ai';
import axios from 'axios';
import { useEffect } from 'react';
import {format} from 'timeago.js'
import { Link } from 'react-router-dom';

// Keyframes for the like animation
const bounce = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
`;

const SocialMediaPost = ( {post} ) => {
  const [user, setUser] = useState({})
  const [liked, setLiked] = useState(false); // Track like status
  const [likeCount, setLikeCount] = useState(post.likes.length); // Initial like count

  // Function to handle like button click
  const handleLikeClick = () => {
    setLiked(!liked); // Toggle like status
    setLikeCount(liked ? likeCount - 1 : likeCount + 1); // Update like count
  };

  useEffect(()=>{
    const fetchUsers = async () => {
      const res = await axios.get(`http://localhost:3000/api/user/getUser/${post.userId}`)
      setUser(res.data.data)
    }
    fetchUsers()
  },[post.userId])
  return (
    <Box
      width={600}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="sm"
      p="4"
      
    >
      {/* User Info */}
      <Flex align="center" mb="3" >
        <Link to={`/profile/${user._id}`}>
        <Avatar
          src={user.profilePicture ? user.profilePicture : "https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"} // Replace with actual profile image
          alt="Profile"
          size="md"
        />
        </Link>
        <Box ml="3">
          <Text fontWeight="bold">{user.name}</Text> {/* Replace with actual username  =>  {users.filter( (u) => u.id === post.userId )[0].caption} */}
          <Text fontSize="sm" color="gray.500">
            {format(post.createdAt)}
          </Text>
        </Box>
      </Flex>

      {/* Post Image */}

      {post?.image && (
      <Box display={"flex"}
      flexDirection={"column"}
      alignItems={"center"} >
        
        <Image
          src={`${post?.image}`} // Replace with the uploaded image path
          borderRadius="md"
          mb="4"
        />
      </Box>)}

      {/* Post Caption */}
      <Text fontSize="lg" mb="4">
        {post?.caption}
      </Text>

      {/* Like and Comment Section */}
      <Flex justify="space-between" align="center">
        <Flex align="center">
          {/* Animated like button */}
          <Icon
            as={liked ? AiFillHeart : AiOutlineHeart} // Toggle between filled and outlined heart
            boxSize={6}
            color={liked ? 'red.500' : 'red.400'}
            cursor="pointer"
            onClick={handleLikeClick}
            animation={`${liked ? bounce : ''} 0.3s`} // Apply animation when liked
          />
          <Text ml="1" fontSize="sm">
            {likeCount} people like it
          </Text>
        </Flex>

        <Flex align="center">
          <Icon as={AiOutlineMessage} boxSize={5} />
          <Text ml="1" fontSize="sm">
            12 comments
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default SocialMediaPost;
