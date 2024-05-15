import { useState } from "react";
import { open, save } from "@tauri-apps/plugin-dialog";
import { invoke } from "@tauri-apps/api/core";
import SeparatorChooser from "./separatorChooser.tsx";
import PathsChooser from "./pathsChooser.tsx";
import HeaderChooser from "../csvTable/headerChooser.tsx";
import CsvTable from "../csvTable/csvTable.tsx";

function Converter() {
  const [sourceFileName, setSourceFileName] = useState("");
  const [sourcePath, setSourcePath] = useState("");
  const [targetPath, setTargetPath] = useState("");
  const [separator, setSeparator] = useState(";");
  const [headerIndex, setHeaderIndex] = useState(-1);
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
    <div className="w-max mt-2 flex">
      <div className="w-72 mt-2">
        <ul className="menu w-56 rounded-box">
          <details className="w-52">
            <summary className="text-lg cursor-pointer">Separator</summary>
            <li>{SeparatorChooser(setSeparator)}</li>
          </details>

          <details className="w-52">
            <summary className="text-lg cursor-pointer">Paths</summary>
            <li>{PathsChooser(openDialog, saveDialog)}</li>
          </details>
        </ul>

        <div className="p-1 mt-1">
          <p className="p-tc pb-1">Header index</p>
          <HeaderChooser onSelect={setHeaderIndex}></HeaderChooser>
        </div>

        <div className="p-1 mt-3">
          <p className="p-tc pb-1">Source: {sourceFileName}</p>
          <p className="p-tc pb-1">Target: {targetPath}</p>
          <p className="p-tc pb-1">Result: {res}</p>
          <button className="btn btn-accent pb-1" onClick={convert}>
            Convert
          </button>
        </div>
      </div>

      <div className="divider divider-horizontal"></div>

      <CsvTable
        targetPath={targetPath}
        separator={separator}
        headerIndex={headerIndex}
      />
    </div>
  );
}

export default Converter;
