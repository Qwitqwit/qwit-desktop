export default function SeparatorChooser(
  setSeparator: (value: ((prevState: string) => string) | string) => void,
) {
  return (
    <div className="p-1 mr-8">
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text mr-2">Semicolon</span>
          <input
            type="radio"
            name="radio-1"
            className="radio checked:bg-red-500"
            defaultChecked
            onClick={() => {
              setSeparator(";");
            }}
          ></input>
        </label>
      </div>

      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text mr-2">Comma</span>
          <input
            type="radio"
            name="radio-1"
            className="radio checked:bg-blue-500"
            onClick={() => {
              setSeparator(",");
            }}
          ></input>
        </label>
      </div>

      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text mr-2">Colon</span>
          <input
            type="radio"
            name="radio-1"
            className="radio checked:bg-green-500"
            onClick={() => {
              setSeparator(":");
            }}
          ></input>
        </label>
      </div>
    </div>
  );
}
