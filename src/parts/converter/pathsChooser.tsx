export default function PathsChooser(
  openDialog: () => Promise<void>,
  saveDialog: () => Promise<void>,
) {
  return (
    <>
      <button className="btn btn-primary mb-1" onClick={openDialog}>
        Choose source path
      </button>
      <button className="btn btn-primary" onClick={saveDialog}>
        Choose target path
      </button>
    </>
  );
}
