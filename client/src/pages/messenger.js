import React, { useState, useEffect, useContext, useRef } from 'react';
import { Avatar, Box, Button, HStack, Input, Text, VStack, List, ListItem, Heading, Icon, Flex } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { BiCheckDouble } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import Conversation from '../components/conversation';
import ChatSection from '../components/chatsection';
import {io} from "socket.io-client"
import { OnlineFriend } from '../context/OnlineFriend';

const Messenger = () => {
  const {user} = useContext(UserContext)
  const {onlinefriends, setOnlineFriends} = useContext(OnlineFriend)
  // ... (keep the existing users and chats arrays)
  const [users, setUsers] = useState([])
  const [newConvo, setIsNewConvo] = useState(false)
  const [conversations, setConversations] = useState([]);
  const [selectedConversations, setSelectedConversations] = useState(null);
  const [chats, setChats] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const socket = useRef();

  useEffect(()=>{
    socket.current = io("ws://localhost:8900");
  },[])

  useEffect(()=>{
    socket?.current.emit("addUser", user._id)   
    socket?.current.on("getUsers", users => {
      console.log("online f: ", onlinefriends);
      setOnlineFriends(users);
    })
  },[user])
 
  
  //fetch user
  const fetchUser = async(userId)=> {
    try{
      const res = await axios.get(`http://localhost:3000/api/user/getUser/${userId}`)
      return res;
    }catch(error){
      console.error(error)
      return null;
    }
  }

  //fetch all users
  const fetchAllUsers = async()=> {
    try{
      const res = await axios.get(`http://localhost:3000/api/user/getAllUsers`)
      setUsers(res.data.data)
    }catch(error){
      console.error(error)
    }
  }

  const suggestedUserHandler = async(u) => {
    try{

      const id1 = u._id;
      const id2 = user._id;
      console.log("id1: ", id1, " id2: ", id2);
      const res = await axios.get(`http://localhost:3000/api/conversation/getSingleConversation?id1=${id1}&id2=${id2}`);
      console.log("res",res.data.data[0]);
      if(res.data.data.length === 0){
        setIsNewConvo(true);
        setSelectedConversations(u);
      }else{
        setIsNewConvo(false);
        setSelectedConversations(res.data.data[0]);
      }
      
      setSearchTerm('');

    }catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    const results = users.filter(u =>
      {
        return u.username.toLowerCase().includes(searchTerm.toLowerCase())
      }  
    );
    setSearchResults(results);
  }, [searchTerm]);
  
  useEffect(()=>{
    // Fetch conversations from the server
    const fetchConversations = async () => {
      try{
        const res = await axios.get(`http://localhost:3000/api/conversation/getConversation/${user._id}`)
        setConversations(res.data.data) 
      }catch(error){
        console.error(error) 
      }
    }
    
    fetchConversations();
    fetchAllUsers();
    
    console.log("conversations",conversations)
  },[user])

  const chatOpener = (conver) => {
    console.log("conver",conver)
    setSelectedConversations(conver);
    setSearchTerm('');
  };



  return (
    <Flex h="100vh">
      {/* Users list section */}
      <Flex w="30%" flexDirection="column" borderRight="1px solid" borderColor="gray.600">
        {/* Fixed header */}
        <Box p={4} borderBottom="1px solid" borderColor="gray.600">
          <HStack spacing={4} onClick={() => window.location.href = '/'} cursor="pointer">
            <Icon as={FaHome} boxSize={6} color="white" />
            <Heading size="lg" color="white">ShareFun Chat</Heading>
          </HStack>
        </Box>

        {/* Search bar */}
        <Box p={4} borderBottom="1px solid" borderColor="gray.600">
          <Box position="relative">
            <Input
              placeholder="Search for a user"
              rounded="15px"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchIcon
              position="absolute"
              right="20px"
              top="50%"
              transform="translateY(-50%)"
              color="gray.500"
            />
          </Box>
        </Box>

        {/* Scrollable user list */}
        <Box overflowY="auto" flex={1}>
          {searchTerm && (
            <List
              bg="white"
              borderRadius="md"
              boxShadow="md"
              mb={2}
            >
              {searchResults.map((user) => (
                <ListItem
                  key={user.id}
                  onClick={() => {
                    suggestedUserHandler(user);
                  }}
                  p={2}
                  _hover={{ bg: "gray.100" }}
                  cursor="pointer"
                >
                  <HStack>
                    <Avatar src={user.profilePicture} size="sm" />
                    <Text color="black">{user.username}</Text>
                  </HStack>
                </ListItem>
              ))}
            </List>
          )}
          {conversations.map((c) => (
            <Conversation key={c._id} conversation={c} onClick={() => chatOpener(c)} />
          ))}
        </Box>
      </Flex>

      {/* Chat section */}
      <Flex w="70%" flexDirection="column">
        {selectedConversations === null ? (
          <Flex flex={1} alignItems="center" justifyContent="center">
            <Text color="white" fontSize="2xl">Select a user to start chatting</Text>
          </Flex>
        ) : (
          <ChatSection selectedConversations = {selectedConversations} newConvo = {newConvo} />
        )}
      </Flex>
    </Flex>
  );
}

export default Messenger;