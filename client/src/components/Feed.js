import React, { useEffect, useState } from 'react';
import Share from './Share';
import { Box, Center } from '@chakra-ui/react';
import Post from './Post';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';

const Feed = ({ userId }) => {
  const [posts, setPosts] = useState([]);
  const selfUserId = useContext(UserContext).userId;
  const [user, setUser] = useState(null);


  useEffect(() => {
    if (selfUserId) {
      const fetchUser = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/user/getUser/${selfUserId}`);
          setUser(response.data.data);
        } catch (err) {
          console.error("Error fetching user:", err);
        }
      };
      fetchUser();
    }

  }, [selfUserId]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = userId
        ? await axios.get(`http://localhost:3000/api/posts/getAllUserPost/${userId}`)
        : await axios.get(`http://localhost:3000/api/posts/getAllPost/${selfUserId}`);
     
      setPosts(res.data.data);
    };
    user && fetchPosts();
  }, [userId, selfUserId, user]);
 

  return (
    <Box width={800} display="flex" alignItems="center" flexDirection="column" gap={2}>
      <Share />

      {posts === undefined || posts.length === 0 ? (
        <Box>No Post Yet !!!</Box>
      ) : (
        posts.map((post) => <Post key={post._id} post={post} />)
      )}
    </Box>
  );
};

export default Feed;
