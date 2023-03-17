// import { useState, useEffect } from "react";
// import SingleUserVideoFrame from "./VideoFrame";

import { useEffect, useState } from "react";
import { subscribeToUserUpdates } from "@/api/socket";
import SingleUserVideoFrame from "./VideoFrame";

interface AllUsersVideoProps {
  roomId: string;
}

const AllUsersVideo = ({ roomId }: AllUsersVideoProps) => {
  const [userStreams, setUserStreams] = useState<{ [key: string]: MediaStream }>({});

  useEffect(() => {
    const handleUserStreams = (users: string[]) => {
      const streams = users.reduce<{ [key: string]: MediaStream }>((acc, curr) => {
        acc[curr] = new MediaStream();
        return acc;
      }, {});
      setUserStreams(streams);
    };

    subscribeToUserUpdates(handleUserStreams);

    return () => {
      // cleanup function
      setUserStreams({});
    };
  }, [roomId]);

  const addVideoStreamToUser = (userId: string, videoStream: MediaStream) => {
    setUserStreams((prevStreams) => ({
      ...prevStreams,
      [userId]: videoStream,
    }));
  };

  const removeVideoStreamFromUser = (userId: string) => {
    setUserStreams((prevStreams) => {
      const { [userId]: streamToRemove, ...restStreams } = prevStreams;
      if (streamToRemove) {
        streamToRemove.getTracks().forEach((track) => track.stop());
      }
      return restStreams;
    });
  };

  return (
    <div>
      {Object.entries(userStreams).map(([userId, videoStream]) => (
        <SingleUserVideoFrame
          key={userId}
          userId={userId}
          userName={userId}
          videoStream={videoStream}
          onVideoStreamAdd={() => addVideoStreamToUser(userId, videoStream)}
          onVideoStreamRemove={() => removeVideoStreamFromUser(userId)}
        />
      ))}
    </div>
  );
};

export default AllUsersVideo;



// interface User {
//   id: string;
//   name: string;
//   videoStream: MediaStream | null;
// }

// interface AllUsersVideoProps {
//   users: User[];
// }

// const AllUsersVideo = ({ users }: AllUsersVideoProps) => {
//   const [userStreams, setUserStreams] = useState<Record<string, MediaStream>>({});

//   useEffect(() => {
//     const streamPromises = users.map((user) => {
//       if (user.videoStream) {
//         return Promise.resolve(user.videoStream);
//       } else {
//         return navigator.mediaDevices
//           .getUserMedia({
//             video: true,
//             audio: true,
//           })
//           .then((stream) => {
//             user.videoStream = stream;
//             return stream;
//           });
//       }
//     });

//     Promise.all(streamPromises).then((streams) => {
//       const streamObj: Record<string, MediaStream> = {};
//       users.forEach((user, i) => {
//         streamObj[user.id] = streams[i];
//       });
//       setUserStreams(streamObj);
//     });

//     return () => {
//       users.forEach((user) => {
//         if (user.videoStream) {
//           user.videoStream.getTracks().forEach((track) => track.stop());
//         }
//       });
//     };
//   }, [users]);

//   return (
//     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//       {users.map((user) => (
//         <div key={user.id}>
//           <SingleUserVideoFrame
//             userId={user
