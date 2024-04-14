import { Text } from "../components/text.tsx";
import { Button } from "../components/button.tsx";
import { useState } from "react";
import { open, save } from "@tauri-apps/plugin-dialog";

function Converter() {
  const [sourceFileName, setSourceFileName] = useState("");
  const [targetPath, setTargetPath] = useState("");

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
      setSourceFileName(file.name ?? "no name");
    }
    console.log(file?.path);
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
    </div>
  );
}

export default Converter;
