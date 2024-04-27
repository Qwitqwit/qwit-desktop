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
        <p className="">Separator: {separator}</p>
        <p className="">Source: {sourceFileName}</p>
        <p className="">Target: {targetPath}</p>
      </div>

      <div className="columns-3 p-1  border-b-2">
        <div className="columns-3 p-1">
          <button className="btn btn-primary"
            onClick={() => {
              setSeparator(";");
            }}
          >
            ;
          </button>
          <button className="btn btn-primary"
            onClick={() => {
              setSeparator(",");
            }}
          >
            ,
          </button>
          <button className="btn btn-primary"
            onClick={() => {
              setSeparator(":");
            }}
          >
            :
          </button>
        </div>
        <div className="p-1">
          <button className="btn btn-primary" onClick={openDialog}>Choose source path</button>
        </div>
        <div className="p-1">
          <button  className="btn btn-primary" onClick={saveDialog}>Choose target path</button>
        </div>
      </div>
      <div className="p-1 mt-8">
        <p className="p-tc">Result: {res}</p>
        <button className="btn btn-primary" onClick={convert}>Convert</button>
      </div>
    </div>
  );
}

export default Converter;
