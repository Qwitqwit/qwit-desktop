import { Text } from "../components/text.tsx";
import { Button } from "../components/button.tsx";
import { useState } from "react";
import { open, save } from "@tauri-apps/plugin-dialog";
import { invoke } from "@tauri-apps/api/core";

function Converter() {
  const [sourceFileName, setSourceFileName] = useState("");
  const [sourcePath, setSourcePath] = useState("");
  const [targetPath, setTargetPath] = useState("");
  const [res, setRes] = useState("");

  async function convert() {
    await invoke("convert", { source: sourcePath, target: targetPath }).then(
      (message) => setRes((message as string) ?? ""),
    );
  }

  async function openDialog(): Promise<void> {
    const file = await open({
      multiple: false,
      directory: false,
      filters: [
        {
          name: "Excel files",
          extensions: ["xls", "xlsx"],
        },
      ],
    });
    if (file) {
      setSourcePath(file.path);
      setSourceFileName(file.name ?? "no name");
    }
  }

  async function saveDialog(): Promise<void> {
    const path = await save({
      filters: [
        {
          name: "csv files",
          extensions: ["csv"],
        },
      ],
    });
    if (path) {
      setTargetPath(path);
    }
    console.log(path);
  }

  return (
    <div className="container">
      <div className="columns-2 h-36 flex">
        <div className="columns-2 p-1">
          <Text className="text-tc">{sourceFileName}</Text>
          <Button onClick={openDialog}>Choose source path</Button>
        </div>

        <div className="columns-2 p-1">
          <Text className="text-tc">{targetPath}</Text>
          <Button onClick={saveDialog}>Choose target path</Button>
        </div>
      </div>

      <Text className="text-tc">Result: {res}</Text>
      <Button onClick={convert}>Convert</Button>
    </div>
  );
}

export default Converter;
