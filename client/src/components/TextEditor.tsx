import { useEffect, useState } from "react";
import * as monaco from "monaco-editor";
import { io, Socket } from "socket.io-client";

const TextEditor = () => {
  const [editor, setEditor] =
    useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    
    const initEditor = async () => {
      const editorInstance = monaco.editor.create(
        document.getElementById("editor")!,
        {
          value: "",
          language: "javascript",
          theme: "vs-dark",
          fontSize: 14, // Adjust font size
          fontFamily: "Consolas, monospace", // Use a monospace font
          lineNumbers: "on", // Show line numbers
          minimap: {
            enabled: false, // Disable minimap
          },
          scrollbar: {
            vertical: "visible", // Always show vertical scrollbar
            horizontal: "visible", // Always show horizontal scrollbar
          },
        }
      );

      setEditor(editorInstance);

      const socketInstance = io("http://localhost:3000");
      setSocket(socketInstance);

      socketInstance.on("code-change", (newCode: string) => {
        if (editorInstance && newCode !== editorInstance.getValue()) {
          editorInstance.setValue(newCode);
        }
      });

      editorInstance.onDidChangeModelContent(() => {
        if (socketInstance && editorInstance) {
          socketInstance.emit("code-change", {
            code: editorInstance.getValue(),
            source: 'local'
          });
        }
      });
    };

    initEditor();

    return () => {
      if (editor) {
        editor.dispose();
      }
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  return (
    <div
      id="editor"
      style={{ width: "100%", height: "100vh", border: "1px solid #ccc" }}
    />
  );
};

export default TextEditor;
