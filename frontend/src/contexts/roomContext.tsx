import { useQuery } from "react-query";
import { createContext, useContext } from "react";
import { getUser } from "@/api/getUser";
import { RoomProp } from "@/interfaces/Room";

interface RoomContextValue{
  activeRoom?: RoomProp;
  isActiveRoomLoading: boolean;
}

export const activeRoomContext = createContext<RoomContextValue>({
  isActiveRoomLoading: true,
});

interface ActiveRoomProviderProps {
  children: React.ReactNode;
}

const RoomProvider = ({ children }: ActiveRoomProviderProps) => {
  const { data: activeRoom, isLoading: isActiveRoomLoading } = useQuery<
    RoomProp,
    Error,
    RoomProp
  >("current-user", getUser);

  return (
    <activeRoomContext.Provider value={{ activeRoom, isActiveRoomLoading }}>
      {children}
    </activeRoomContext.Provider>
  );
};

export default RoomProvider;

export const useUser = () => {
  const { activeRoom, isActiveRoomLoading } = useContext(activeRoomContext);
  return { activeRoom, isActiveRoomLoading };
};
