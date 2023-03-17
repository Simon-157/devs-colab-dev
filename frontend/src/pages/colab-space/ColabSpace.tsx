import { SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { leaveRoom, updateCode } from "@/api/socket";
import Chat from "./Chat";
import UserList from "./UserList";
import Editor from "./Editor";
import { defineTheme } from "@/utils/editor";
import { languageOptions } from "@/utils/constants";
import { Button } from "@material-tailwind/react";
import LanguagesDropdown from "./languagedrop";
import ThemeDropdown from "./Themedrop";
import mainEditorFrameStyle from "./editor.module.scss";

const Room: React.FC = () => {
  const router = useRouter();
  const { roomId } = router.query;
  const [code, setCode] = useState("");
  //  const [code, setCode] = useState(problem);
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [theme, setTheme] = useState({});
  const [language, setLanguage] = useState(languageOptions[0]);

  const handleLeave = () => {
    leaveRoom(roomId as string);
    router.push("/");
  };

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    updateCode(roomId as string, newCode);
  };

  const handleThemeChange = (th: any) => {
    const theme = th;
    console.log("theme...", theme);

    if (["light", "vs-dark"].includes(theme.value)) {
      setTheme(theme);
    } else {
      defineTheme(theme.value).then((_: any) => setTheme(theme));
    }
    return theme;
  };

  const onSelectChange = (
    sl: SetStateAction<{
      id: number; //   text="exit group"
      //   text="exit group"
      name: string;
      label: string;
      value: string;
    }>
  ) => {
    console.log("selected Option...", sl);
    setLanguage(sl);
  };

  /* Setting the theme to oceanic-next. */
  useEffect(() => {
    defineTheme("oceanic-next").then((_: any) =>
      setTheme({ value: "oceanic-next", label: "Oceanic Next" })
    );
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-row">
        <div className="px-4 py-2">
          <LanguagesDropdown onSelectChange={onSelectChange} />
        </div>
        <div className="px-4 py-2">
          <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
        </div>
        <div className={mainEditorFrameStyle.groupButtons}>
          <div className="px-0 py-2 flex w-max gap-2">
            <Button
              className={`bg-green-400 ${mainEditorFrameStyle.btn}`}
              variant="filled"
              color="green"
              //   onClick={copyRoomId}
            >
              save
            </Button>
            {/* <CollabChallenge challenge={currentChallenge} /> */}

            <Button
              className={`bg-red-400 ${mainEditorFrameStyle.btn}`}
              //   text="exit group"
              onClick={handleLeave}
            >
              exit collab
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-1">
        <div className="flex-1 flex flex-col">
          <div className="flex-1">
            <Editor
              initialValue={code}
              room={roomId as string}
              theme={theme}
              language={language}
            />
          </div>
          <div className="flex-none">
            <Chat room={roomId as string} />
          </div>
        </div>
        <div className="w-1/4 bg-gray-100 p-4">
          <UserList roomId={roomId as string} />
        </div>
      </div>
      <div className="bg-gray-100 p-4 flex-none">
        <button onClick={handleLeave}>Leave Room</button>
      </div>
    </div>
  );
};

export default Room;
