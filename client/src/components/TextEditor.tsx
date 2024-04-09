import { useEffect, useState } from "react";
import * as monaco from "monaco-editor";
import { io, Socket } from "socket.io-client";
import debounce from "lodash/debounce";

const TextEditor = () => {
  const [editor, setEditor] =
    useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // Initialize editor and socket connection
    const initEditor = async () => {
      const editorInstance = monaco.editor.create(
        document.getElementById("editor")!,
        {
          value: "",
          language: "javascript",
          theme: "vs-dark",
          fontSize: 14,
          fontFamily: "Consolas, monospace",
          lineNumbers: "on",
          minimap: {
            enabled: false,
          },
          scrollbar: {
            vertical: "visible",
            horizontal: "visible",
          },
        }
      );

      setEditor(editorInstance);

      // Establish socket connection only if not already set
      if (!socket) {
        const socketInstance = io("http://localhost:3000");
        setSocket(socketInstance);

        socketInstance.on("connect", () => {
          console.log("Connected to server");
        });

        socketInstance.on("disconnect", () => {
          console.log("Disconnected from server");
        });

        socketInstance.on("code-change", (newCode: string) => {
          if (editorInstance && newCode !== editorInstance.getValue()) {
            editorInstance.setValue(newCode);
          }
        });

        // Debounce the event handler to limit the frequency of emitting changes
        const emitChangeDebounced = debounce((value: string) => {
          socketInstance.emit("code-change", value);
        }, 500); // Adjust debounce delay as needed

        editorInstance.onDidChangeModelContent(() => {
          if (socketInstance && editorInstance) {
            emitChangeDebounced(editorInstance.getValue());
          }
        });
      }
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
  }, []); // Add editor and socket as dependencies

  return (
    <div
      id="editor"
      style={{ width: "100%", height: "100vh", border: "1px solid #ccc" }}
    />
  );
};

export default TextEditor;
