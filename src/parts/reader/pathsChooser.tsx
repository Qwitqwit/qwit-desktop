export default function PathsChooser(openDialog: () => Promise<void>) {
  return (
    <>
      <button className="btn btn-primary mb-1" onClick={openDialog}>
        Choose File
      </button>
    </>
  );
}
