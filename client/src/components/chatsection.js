import React, { useState, useEffect, useContext, useRef } from 'react';
import { Avatar, Box, Button, HStack, Input, Text, VStack } from '@chakra-ui/react';
import { BiCheckDouble } from "react-icons/bi";
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import {io} from 'socket.io-client';

const Chatsection = ({ selectedConversations , newConvo}) => {
    const selfUserId = useContext(UserContext).userId;
    const [chats, setChats] = useState([]);
    const [arrivalChat, setArrivalChat] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [msg, setMsg] = useState("");
    const socket = useRef();

    // Reference for the end of the chat
    const messagesEndRef = useRef(null);

    // Function to scroll to the bottom of the chat
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => { 
        socket.current = io("ws://localhost:8900");
        socket?.current.on("getMessage", data => {
            console.log("dddddddddata", data)
            setArrivalChat({
                senderId: data.senderId,
                message: data.text,
                createdAt: Date.now(),
            });
            scrollToBottom();
        });
    }, []); 
 

    useEffect(()=>{
        arrivalChat && selectedConversations?.members.includes(arrivalChat.senderId) &&
        setChats(prev => [...prev, arrivalChat]);
        scrollToBottom();
        console.log("chatschatschatschatschats", chats)
    }, [arrivalChat])


    const megSender = async () => {
        try {
            const newuser = newConvo && await axios.post(`http://localhost:3000/api/conversation/createConversation`, {
                members : [selfUserId, selectedConversations._id]
            });
            
            console.log("newConvo", newuser)
            socket.current.emit("sendMessage", {
                senderId : selfUserId,
                receiverId : selectedConversations.members.find(userId => selfUserId !== userId),
                text : msg
            })

            const newMessage = {
                conversationId: newConvo ? newuser.data.data._id : selectedConversations._id,
                senderId: selfUserId,
                message: msg
            };
            const res = await axios.post(`http://localhost:3000/api/message/createMessage`, newMessage);
            // setChats([...chats, newMessage]);  // Add the new message to the list
            setMsg("");  // Clear the input box
            scrollToBottom();  // Scroll to the latest message after sending
        } catch (err) {
            console.log(err);
        }
    };

    const getTime = (createdAt) => {
        const dateObj = new Date(createdAt);
        let hours = dateObj.getHours();
        const minutes = dateObj.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        return `${hours}:${minutes} ${ampm}`;
    };
    
    const fetchMessages = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/api/message/getAllMessages/${selectedConversations._id}`);
            const sortedMessages = res.data.data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            setChats(sortedMessages);
            console.log("chatsssssssss",sortedMessages[0].conversationId);
            scrollToBottom();  // Scroll to the latest message when messages are loaded
        } catch (err) {
            console.log(err);
        } 
    };

    const getUser = async (friendId) => {
        try {
            const res = await axios.get(`http://localhost:3000/api/user/getUser/${friendId}`);
            setSelectedUser(res.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const friendId = !newConvo && selectedConversations.members.find((m) => m !== selfUserId);
        !newConvo && fetchMessages();
        !newConvo && getUser(friendId);
        newConvo && setChats([]);
        newConvo && setSelectedUser(selectedConversations);
        scrollToBottom(); 
    }, [selectedConversations]);

    return (
        <>
            {/* Chat header */}
            <Box p={4} borderBottom="1px solid" borderColor="gray.600">
                <HStack _hover={{ cursor: "pointer" }} onClick={()=> window.location.href = `/profile/${selectedUser._id}`}>
                    <Avatar src={selectedUser != null && selectedUser.profilePicture} alt={selectedUser != null && selectedUser.username} mr={2} size="md" />
                    <Text color="white" fontSize="xl" fontWeight="bold">{selectedUser?.name}</Text>
                </HStack>
            </Box>

            {/* Chat content area */}
            <VStack flex={1} overflowY="auto" p={4} spacing={4} alignItems="stretch">
                {chats.map((chat, index) => (
                    <HStack key={index} alignSelf={chat.senderId !== selfUserId ? 'flex-start' : 'flex-end'} maxW="70%">
                            {chat.senderId !== selfUserId && (
                                <Avatar src={selectedUser != null && selectedUser.profilePicture} alt={selectedUser != null && selectedUser.username} size="sm" />
                            )}
                        <HStack alignItems="flex-end" spacing={2}>
                            <VStack align={'end'} spacing={1}>
                                <Text color="white" p={2} fontSize="md" rounded="md" bg={chat.senderId === selfUserId ? 'blue.600' : 'gray.600'}>
                                    {chat.message}
                                </Text>
                                <HStack spacing={1}>
                                    <Text fontSize="xs" color="gray.400">{getTime(chat.createdAt)}</Text>
                                    {chat.senderId === selfUserId && (
                                        <BiCheckDouble color={chat.seen ? 'skyblue' : 'gray'} size={16} />
                                    )}
                                </HStack>
                            </VStack>
                        </HStack>
                    </HStack>
                ))}
                {/* Reference to scroll to */}
                <div ref={messagesEndRef} />
            </VStack>

            {/* Input section */}   
            <Box p={4} borderTop="1px solid" borderColor="gray.600">
                <HStack>
                    <Input placeholder="Have something to share..." rounded="15px" value={msg} onKeyPress={(e)=> e.key == 'Enter' && megSender()} onChange={(e) => setMsg(e.target.value)} />
                    <Button colorScheme="blue" onClick={() => megSender()}>
                        Post
                    </Button>
                </HStack>
            </Box>
        </>
    );
};

export default Chatsection;
