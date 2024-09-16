import React, { useEffect, useState } from 'react'
import Share from './Share'
import { Box, Center } from '@chakra-ui/react'
import Post from './Post'
import axios from 'axios'

const Feed = ({userId}) => {
  const [posts, setPosts] = useState([])

  useEffect(()=>{
    const fetchPosts = async () => {
      const res = userId ?
       await axios.get(`http://localhost:3000/api/posts/getAllUserPost/${userId}`) : 
       await axios.get("http://localhost:3000/api/posts/getAllPost/66e3c97f81964887807133cb")
     
      setPosts(res.data)
    }
    fetchPosts()
  },[])
  return (
    <Box width={800} display="flex"   alignItems="center" flexDirection="column" gap={4} >
        <Share/>
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
    </Box>
  )
}

export default Feed