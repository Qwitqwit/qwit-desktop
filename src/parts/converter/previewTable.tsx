const header = ["Name", "Job", "Color"];

const content = [
  ["Cy Ganderton", "Quality Control Specialist", "Blue"],
  ["Silen", "Software Developer", "Green"],
  ["John", "Doe", "Pink"],
  ["Susi", "Sunny", "Red"],
];

export default function PreviewTable() {
  return (
    <div className="overflow-x-auto">
      <p>Test table, not the real content</p>
      <table className="table table-zebra table-lg">
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
  );
}
