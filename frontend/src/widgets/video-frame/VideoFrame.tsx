import { muteAudio, muteVideo } from "@/api/socket";
import {
  MuteAudio,
  MuteVideo,
  UnmuteAudio,
  UnmuteVideo,
} from "@/components/icons/Icons";
import { useState } from "react";

interface SingleUserVideoFrameProps {
  userId: string;
  userName: string;
  videoStream: MediaStream;
  onVideoStreamAdd: (userId: string, videoStream: MediaStream) => void;
  onVideoStreamRemove: (userId: string) => void;
}

const SingleUserVideoFrame = ({
  userId,
  userName,
  videoStream,
  onVideoStreamAdd,
  onVideoStreamRemove,
}: SingleUserVideoFrameProps) => {
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);

  const toggleAudio = () => {
    const action = isAudioMuted ? "unmute" : "mute";
    muteAudio(userId, action);
    setIsAudioMuted(!isAudioMuted);
  };

  const toggleVideo = () => {
    const action = isVideoMuted ? "unmute" : "mute";
    muteVideo(userId, action);
    setIsVideoMuted(!isVideoMuted);
  };

  const handleVideoStreamAdd = () => {
    onVideoStreamAdd(userId, videoStream);
  };

  const handleVideoStreamRemove = () => {
    onVideoStreamRemove(userId);
  };

  return (
    <div className="">
      <h3>{userName}</h3>
      <video
        ref={(videoRef) => {
          if (videoRef && videoStream) {
            videoRef.srcObject = videoStream;
          }
        }}
        autoPlay
        muted={false}
        onCanPlay={handleVideoStreamAdd}
        onEnded={handleVideoStreamRemove}
      />
      <div>
        <button onClick={toggleAudio}>
          {isAudioMuted ? <UnmuteAudio /> : <MuteAudio />}
        </button>
        <button onClick={toggleVideo}>
          {isVideoMuted ? <UnmuteVideo /> : <MuteVideo />}
        </button>
      </div>
    </div>
  );
};

export default SingleUserVideoFrame;
