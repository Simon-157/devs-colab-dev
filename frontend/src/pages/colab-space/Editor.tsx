import { updateCode } from "@/api/socket";
import { useState } from "react";
import MonacoEditor from "react-monaco-editor";

interface CodeEditorProps {
  room: string;
  initialValue: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ room, initialValue }) => {
  const [code, setCode] = useState(initialValue);

  const handleChange = (value: string) => {
    setCode(value);
    updateCode(room, value);
  };

  return (
    <MonacoEditor
      height="calc(100vh - 80px)"
      width="100%"
      language="javascript"
      theme="vs-light"
      value={code}
      options={{
        fontSize: 16,
        minimap: { enabled: false },
        automaticLayout: true,
      }}
      onChange={handleChange}
    />
  );
};

export default CodeEditor;
