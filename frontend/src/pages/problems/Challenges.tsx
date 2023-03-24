/* Importing the necessary libraries for the component to work. */

import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { v4 } from "uuid";
import toast from "react-hot-toast";
import {
  Button,
  Input,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";

/* Importing the necessary Components */
import { userContext } from "../../contexts/userContext";
import problemStyles from "./problem-styles.module.scss";
import Loader from "../../components/loader/Loader";
import FetchProblems from "@/api/FetchProblems";
import { ProblemPropType } from "@/interfaces/ProblemPropType";
import { createColab, joinRoom } from "@/api/socket";

const Challenges: React.FC<any> = (props: any) => {
  const { currentUser } = useContext(userContext);
  const { data, isLoading } = useQuery("challenges", FetchProblems);
  // console.log(currentUser);
  const [activeChallenge, setActiveChallenge] = useState<ProblemPropType>();

  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [roomName, setRoomName] = useState("");
  const router = useRouter();
  const handleOpen = () => {
    setOpen(!open);
    setRoomId("");
  };

  const handleShow = () => setShow(!show);

  const CurrentChallenge = (e: ProblemPropType) => {
    setActiveChallenge(e);
  };

  const createNewRoom = async (e: any) => {
    e.preventDefault();
    const id = v4();
    setRoomId(id);

      // TODO:: CREATE NEW SOCKET ROOM
      // roomId, roomName, user, challenge
    createColab(id, roomName, currentUser?.userid ?? "", activeChallenge?.id ?? -1);

    toast.success("Created a new collab");
  };

  const joinCollab = (roomId:string, roomName:string) => { //TODO: WILL REMOVE roomName, once backend retrievl of roomdata for the given roomd
    
    if (!roomId) {
      toast.error("ROOM ID & username is required");
      return;
    }

    if (!roomName) {
      toast.error("Room name is required");
      return;
    }
    console.log(roomId, roomName);
    // Redirect

    // TODO:: JOIN USER TO A ROOM
    joinRoom(roomId, currentUser?.userid?? "Anonymous");
    

    router.push(
      {
        pathname: `/colab-space/${roomId}`,
        query: {
          title: activeChallenge?.title ?? "",
          content: activeChallenge?.description ?? "",
          user: JSON.stringify({
            username: currentUser?.username,
            avatar: currentUser?.avatarurl,
          }),
        },
      },
      `/colab-space/${roomId}`
    );
  };

  return (
    <>
      {!isLoading ? (
        <>
          <Typography
            className="flex flex-row gap-4 place-items-center justify-center"
            variant="h5"
            color="current"
          >
            CHALLENGES
            <Button onClick={handleShow} className="bg-sky-100 text-sky-light">
              Join A Colab
            </Button>
            <Dialog
              open={show}
              handler={handleShow}
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0.9, y: -100 },
              }}
            >
              <DialogHeader>
                <h2>create colab</h2>
              </DialogHeader>
              <DialogBody className="flex items-center justify-center flex-col gap-10">
                <Input
                  className="w-auto"
                  variant="outlined"
                  onChange={(e) => setRoomId(e.target.value)}
                  label="Room Id"
                  placeholder="collab Id"
                />
              </DialogBody>
              <DialogFooter>
                <Button variant="text" color="green" onClick={() => joinCollab(roomId, "Giants")}>
                  <span>Join</span>
                </Button>
              </DialogFooter>
            </Dialog>
          </Typography>
          <div className={problemStyles.problemCardsWrapper}>
            <div className={problemStyles.problemsContainer}>
              {data?.map((challenge: ProblemPropType) => {
                return (
                  <div
                    key={challenge.id}
                    // onClick={() =>{startSubmitHandler()}}
                    className={problemStyles.problemCard}
                    onClick={() => {
                      CurrentChallenge(challenge);
                    }}
                  >
                    <Button onClick={handleOpen} className="text-sky-700">
                      Collab
                    </Button>
                    <p>{challenge.title}</p>
                    <p>{challenge.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <Dialog
            className="flex mt-6 justify-center place-items-center flex-col"
            open={open}
            handler={handleOpen}
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0.9, y: -100 },
            }}
          >
            <DialogHeader>{activeChallenge?.title}</DialogHeader>
            <DialogBody className="flex items-center justify-center flex-col gap-10">
              <Input
                className="w-auto"
                variant="outlined"
                label="Room Id"
                value={roomId}
                placeholder="read only"
                readOnly
              />

              <Input
                className="w-auto"
                variant="outlined"
                label="Room Name"
                onChange={(e) => setRoomName(e.target.value)}
                id="roomName"
                placeholder="e.g warrior devs"
              />
            </DialogBody>
            <DialogFooter>
              <Button
                variant="text"
                color="red"
                onClick={handleOpen}
                className="mr-1"
              >
                <span>Cancel</span>
              </Button>
              {roomId === "" ? (
                <Button variant="text" color="green" onClick={createNewRoom}>
                  <span>Confirm</span>
                </Button>
              ) : (
                <div className="flex gap-4">
                  <Button
                    variant="text"
                    color="blue"
                    className="bg-sky-50"
                    onClick={() => joinCollab(roomId, roomName)}
                  >
                    {" "}
                    Start
                  </Button>
                  <Button
                    variant="text"
                    className="bg-sky-50"
                    color="blue"
                    onClick={() => {
                      navigator.clipboard.writeText(roomId);
                      toast.success("Id coppied");
                    }}
                  >
                    CopyId
                  </Button>
                </div>
              )}
            </DialogFooter>
          </Dialog>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Challenges;
