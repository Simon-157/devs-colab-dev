import { useQuery } from "react-query";
import { createContext, useContext } from "react";
import { getUser } from "@/api/getUser";
import { User } from "@/interfaces/User";

interface UserContextValue {
  currentUser?: User;
  isCurrentUserLoading: boolean;
}

export const userContext = createContext<UserContextValue>({
  isCurrentUserLoading: true,
});

interface UserProviderProps {
  children: React.ReactNode;
}

const UserProvider = ({ children }: UserProviderProps) => {
  const { data: currentUser, isLoading: isCurrentUserLoading } = useQuery<
    User,
    Error,
    User
  >("current-user", getUser);

  return (
    <userContext.Provider value={{ currentUser, isCurrentUserLoading }}>
      {children}
    </userContext.Provider>
  );
};

export default UserProvider;

export const useUser = () => {
  const { currentUser, isCurrentUserLoading } = useContext(userContext);
  return { currentUser, isCurrentUserLoading };
};
