import { useState } from "react";
import { open } from "@tauri-apps/plugin-dialog";
import SeparatorChooser from "./separatorChooser.tsx";
import PathsChooser from "./pathsChooser.tsx";
import CsvTable from "../csvTable/csvTable.tsx";
import HeaderChooser from "../csvTable/headerChooser.tsx";

function Reader() {
  const [sourceFileName, setSourceFileName] = useState("");
  const [sourcePath, setSourcePath] = useState("");
  const [separator, setSeparator] = useState(";");
  const [headerIndex, setHeaderIndex] = useState(-1);

  async function openDialog(): Promise<void> {
    const file = await open({
      multiple: false,
      directory: false,
      filters: [
        {
          name: "Excel files",
          extensions: ["csv", "CSV"],
        },
      ],
    });
    if (file) {
      setSourcePath(file.path);
      setSourceFileName(file.name ?? "no name");
    }
  }

  return (
    <div className="w-max mt-2 flex">
      <div className="w-72 mt-2">
        <ul className="menu w-56 rounded-box">
          <details className="w-52">
            <summary className="text-lg cursor-pointer">Separator</summary>
            <li>{SeparatorChooser(setSeparator)}</li>
          </details>
        </ul>

        <div className="p-1 mt-8">
          <p className="p-tc pb-1">Source: {sourceFileName}</p>
          <div>{PathsChooser(openDialog)}</div>
        </div>

        <div className="p-1 mt-8">
          <p className="p-tc pb-1">Header index: {headerIndex}</p>
          <HeaderChooser onSelect={setHeaderIndex}></HeaderChooser>
        </div>
      </div>

      <div className="divider divider-horizontal"></div>

      <CsvTable
        targetPath={sourcePath}
        separator={separator}
        headerIndex={headerIndex}
      />
    </div>
  );
}

export default Reader;
