export default function PathsChooser(
  openDialog: () => Promise<void>,
  saveDialog: () => Promise<void>,
) {
  return (
    <>
      <button className="btn btn-primary  pb-2" onClick={openDialog}>
        Choose source path
      </button>
      <button className="btn btn-primary pb-2" onClick={saveDialog}>
        Choose target path
      </button>
    </>
  );
}
