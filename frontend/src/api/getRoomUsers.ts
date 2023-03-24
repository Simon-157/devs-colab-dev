import axios from "axios";

export const getRoomUsers = async (roomId:string) => {
  const user = await axios({
    method: "get",
    url: `http://localhost:5000/user/roomembers/:${roomId}`,
    withCredentials: true,
  });
  // console.log(user);
  return user.data.user;
};