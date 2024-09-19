import React, { useEffect, useState } from 'react';
import Share from './Share';
import { Box, Center } from '@chakra-ui/react';
import Post from './Post';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';

const Feed = ({ userId }) => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = userId
        ? await axios.get(`http://localhost:3000/api/posts/getAllUserPost/${userId}`)
        : await axios.get(`http://localhost:3000/api/posts/getAllPost/${user._id}`);
      console.log('posts', user);
      setPosts(res.data.data);
    };
    fetchPosts();
  }, []);

  console.log('posts.length', posts);

  return (
    <Box width={800} display="flex" alignItems="center" flexDirection="column" gap={4}>
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
