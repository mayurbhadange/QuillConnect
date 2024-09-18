
import { createContext, useState , useEffect} from 'react';

// Create a UserContext
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(()=>{
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  }); // Initially, no user is logged in
 
    // // Load user from local storage on component mount
    // useEffect(() => {
    //   const storedUser = localStorage.getItem('user');
    //   if (storedUser) {
    //     setUser(JSON.parse(storedUser));
    //   }
    // }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
