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
    <div className="w-max mt-2">
      <div className="columns-3 p-1 border-b-2 flex">
        <div className="p-1 mr-8">
          <p className="">Separator: {separator}</p>

          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text mr-1">Semicolon</span>
              <input
                type="radio"
                name="radio-1"
                className="radio checked:bg-red-500"
                checked={separator == ";"}
                onClick={() => {
                  setSeparator(";");
                }}
              ></input>
            </label>
          </div>

          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text mr-1">Comma</span>
              <input
                type="radio"
                name="radio-1"
                className="radio checked:bg-blue-500"
                checked={separator == ","}
                onClick={() => {
                  setSeparator(",");
                }}
              ></input>
            </label>
          </div>

          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Colon</span>
              <input
                type="radio"
                name="radio-1"
                className="radio checked:bg-green-500"
                checked={separator == ":"}
                onClick={() => {
                  setSeparator(":");
                }}
              ></input>
            </label>
          </div>
        </div>

        <div className="p-1 mr-8">
          <p className="">Source: {sourceFileName}</p>
          <button className="btn btn-primary" onClick={openDialog}>
            Choose source path
          </button>
        </div>

        <div className="p-1 mr-8">
          <p className="">Target: {targetPath}</p>
          <button className="btn btn-primary" onClick={saveDialog}>
            Choose target path
          </button>
        </div>
      </div>

      <div className="p-1 mt-8">
        <p className="p-tc">Result: {res}</p>
        <button className="btn btn-accent" onClick={convert}>
          Convert
        </button>
      </div>
    </div>
  );
}

export default Converter;
