import React, { useState, useEffect, useContext } from 'react';
import { Box, Text, Image } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const FollowerFriend = ({ id }) => {
    const selfUser = useContext(UserContext).user;
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                console.log("id", id);
                const res = await axios.get(`http://localhost:3000/api/user/getUser/${id}`);
                setUser(res.data.data);
                console.log("user", res.data.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUser();
    }, [id]);

    return (
        <Box>
            <Image
                src={user?.profilePicture}
                alt={user?.username}
                height="120px"  // Custom height to make it rectangular
                width="100px"   // Custom width to make it rectangular
                objectFit="cover"
                borderRadius="md"
                _hover={{ cursor: 'pointer' }}  // Hand icon on hover
                onClick={() => selfUser._id == user?._id ? window.location.href = `/profile` : navigate(`/profile/${user._id}`)} // Redirect to user profile on click
            />
            <Text fontSize={18} mt={1}>{user?.name}</Text>
        </Box>
    );
};

export default FollowerFriend;