import { Text } from "../components/text.tsx";
import { Button } from "../components/button.tsx";
import { useState } from "react";
import { open, save } from "@tauri-apps/plugin-dialog";
import { invoke } from "@tauri-apps/api/core";

function Converter() {
  const [sourceFileName, setSourceFileName] = useState("");
  const [sourcePath, setSourcePath] = useState("");
  const [targetPath, setTargetPath] = useState("");
  const [separator, setSeparator] = useState(";");
  const [res, setRes] = useState("");

  async function convert() {
    await invoke("convert", {
      source: sourcePath,
      target: targetPath,
      sep: separator,
    }).then((message) => setRes((message as string) ?? ""));
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
    <div className="container w-max mt-2">
      <div className="columns-3">
        <Text className="text-tc">Separator: {separator}</Text>
        <Text className="text-tc">Source: {sourceFileName}</Text>
        <Text className="text-tc">Target: {targetPath}</Text>
      </div>

      <div className="columns-3 p-1  border-b-2 border-b-bc">
        <div className="columns-4 p-1">
          <Button
            onClick={() => {
              setSeparator(";");
            }}
          >
            ;
          </Button>
          <Button
            onClick={() => {
              setSeparator(",");
            }}
          >
            ,
          </Button>
          <Button
            onClick={() => {
              setSeparator(":");
            }}
          >
            :
          </Button>
        </div>
        <div className="p-1">
          <Button onClick={openDialog}>Choose source path</Button>
        </div>
        <div className="p-1">
          <Button onClick={saveDialog}>Choose target path</Button>
        </div>
      </div>
      <div className="p-1 mt-8">
        <Text className="text-tc">Result: {res}</Text>
        <Button onClick={convert}>Convert</Button>
      </div>
    </div>
  );
}

export default Converter;
