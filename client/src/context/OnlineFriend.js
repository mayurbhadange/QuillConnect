import { createContext, useState } from 'react';

// Create a UserContext
export const OnlineFriend = createContext();

// Create a provider component
export const OnlineFriendProvider = ({ children }) => {
  const [onlinefriends, setOnlineFriends] = useState([]);
  return (
    <OnlineFriend.Provider value={{ onlinefriends, setOnlineFriends }}>
      {children}
    </OnlineFriend.Provider>
  );
};