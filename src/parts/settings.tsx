import ThemeChooser from "../components/themeChooser.tsx";

function Settings() {
  return (
    <div role="tablist" className="tabs tabs-bordered w-32">
      <input
        type="radio"
        name="my_tabs_1"
        role="tab"
        className="tab"
        aria-label="Appearance"
      />
      <div role="tabpanel" className="tab-content p-10">
        <ThemeChooser></ThemeChooser>
      </div>

      <input
        type="radio"
        name="my_tabs_1"
        role="tab"
        className="tab"
        aria-label="Nothing"
      />
      <div role="tabpanel" className="tab-content p-10"></div>
    </div>
  );
}

export default Settings;
