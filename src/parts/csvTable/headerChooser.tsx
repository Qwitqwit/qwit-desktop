interface HeaderChooserProps {
  onSelect: (index: number) => void;
}

export default function HeaderChooser(props: HeaderChooserProps) {
  return (
    <>
      <select
        defaultValue={"None"}
        onChange={(value) => {
          const index = value.target.value;
          if (index === "none") {
            props.onSelect(-1);
          } else {
            props.onSelect(index as unknown as number);
          }
        }}
        className="select w-full max-w-xs select-primary"
      >
        <option disabled selected>
          Choose the header index
        </option>
        <option>None</option>
        <option>0</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </select>
    </>
  );
}
