import { useState, useEffect, useContext } from 'react';
import { Box, Image, Text, Avatar, Flex, Icon, keyframes } from '@chakra-ui/react';
import { AiOutlineHeart, AiFillHeart, AiOutlineMessage } from 'react-icons/ai';
import axios from 'axios';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import CommentSection from '../components/comment';  // Import the new CommentSection component

// Keyframes for the like animation
const bounce = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
`;

// Function to check if media is image or video by looking at the file extension before the query parameters
const isImage = (mediaUrl) => {
  // Extract the part of the URL before the query parameters (anything before "?")
  const cleanUrl = mediaUrl.split('?')[0];
  
  // List of common image file extensions
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
  
  // Extract the file extension (last part after the ".")
  const extension = cleanUrl.split('.').pop().toLowerCase();
  
  return imageExtensions.includes(extension);
};


const SocialMediaPost = ({ post }) => {
  const selfUser = useContext(UserContext).user;
  const [user, setUser] = useState({});
  const [liked, setLiked] = useState(post.likes.includes(selfUser._id) ? true : false); // Track like status
  const [likeCount, setLikeCount] = useState(post.likes.length); // Initial like count
  const [showComments, setShowComments] = useState(false);


  const toggleComments = () => {
    setShowComments(!showComments);
  };
  
  // Function to handle like button click
  const handleLikeClick = async () => {
    try{

      const responce = await axios.put(`http://localhost:3000/api/posts/likeUnlikePost/${post._id}`, {userId: selfUser._id}, {new: true});
      console.log(post.likes.includes(selfUser._id) ? ('liked successfully', responce.data.data) : ('unliked successfully', responce.data.data));
      setLiked(!liked);
      setLikeCount( !liked ? likeCount + 1 : likeCount - 1);
      
      console.log('like count', likeCount);

    }catch(error){
      console.log("error while commenting", error)
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(`http://localhost:3000/api/user/getUser/${post.userId}`);
      setUser(res.data.data);
    };
    fetchUsers();
    console.log('post: ', post);
  }, [post.userId]);

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
      <Flex align="center" mb="2">
        <Link to={selfUser._id === user._id ? `/profile` : `/profile/${user._id}`}>
          <Avatar
            src={user.profilePicture || "https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"} // Default profile image
            alt="Profile"
            size="md"
          />
        </Link>
        <Box ml="3">
          <Text fontWeight="bold">{user.name}</Text>
          <Text fontSize="sm" color="gray.500">
            {format(post.createdAt)}
          </Text>
        </Box>
      </Flex>

      {/* Post Media */}
      {post?.media && (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          maxW="100%" // Full width of the container
          overflow="hidden"
        >
          {isImage(post.media) ? (
            <Image
              src={post.media}
              borderRadius="md"
              mb="4"
              objectFit="cover" // Crop to fit
              width="100%" // Responsive width
              maxH="400px" // Set max height
              height="auto" // Maintain aspect ratio
            />
          ) : (
            <video
              src={post.media}
              controls
              style={{
                width: '100%',
                maxHeight: '400px', // Set max height for video
                objectFit: 'cover', // Crop to fit
                borderRadius: 'md',
              }}
            />
          )}
        </Box>
      )}

      {/* Post Caption */}
      <Text fontSize="lg" mb="4">
        {post?.caption}
      </Text>

       {/* Updated Like and Comment Section */}
       <Flex justify="space-between" align="center">
        <Flex align="center">
          <Icon
            as={liked ? AiFillHeart : AiOutlineHeart}
            boxSize={6}
            color={liked ? 'red.500' : 'red.400'}
            cursor="pointer"
            onClick={handleLikeClick}
            animation={`${liked ? bounce : ''} 0.3s`}
          />
          <Text ml="1" fontSize="sm">
            {likeCount} people like it
          </Text>
        </Flex>

        <Flex align="center" cursor="pointer" onClick={toggleComments}>
          <Icon as={AiOutlineMessage} boxSize={5} />
          <Text ml="1" fontSize="sm">
            {post.comments?.length || 0} comments
          </Text>
        </Flex>
      </Flex>

      {/* Comment Section */}
      {showComments && <CommentSection postId={post._id} />}
    </Box>
  );
};

export default SocialMediaPost;
