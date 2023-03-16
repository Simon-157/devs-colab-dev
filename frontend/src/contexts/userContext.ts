import { User } from "@/interfaces/User";
import React from "react";

interface UserContextType {
    currentUser: User | null;
    setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  }
  
  export const userContext = React.createContext<UserContextType>({
    currentUser: null,
    setCurrentUser: () => {},
  });
  