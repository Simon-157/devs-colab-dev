import { updateCode } from "@/api/socket";
import React, { useState } from "react";
import Editor, { OnChange, OnMount } from "@monaco-editor/react";
import Loader from "@/components/loader/Loader";

interface CodeEditorProps {
  room: string;
  initialValue: string;
  theme: any;
  language: any;
}

const CodeEditor = (props: CodeEditorProps) => {
  const [value, setValue] = useState(props.initialValue);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    console.log("Editor mounted:", editor);
  };

  const handleEditorChange: OnChange = (e, event) => {
    console.log("Editor changed:", value);
    setValue(e || "");
    updateCode(props.room, props.initialValue);
  };

  return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      {!Editor ? (
        <Loader />
      ) : (
        <Editor
          height="85vh"
          width={`60%`}
          language={props.language || "javascript"}
          value={value}
          theme={props.theme}
          defaultValue="// your code goes here"
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
        />
      )}
    </div>
  );
};

export default CodeEditor;
