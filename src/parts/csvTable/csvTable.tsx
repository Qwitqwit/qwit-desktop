import { invoke } from "@tauri-apps/api/core";
import { useEffect, useState } from "react";

export interface CsvTableProps {
  targetPath: string;
  separator: string;
  headerIndex: number;
}

export default function CsvTable(props: CsvTableProps) {
  const [res, setRes] = useState<string | undefined>(undefined);
  const [content, setContent] = useState<string[][]>([]);
  const [header, setHeader] = useState<string[]>([]);

  useEffect(() => {
    if (props.targetPath.length != 0) {
      console.log("reading csv from: ", props.targetPath);
      readCsv().then();
    }
  }, [props]);

  async function readCsv() {
    await invoke("read_csv", {
      source: props.targetPath,
      sep: props.separator,
    }).then((message) => {
      try {
        const parsed: string[][] = JSON.parse(message as string);
        setContent(parsed);
        if (props.headerIndex == -1) {
          setHeader([]);
        } else {
          setHeader(content[props.headerIndex]);
        }
        setRes(undefined);
      } catch (e) {
        setContent([]);
        setRes((message as string) ?? undefined);
      }
    });
  }

  return (
    <div>
      {res ? <p>Error: {res}</p> : null}

      <div className="overflow-x-auto h-[55rem]">
        <table className="table table-zebra table-lg table-pin-cols table-pin-rows overflow-scroll">
          <thead>
            <tr>
              {["Index"].concat(header).map((value) => {
                return <th>{value}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {content.map((line, index) => {
              return (
                <tr>
                  <th>{index}</th>
                  {line.map((value) => {
                    return <td>{value}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
